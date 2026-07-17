const CodeAnalysis = require('../models/CodeAnalysis');
const ProjectReview = require('../models/ProjectReview');
const Skill = require('../models/Skill');
const User = require('../models/User');

const getInterviewContext = async (userId) => {
  const [user, skills, recentAnalyses, latestProjectReview] = await Promise.all([
    User.findById(userId).select('targetRole experienceLevel preferredLearningStyle'),
    Skill.find({ userId }).select('skillName level confidence').sort({ level: 1 }),
    CodeAnalysis.find({ userId }).select('language errors concepts').sort({ createdAt: -1 }).limit(3),
    ProjectReview.findOne({ userId }).select('repositoryName weaknesses improvements score').sort({ createdAt: -1 }),
  ]);

  return { profile: user, skills, recentAnalyses, latestProjectReview };
};

module.exports = { getInterviewContext };
