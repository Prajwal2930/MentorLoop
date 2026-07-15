const mongoose = require('mongoose');

const SUPPORTED_SKILLS = [
  'Java',
  'JavaScript',
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'MySQL',
  'Spring Boot',
  'Python',
  'Git',
  'Docker',
  'DSA',
];

const skillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    skillName: {
      type: String,
      required: [true, 'Skill name is required.'],
      enum: {
        values: SUPPORTED_SKILLS,
        message: 'Skill name is not supported.',
      },
    },
    level: {
      type: Number,
      required: [true, 'Skill level is required.'],
      min: [0, 'Skill level cannot be below 0.'],
      max: [100, 'Skill level cannot exceed 100.'],
      default: 0,
    },
    confidence: {
      type: String,
      required: [true, 'Confidence is required.'],
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Confidence must be low, medium, or high.',
      },
      default: 'low',
    },
  },
  { timestamps: true }
);

// A user should have only one record for each supported skill.
skillSchema.index({ userId: 1, skillName: 1 }, { unique: true });

skillSchema.statics.SUPPORTED_SKILLS = SUPPORTED_SKILLS;

module.exports = mongoose.model('Skill', skillSchema);
