const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema(
  {
    weekNumber: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    topics: { type: [String], default: [] },
    miniProjects: { type: [String], default: [] },
    resources: { type: [String], default: [] },
    completed: { type: Boolean, default: false },
  },
  { _id: true }
);

const learningRoadmapSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    targetRole: { type: String, required: true, trim: true, maxlength: 100 },
    currentLevel: { type: String, required: true, trim: true, maxlength: 50 },
    estimatedDuration: { type: String, required: true, trim: true, maxlength: 100 },
    careerGoal: { type: String, required: true, trim: true, maxlength: 1000 },
    weeks: { type: [weekSchema], required: true, validate: [(weeks) => weeks.length > 0, 'Roadmap requires at least one week.'] },
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

learningRoadmapSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('LearningRoadmap', learningRoadmapSchema);
