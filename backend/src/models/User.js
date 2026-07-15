const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters long.'],
      maxlength: [100, 'Full name cannot exceed 100 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [8, 'Password must be at least 8 characters long.'],
      select: false,
    },
    avatar: {
      type: String,
      trim: true,
      default: null,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters.'],
      default: '',
    },
    college: {
      type: String,
      trim: true,
      maxlength: [150, 'College name cannot exceed 150 characters.'],
      default: '',
    },
    graduationYear: {
      type: Number,
      min: [1900, 'Graduation year must be 1900 or later.'],
      max: [2100, 'Graduation year cannot exceed 2100.'],
      default: null,
    },
    targetRole: {
      type: String,
      required: [true, 'Target role is required.'],
      trim: true,
      maxlength: [100, 'Target role cannot exceed 100 characters.'],
    },
    experienceLevel: {
      type: String,
      required: [true, 'Experience level is required.'],
      enum: {
        values: ['beginner', 'intermediate', 'advanced'],
        message: 'Experience level must be beginner, intermediate, or advanced.',
      },
    },
    preferredLearningStyle: {
      type: String,
      enum: {
        values: ['visual', 'reading-writing', 'hands-on', 'mixed'],
        message: 'Preferred learning style is invalid.',
      },
      default: null,
    },
    dailyLearningGoal: {
      type: Number,
      min: [15, 'Daily learning goal must be at least 15 minutes.'],
      max: [480, 'Daily learning goal cannot exceed 480 minutes.'],
      default: null,
    },
    githubUsername: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    githubConnected: {
      type: Boolean,
      default: false,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_document, returnedObject) => {
        delete returnedObject.password;
        delete returnedObject.__v;
        return returnedObject;
      },
    },
  }
);

// Hash a password only when it is first set or subsequently changed.
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/** Compare a plain-text password with this user's stored password hash. */
userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
