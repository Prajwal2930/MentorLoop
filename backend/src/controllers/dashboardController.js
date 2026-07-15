const Skill = require('../models/Skill');
const User = require('../models/User');
const { getProfileCompletion } = require('../utils/profileMetrics');

const calculateCareerReadiness = (profileCompletion, skills) => {
  const averageSkillLevel = skills.length === 0
    ? 0
    : skills.reduce((total, skill) => total + skill.level, 0) / skills.length;

  return Math.round((profileCompletion.percentage * 0.4) + (averageSkillLevel * 0.6));
};

/** Return all Day 2 dashboard data for the authenticated user. */
const getDashboard = async (req, res, next) => {
  try {
    const [user, skills] = await Promise.all([
      User.findById(req.user._id),
      Skill.find({ userId: req.user._id }).sort({ skillName: 1 }),
    ]);

    const profileCompletion = getProfileCompletion(user);
    const careerReadinessScore = calculateCareerReadiness(profileCompletion, skills);

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        githubUsername: user.githubUsername,
        githubConnected: user.githubConnected,
        profileCompleted: user.profileCompleted,
      },
      careerGoal: {
        targetRole: user.targetRole,
        experienceLevel: user.experienceLevel,
        preferredLearningStyle: user.preferredLearningStyle,
        dailyLearningGoal: user.dailyLearningGoal,
      },
      profileCompletion,
      skills,
      recentActivity: [],
      recentActivityMessage: 'Activity tracking will be available soon.',
      careerReadinessScore,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
