const AppError = require('../utils/AppError');

const GITHUB_USERNAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

const validateGithubConnection = (req, _res, next) => {
  const { githubUsername } = req.body;

  if (typeof githubUsername !== 'string' || !GITHUB_USERNAME_PATTERN.test(githubUsername.trim())) {
    return next(new AppError('Please provide a valid GitHub username.', 400));
  }

  req.body.githubUsername = githubUsername.trim().toLowerCase();
  next();
};

module.exports = { validateGithubConnection };
