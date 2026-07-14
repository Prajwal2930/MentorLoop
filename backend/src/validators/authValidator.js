const AppError = require('../utils/AppError');

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const GITHUB_USERNAME_PATTERN = /^[a-zA-Z0-9-]{1,39}$/;
const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced'];

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const validateRegisterInput = (req, _res, next) => {
  const {
    fullName,
    email,
    password,
    avatar,
    targetRole,
    experienceLevel,
    githubUsername,
  } = req.body;

  if (!isNonEmptyString(fullName) || fullName.trim().length < 2 || fullName.trim().length > 100) {
    return next(new AppError('Full name must contain between 2 and 100 characters.', 400));
  }

  if (!isNonEmptyString(email) || !EMAIL_PATTERN.test(email.trim())) {
    return next(new AppError('Please provide a valid email address.', 400));
  }

  if (typeof password !== 'string' || password.length < 8) {
    return next(new AppError('Password must be at least 8 characters long.', 400));
  }

  if (!isNonEmptyString(targetRole) || targetRole.trim().length > 100) {
    return next(new AppError('Target role must contain between 1 and 100 characters.', 400));
  }

  if (!EXPERIENCE_LEVELS.includes(experienceLevel)) {
    return next(new AppError('Experience level must be beginner, intermediate, or advanced.', 400));
  }

  if (avatar !== undefined && avatar !== null && typeof avatar !== 'string') {
    return next(new AppError('Avatar must be a URL string.', 400));
  }

  if (
    githubUsername !== undefined &&
    githubUsername !== null &&
    (!isNonEmptyString(githubUsername) || !GITHUB_USERNAME_PATTERN.test(githubUsername.trim()))
  ) {
    return next(new AppError('Please provide a valid GitHub username.', 400));
  }

  // Normalize values once, so downstream code receives consistent data.
  req.body.fullName = fullName.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.targetRole = targetRole.trim();
  req.body.githubUsername = githubUsername?.trim().toLowerCase() || null;
  req.body.avatar = avatar?.trim() || null;

  next();
};

const validateLoginInput = (req, _res, next) => {
  const { email, password } = req.body;

  if (!isNonEmptyString(email) || !EMAIL_PATTERN.test(email.trim())) {
    return next(new AppError('Please provide a valid email address.', 400));
  }

  if (typeof password !== 'string' || password.length === 0) {
    return next(new AppError('Password is required.', 400));
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

module.exports = { validateRegisterInput, validateLoginInput };
