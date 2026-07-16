const LearningRoadmap = require('../models/LearningRoadmap');
const { generateRoadmap } = require('../services/ai/ai.service');
const { getLearnerContext } = require('../services/roadmap.service');
const AppError = require('../utils/AppError');

const generateLearningRoadmap = async (req, res, next) => {
  try {
    const learnerContext = await getLearnerContext(req.user._id);

    if (!learnerContext.profile?.targetRole || !learnerContext.profile?.experienceLevel) {
      return next(new AppError('Complete your profile before generating a learning roadmap.', 400));
    }

    const generatedRoadmap = await generateRoadmap(learnerContext);
    const roadmap = await LearningRoadmap.create({
      userId: req.user._id,
      title: generatedRoadmap.title,
      targetRole: learnerContext.profile.targetRole,
      currentLevel: learnerContext.profile.experienceLevel,
      estimatedDuration: generatedRoadmap.estimatedDuration,
      careerGoal: generatedRoadmap.careerGoal,
      weeks: generatedRoadmap.weeks.map((week) => ({ ...week, completed: false })),
      progress: 0,
    });

    res.status(201).json({ success: true, roadmap });
  } catch (error) {
    next(error);
  }
};

const getCurrentRoadmap = async (req, res, next) => {
  try {
    const roadmap = await LearningRoadmap.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, roadmap });
  } catch (error) {
    next(error);
  }
};

const getRoadmapById = async (req, res, next) => {
  try {
    const roadmap = await LearningRoadmap.findOne({ _id: req.params.id, userId: req.user._id });
    if (!roadmap) return next(new AppError('Learning roadmap not found.', 404));

    res.status(200).json({ success: true, roadmap });
  } catch (error) {
    next(error);
  }
};

const updateRoadmapWeek = async (req, res, next) => {
  try {
    const roadmap = await LearningRoadmap.findOne({ userId: req.user._id, 'weeks._id': req.params.weekId });
    if (!roadmap) return next(new AppError('Roadmap week not found.', 404));

    const week = roadmap.weeks.id(req.params.weekId);
    week.completed = req.body.completed !== undefined ? Boolean(req.body.completed) : true;
    roadmap.progress = Math.round((roadmap.weeks.filter((item) => item.completed).length / roadmap.weeks.length) * 100);
    await roadmap.save();

    res.status(200).json({ success: true, roadmap });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateLearningRoadmap, getCurrentRoadmap, getRoadmapById, updateRoadmapWeek };
