const mongoose = require('mongoose');

const projectReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    repositoryUrl: { type: String, required: true, trim: true, maxlength: 2048 },
    repositoryName: { type: String, required: true, trim: true, maxlength: 200 },
    repositoryDescription: { type: String, trim: true, default: '', maxlength: 2000 },
    languages: { type: [String], default: [] },
    summary: { type: String, required: true, maxlength: 15000 },
    score: { type: Number, required: true, min: 0, max: 100 },
    strengths: { type: [mongoose.Schema.Types.Mixed], default: [] },
    weaknesses: { type: [mongoose.Schema.Types.Mixed], default: [] },
    resumeValue: { type: String, required: true, maxlength: 5000 },
    interviewQuestions: { type: [mongoose.Schema.Types.Mixed], default: [] },
    improvements: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

projectReviewSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('ProjectReview', projectReviewSchema);
