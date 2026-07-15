const AppError = require('../utils/AppError');

const EXPERIENCE_LEVELS = ['beginner', 'intermediate', 'advanced'];
const LEARNING_STYLES = ['visual', 'reading-writing', 'hands-on', 'mixed'];
const EDITABLE_PROFILE_FIELDS = [
  'fullName',
  'avatar',
  'bio',
  'college',
  'graduationYear',
  'targetRole',
  'experienceLevel',
  'preferredLearningStyle',
  'dailyLearningGoal',
];

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const validateProfileUpdate = (req, _res, next) => {
  const suppliedFields = Object.keys(req.body);

  if (suppliedFields.length === 0) {
    return next(new AppError('Provide at least one profile field to update.', 400));
  }

  const unsupportedField = suppliedFields.find((field) => !EDITABLE_PROFILE_FIELDS.includes(field));

  if (unsupportedField) {
    return next(new AppError(`Profile field "${unsupportedField}" cannot be updated.`, 400));
  }

  const { fullName, avatar, bio, college, graduationYear, targetRole, experienceLevel, preferredLearningStyle, dailyLearningGoal } = req.body;

  if (fullName !== undefined && (!isNonEmptyString(fullName) || fullName.trim().length < 2 || fullName.trim().length > 100)) {
    return next(new AppError('Full name must contain between 2 and 100 characters.', 400));
  }

  if (avatar !== undefined && avatar !== null && typeof avatar !== 'string') {
    return next(new AppError('Avatar must be a URL string.', 400));
  }

  if (bio !== undefined && (typeof bio !== 'string' || bio.trim().length > 500)) {
    return next(new AppError('Bio cannot exceed 500 characters.', 400));
  }

  if (college !== undefined && (typeof college !== 'string' || college.trim().length > 150)) {
    return next(new AppError('College name cannot exceed 150 characters.', 400));
  }

  if (graduationYear !== undefined && graduationYear !== null && (!Number.isInteger(graduationYear) || graduationYear < 1900 || graduationYear > 2100)) {
    return next(new AppError('Graduation year must be between 1900 and 2100.', 400));
  }

  if (targetRole !== undefined && (!isNonEmptyString(targetRole) || targetRole.trim().length > 100)) {
    return next(new AppError('Target role must contain between 1 and 100 characters.', 400));
  }

  if (experienceLevel !== undefined && !EXPERIENCE_LEVELS.includes(experienceLevel)) {
    return next(new AppError('Experience level must be beginner, intermediate, or advanced.', 400));
  }

  if (preferredLearningStyle !== undefined && !LEARNING_STYLES.includes(preferredLearningStyle)) {
    return next(new AppError('Preferred learning style is invalid.', 400));
  }

  if (dailyLearningGoal !== undefined && (!Number.isInteger(dailyLearningGoal) || dailyLearningGoal < 15 || dailyLearningGoal > 480)) {
    return next(new AppError('Daily learning goal must be between 15 and 480 minutes.', 400));
  }

  for (const field of ['fullName', 'avatar', 'bio', 'college', 'targetRole']) {
    if (typeof req.body[field] === 'string') {
      req.body[field] = req.body[field].trim();
    }
  }

  next();
};

module.exports = { EDITABLE_PROFILE_FIELDS, validateProfileUpdate };
