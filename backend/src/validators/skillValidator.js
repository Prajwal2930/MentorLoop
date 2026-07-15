const Skill = require('../models/Skill');
const AppError = require('../utils/AppError');

const EDITABLE_SKILL_FIELDS = ['skillName', 'level', 'confidence'];
const CONFIDENCE_LEVELS = ['low', 'medium', 'high'];

const validateSkillPayload = (requireAllFields) => (req, _res, next) => {
  const suppliedFields = Object.keys(req.body);

  if (suppliedFields.length === 0) {
    return next(new AppError('Provide at least one skill field to update.', 400));
  }

  const unsupportedField = suppliedFields.find((field) => !EDITABLE_SKILL_FIELDS.includes(field));

  if (unsupportedField) {
    return next(new AppError(`Skill field "${unsupportedField}" cannot be updated.`, 400));
  }

  if (requireAllFields) {
    const missingField = EDITABLE_SKILL_FIELDS.find((field) => req.body[field] === undefined);

    if (missingField) {
      return next(new AppError(`${missingField} is required when adding a skill.`, 400));
    }
  }

  const { skillName, level, confidence } = req.body;

  if (skillName !== undefined && !Skill.SUPPORTED_SKILLS.includes(skillName)) {
    return next(new AppError('Skill name is not supported.', 400));
  }

  if (level !== undefined && (!Number.isInteger(level) || level < 0 || level > 100)) {
    return next(new AppError('Skill level must be a whole number between 0 and 100.', 400));
  }

  if (confidence !== undefined && !CONFIDENCE_LEVELS.includes(confidence)) {
    return next(new AppError('Confidence must be low, medium, or high.', 400));
  }

  next();
};

const validateCreateSkill = validateSkillPayload(true);
const validateUpdateSkill = validateSkillPayload(false);

module.exports = { validateCreateSkill, validateUpdateSkill };
