const CodeAnalysis = require('../models/CodeAnalysis');
const { analyzeCode } = require('../services/ai/ai.service');
const AppError = require('../utils/AppError');

const analyzeCodeRequest = async (req, res, next) => {
  try {
    const { language, code } = req.body;
    const analysis = await analyzeCode({ language, code });
    const savedAnalysis = await CodeAnalysis.create({ userId: req.user._id, language, originalCode: code, ...analysis });

    res.status(201).json({ success: true, analysis: savedAnalysis });
  } catch (error) {
    next(error);
  }
};

const getAnalysisHistory = async (req, res, next) => {
  try {
    const analyses = await CodeAnalysis.find({ userId: req.user._id })
      .select('language summary createdAt')
      .sort({ createdAt: -1 })
      .limit(30);

    res.status(200).json({ success: true, analyses });
  } catch (error) {
    next(error);
  }
};

const getAnalysisById = async (req, res, next) => {
  try {
    const analysis = await CodeAnalysis.findOne({ _id: req.params.id, userId: req.user._id });

    if (!analysis) {
      return next(new AppError('Analysis not found.', 404));
    }

    res.status(200).json({ success: true, analysis });
  } catch (error) {
    next(error);
  }
};

module.exports = { analyzeCodeRequest, getAnalysisHistory, getAnalysisById };
