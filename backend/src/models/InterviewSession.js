const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  { question: { type: String, required: true }, category: { type: String, required: true } },
  { _id: true }
);

const answerSchema = new mongoose.Schema(
  { questionId: { type: mongoose.Schema.Types.ObjectId, required: true }, answer: { type: String, required: true, maxlength: 10000 } },
  { _id: false }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    interviewType: { type: String, required: true, enum: ['HR', 'Technical', 'Mixed'] },
    targetRole: { type: String, required: true, trim: true },
    questions: { type: [questionSchema], required: true },
    answers: { type: [answerSchema], default: [] },
    aiFeedback: { type: mongoose.Schema.Types.Mixed, default: null },
    overallScore: { type: Number, min: 0, max: 100, default: null },
    communicationScore: { type: Number, min: 0, max: 100, default: null },
    technicalScore: { type: Number, min: 0, max: 100, default: null },
    confidenceScore: { type: Number, min: 0, max: 100, default: null },
    improvementSuggestions: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

interviewSessionSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
