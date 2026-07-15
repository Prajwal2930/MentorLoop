const AppError = require('../utils/AppError');

const validateCodeAnalysis = (req, _res, next) => {
  const { language, code } = req.body;

  if (typeof language !== 'string' || !language.trim() || language.trim().length > 50) {
    return next(new AppError('Please provide a valid programming language.', 400));
  }

  if (typeof code !== 'string' || !code.trim()) {
    return next(new AppError('Code is required for analysis.', 400));
  }

  if (code.length > 50000) {
    return next(new AppError('Code cannot exceed 50,000 characters.', 413));
  }

  req.body.language = language.trim();
  req.body.code = code.trim();
  next();
};

module.exports = { validateCodeAnalysis };
