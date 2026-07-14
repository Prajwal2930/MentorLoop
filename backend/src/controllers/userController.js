/** Return the profile of the user authenticated by authMiddleware. */
const getCurrentUser = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = { getCurrentUser };
