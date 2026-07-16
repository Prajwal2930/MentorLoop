const AppError = require('../../utils/AppError');
const { generateStructuredContent } = require('./gemini.provider');
const { buildCodeAnalysisPrompt, reviewProjectPrompt, roadmapPrompt } = require('./prompt.service');

const requiredFields = ['summary', 'errors', 'bestPractices', 'concepts', 'interviewQuestions', 'practiceTask'];

const validateAnalysis = (analysis) => {
  if (!analysis || typeof analysis !== 'object') {
    throw new AppError('The AI provider returned an invalid analysis response.', 502);
  }

  const missingField = requiredFields.find((field) => analysis[field] === undefined || analysis[field] === null);

  if (missingField || typeof analysis.summary !== 'string' || !Array.isArray(analysis.errors)
    || !Array.isArray(analysis.bestPractices) || !Array.isArray(analysis.concepts)
    || !Array.isArray(analysis.interviewQuestions) || typeof analysis.practiceTask !== 'object') {
    throw new AppError('The AI provider returned an incomplete analysis response.', 502);
  }

  return analysis;
};

/** Generate and validate a structured code review through the configured AI provider. */
const analyzeCode = async ({ language, code }) => {
  const prompt = buildCodeAnalysisPrompt({ language, code });
  const analysis = await generateStructuredContent(prompt);

  return validateAnalysis(analysis);
};

const reviewProject = async (repositorySummary) => {
  const review = await generateStructuredContent(reviewProjectPrompt(repositorySummary));

  if (!review || typeof review !== 'object' || !Number.isInteger(review.score) || review.score < 0 || review.score > 100
    || !Array.isArray(review.strengths) || !Array.isArray(review.weaknesses) || typeof review.resumeValue !== 'string'
    || !Array.isArray(review.interviewQuestions) || !Array.isArray(review.improvements)) {
    throw new AppError('The AI provider returned an incomplete project review.', 502);
  }

  return review;
};

const generateRoadmap = async (learnerContext) => {
  const roadmap = await generateStructuredContent(roadmapPrompt(learnerContext));

  const validWeeks = Array.isArray(roadmap?.weeks) && roadmap.weeks.length >= 4 && roadmap.weeks.length <= 12
    && roadmap.weeks.every((week) => Number.isInteger(week.weekNumber) && typeof week.title === 'string'
      && Array.isArray(week.topics) && Array.isArray(week.miniProjects) && Array.isArray(week.resources));

  if (!roadmap || typeof roadmap.title !== 'string' || typeof roadmap.estimatedDuration !== 'string'
    || typeof roadmap.careerGoal !== 'string' || !validWeeks) {
    throw new AppError('The AI provider returned an incomplete learning roadmap.', 502);
  }

  return roadmap;
};

module.exports = { analyzeCode, reviewProject, generateRoadmap };
