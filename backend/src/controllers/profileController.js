const User = require('../models/User');
const AppError = require('../utils/AppError');
const { getProfileCompletion } = require('../utils/profileMetrics');

/** Return the authenticated user's profile and onboarding completion data. */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
      profileCompletion: getProfileCompletion(user),
    });
  } catch (error) {
    next(error);
  }
};

/** Update the authenticated user's validated profile fields. */
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user,
      profileCompletion: getProfileCompletion(user),
    });
  } catch (error) {
    next(error);
  }
};

/** Mark onboarding complete only after all required profile details are provided. */
const completeProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const profileCompletion = getProfileCompletion(user);

    if (!profileCompletion.isComplete) {
      return next(
        new AppError(
          `Complete all onboarding details before submitting (${profileCompletion.completedFields}/${profileCompletion.totalFields} completed).`,
          400
        )
      );
    }

    user.profileCompleted = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Onboarding completed successfully.',
      user,
      profileCompletion,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, completeProfile };
