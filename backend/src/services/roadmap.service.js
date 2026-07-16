const CodeAnalysis = require('../models/CodeAnalysis');
const ProjectReview = require('../models/ProjectReview');
const Skill = require('../models/Skill');
const User = require('../models/User');

/** Gather bounded learner context for personalized roadmap generation. */
const getLearnerContext = async (userId) => {
  const [user, skills, latestProjectReview, recentAnalyses] = await Promise.all([
    User.findById(userId).select('targetRole experienceLevel preferredLearningStyle dailyLearningGoal college graduationYear'),
    Skill.find({ userId }).select('skillName level confidence').sort({ level: 1 }),
    ProjectReview.findOne({ userId }).select('repositoryName score strengths weaknesses improvements').sort({ createdAt: -1 }),
    CodeAnalysis.find({ userId }).select('language summary errors concepts').sort({ createdAt: -1 }).limit(5),
  ]);

  return {
    profile: user,
    skills,
    latestGitHubReview: latestProjectReview,
    recentCodeAnalyses: recentAnalyses,
  };
};

module.exports = { getLearnerContext };
