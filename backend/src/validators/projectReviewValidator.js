const AppError = require('../utils/AppError');
const { parseRepositoryUrl } = require('../services/github/github.service');

const validateProjectReview = (req, _res, next) => {
  if (typeof req.body.repositoryUrl !== 'string') {
    return next(new AppError('Repository URL is required.', 400));
  }

  try {
    req.body.repositoryUrl = parseRepositoryUrl(req.body.repositoryUrl.trim()).canonicalUrl;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateProjectReview };
