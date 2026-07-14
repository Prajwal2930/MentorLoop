const jwt = require('jsonwebtoken');

const User = require('../models/User');
const AppError = require('../utils/AppError');

/** Require a valid Bearer JWT and attach its user to req.user. */
const protect = async (req, _res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith('Bearer ')) {
      return next(new AppError('Authentication is required to access this resource.', 401));
    }

    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return next(new AppError('The user associated with this token no longer exists.', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new AppError('Your authentication token is invalid or has expired.', 401));
    }

    next(error);
  }
};

module.exports = { protect };
