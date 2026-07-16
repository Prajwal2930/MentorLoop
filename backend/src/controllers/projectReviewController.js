const ProjectReview = require('../models/ProjectReview');
const { reviewProject } = require('../services/ai/ai.service');
const { fetchRepositoryInformation } = require('../services/github/github.service');
const { createRepositorySummary } = require('../services/github/repoSummary.service');
const AppError = require('../utils/AppError');

const createProjectReview = async (req, res, next) => {
  try {
    const repository = await fetchRepositoryInformation(req.body.repositoryUrl);
    const summary = createRepositorySummary(repository);
    const review = await reviewProject(summary);
    const savedReview = await ProjectReview.create({ userId: req.user._id, ...repository, summary: JSON.stringify(summary), ...review });

    res.status(201).json({ success: true, review: savedReview });
  } catch (error) {
    next(error);
  }
};

const getProjectReviewHistory = async (req, res, next) => {
  try {
    const reviews = await ProjectReview.find({ userId: req.user._id })
      .select('repositoryUrl repositoryName repositoryDescription score createdAt')
      .sort({ createdAt: -1 })
      .limit(30);

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

const getProjectReviewById = async (req, res, next) => {
  try {
    const review = await ProjectReview.findOne({ _id: req.params.id, userId: req.user._id });
    if (!review) return next(new AppError('Project review not found.', 404));

    res.status(200).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

module.exports = { createProjectReview, getProjectReviewHistory, getProjectReviewById };
