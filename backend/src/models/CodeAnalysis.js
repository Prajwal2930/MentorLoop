const mongoose = require('mongoose');

const codeAnalysisSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    language: { type: String, required: true, trim: true, maxlength: 50 },
    originalCode: { type: String, required: true, maxlength: 50000 },
    summary: { type: String, required: true, maxlength: 5000 },
    errors: { type: [mongoose.Schema.Types.Mixed], default: [] },
    bestPractices: { type: [mongoose.Schema.Types.Mixed], default: [] },
    concepts: { type: [mongoose.Schema.Types.Mixed], default: [] },
    interviewQuestions: { type: [mongoose.Schema.Types.Mixed], default: [] },
    practiceTask: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

codeAnalysisSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('CodeAnalysis', codeAnalysisSchema);
