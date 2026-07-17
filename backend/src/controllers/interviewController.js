const InterviewSession = require('../models/InterviewSession');
const { evaluateInterview, generateInterviewQuestions } = require('../services/ai/ai.service');
const { getInterviewContext } = require('../services/interview.service');
const AppError = require('../utils/AppError');

const startInterview = async (req, res, next) => {
  try {
    const { interviewType } = req.body;
    if (!['HR', 'Technical', 'Mixed'].includes(interviewType)) return next(new AppError('Interview type must be HR, Technical, or Mixed.', 400));
    const learnerContext = await getInterviewContext(req.user._id);
    if (!learnerContext.profile?.targetRole) return next(new AppError('Complete your profile before starting an interview.', 400));
    const questions = await generateInterviewQuestions({ interviewType, learnerContext });
    const interview = await InterviewSession.create({ userId: req.user._id, interviewType, targetRole: learnerContext.profile.targetRole, questions });
    res.status(201).json({ success: true, interview });
  } catch (error) { next(error); }
};

const evaluateInterviewSession = async (req, res, next) => {
  try {
    const { sessionId, answers } = req.body;
    if (!Array.isArray(answers) || answers.length === 0) return next(new AppError('Provide answers for the interview questions.', 400));
    const interview = await InterviewSession.findOne({ _id: sessionId, userId: req.user._id });
    if (!interview) return next(new AppError('Interview session not found.', 404));
    const questionIds = new Set(interview.questions.map((question) => question._id.toString()));
    if (!answers.every((answer) => questionIds.has(answer.questionId) && typeof answer.answer === 'string' && answer.answer.trim())) return next(new AppError('Each answer must match an interview question and contain text.', 400));
    const feedback = await evaluateInterview({ interviewType: interview.interviewType, targetRole: interview.targetRole, questions: interview.questions, answers });
    interview.answers = answers.map((answer) => ({ ...answer, answer: answer.answer.trim() }));
    interview.aiFeedback = feedback;
    interview.overallScore = feedback.overallScore;
    interview.communicationScore = feedback.communicationScore;
    interview.technicalScore = feedback.technicalScore;
    interview.confidenceScore = feedback.confidenceScore;
    interview.improvementSuggestions = feedback.improvementSuggestions;
    await interview.save();
    res.status(200).json({ success: true, interview });
  } catch (error) { next(error); }
};

const getInterviewHistory = async (req, res, next) => { try { const interviews = await InterviewSession.find({ userId: req.user._id }).select('interviewType targetRole overallScore createdAt').sort({ createdAt: -1 }).limit(30); res.status(200).json({ success: true, interviews }); } catch (error) { next(error); } };
const getInterviewById = async (req, res, next) => { try { const interview = await InterviewSession.findOne({ _id: req.params.id, userId: req.user._id }); if (!interview) return next(new AppError('Interview session not found.', 404)); res.status(200).json({ success: true, interview }); } catch (error) { next(error); } };

module.exports = { startInterview, evaluateInterviewSession, getInterviewHistory, getInterviewById };
