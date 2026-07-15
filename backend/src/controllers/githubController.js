const AppError = require('../utils/AppError');

/** Verify a public GitHub username and connect it to the authenticated user. */
const connectGithub = async (req, res, next) => {
  try {
    const { githubUsername } = req.body;
    const githubResponse = await fetch(`https://api.github.com/users/${encodeURIComponent(githubUsername)}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'MentorLoop',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (githubResponse.status === 404) {
      return next(new AppError('GitHub user was not found.', 404));
    }

    if (!githubResponse.ok) {
      return next(new AppError('GitHub could not validate this username. Please try again later.', 503));
    }

    req.user.githubUsername = githubUsername;
    req.user.githubConnected = true;
    await req.user.save();

    res.status(200).json({
      success: true,
      message: 'GitHub account connected successfully.',
      githubUsername: req.user.githubUsername,
      githubConnected: req.user.githubConnected,
    });
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return next(new AppError('GitHub validation timed out. Please try again.', 504));
    }

    next(error);
  }
};

module.exports = { connectGithub };
