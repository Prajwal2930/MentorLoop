const Skill = require('../models/Skill');
const User = require('../models/User');
const LearningRoadmap = require('../models/LearningRoadmap');
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
    const [user, skills, learningRoadmap] = await Promise.all([
      User.findById(req.user._id),
      Skill.find({ userId: req.user._id }).sort({ skillName: 1 }),
      LearningRoadmap.findOne({ userId: req.user._id }).sort({ createdAt: -1 }),
    ]);

    const profileCompletion = getProfileCompletion(user);
    const careerReadinessScore = calculateCareerReadiness(profileCompletion, skills);
    const currentWeek = learningRoadmap?.weeks.find((week) => !week.completed) || null;

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
      roadmap: learningRoadmap
        ? {
          _id: learningRoadmap._id,
          progress: learningRoadmap.progress,
          estimatedDuration: learningRoadmap.estimatedDuration,
          currentWeek,
          todayGoal: currentWeek?.topics?.[0] || 'Review your roadmap and choose your next learning task.',
        }
        : null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
