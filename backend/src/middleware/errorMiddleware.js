const AppError = require('../utils/AppError');

/** Handle unknown routes after all application routes have been registered. */
const notFound = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

/** Convert application and database errors into a consistent API response. */
const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error.';

  if (error.code === 11000) {
    statusCode = 409;
    message = 'An account with this email already exists.';
  }

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((validationError) => validationError.message)
      .join(' ');
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for ${error.path}.`;
  }

  const response = {
    success: false,
    message: statusCode >= 500 && process.env.NODE_ENV === 'production'
      ? 'Internal server error.'
      : message,
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };
