const CodeAnalysis = require('../models/CodeAnalysis');
const InterviewSession = require('../models/InterviewSession');
const LearningRoadmap = require('../models/LearningRoadmap');
const ProjectReview = require('../models/ProjectReview');
const Skill = require('../models/Skill');
const User = require('../models/User');
const { getProfileCompletion } = require('../utils/profileMetrics');

const average = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;

const getAnalytics = async (userId) => {
  const [user, skills, roadmap, reviews, analyses, interviews] = await Promise.all([
    User.findById(userId),
    Skill.find({ userId }).select('skillName level confidence'),
    LearningRoadmap.findOne({ userId }).sort({ createdAt: -1 }),
    ProjectReview.find({ userId }).select('score').sort({ createdAt: -1 }),
    CodeAnalysis.find({ userId }).select('_id').sort({ createdAt: -1 }),
    InterviewSession.find({ userId, overallScore: { $ne: null } }).select('overallScore createdAt').sort({ createdAt: 1 }),
  ]);

  const profileCompletion = getProfileCompletion(user).percentage;
  const skillScore = average(skills.map((skill) => skill.level));
  const projectScore = average(reviews.map((review) => review.score));
  const interviewScore = average(interviews.map((interview) => interview.overallScore));
  const analysisScore = Math.min(analyses.length / 5, 1) * 100;
  const roadmapProgress = roadmap?.progress || 0;
  const careerReadiness = Math.round((profileCompletion * 0.15) + (skillScore * 0.25) + (roadmapProgress * 0.2) + (projectScore * 0.15) + (analysisScore * 0.1) + (interviewScore * 0.15));

  return {
    careerReadiness,
    skillsProgress: skills,
    weakSkills: skills.filter((skill) => skill.level < 40),
    strongSkills: skills.filter((skill) => skill.level >= 70),
    interviewTrend: interviews.map((interview) => ({ score: interview.overallScore, date: interview.createdAt })),
    totalAnalyses: analyses.length,
    totalProjectsReviewed: reviews.length,
    roadmapProgress,
    recentActivities: [
      ...(roadmap ? [{ type: 'roadmap', label: `${roadmap.progress}% roadmap progress`, date: roadmap.updatedAt }] : []),
      ...interviews.slice(-3).map((interview) => ({ type: 'interview', label: `Interview score: ${interview.overallScore}%`, date: interview.createdAt })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5),
  };
};

module.exports = { getAnalytics };
