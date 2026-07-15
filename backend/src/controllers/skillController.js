const Skill = require('../models/Skill');
const AppError = require('../utils/AppError');

/** Return all skills owned by the authenticated user. */
const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({ userId: req.user._id }).sort({ skillName: 1 });

    res.status(200).json({ success: true, skills });
  } catch (error) {
    next(error);
  }
};

/** Add one supported skill to the authenticated user's profile. */
const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create({ ...req.body, userId: req.user._id });

    res.status(201).json({
      success: true,
      message: 'Skill added successfully.',
      skill,
    });
  } catch (error) {
    next(error);
  }
};

/** Update one skill only when it belongs to the authenticated user. */
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return next(new AppError('Skill not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully.',
      skill,
    });
  } catch (error) {
    next(error);
  }
};

/** Delete one skill only when it belongs to the authenticated user. */
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!skill) {
      return next(new AppError('Skill not found.', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
