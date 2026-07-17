const { getAnalytics } = require('../services/analytics.service');

const getCareerAnalytics = async (req, res, next) => {
  try {
    const analytics = await getAnalytics(req.user._id);
    res.status(200).json({ success: true, analytics });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCareerAnalytics };
