const User = require('../models/User');
const AppError = require('../utils/AppError');
const generateToken = require('../utils/generateToken');

const sendAuthResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

/** Register a new user account. */
const register = async (req, res, next) => {
  try {
    const { fullName, email, password, avatar, targetRole, experienceLevel, githubUsername } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new AppError('An account with this email already exists.', 409));
    }

    const user = await User.create({
      fullName,
      email,
      password,
      avatar,
      targetRole,
      experienceLevel,
      githubUsername,
    });

    sendAuthResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

/** Authenticate an existing user and issue a JWT. */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Password is explicitly selected because it is excluded from normal queries.
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Invalid email or password.', 401));
    }

    sendAuthResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
