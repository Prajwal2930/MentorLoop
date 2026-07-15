const express = require('express');

const { connectGithub } = require('../controllers/githubController');
const { protect } = require('../middleware/authMiddleware');
const { validateGithubConnection } = require('../validators/githubValidator');

const router = express.Router();

router.post('/connect', protect, validateGithubConnection, connectGithub);

module.exports = router;
