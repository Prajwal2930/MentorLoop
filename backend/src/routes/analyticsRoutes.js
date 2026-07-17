const express = require('express');
const { getCareerAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/', protect, getCareerAnalytics);

module.exports = router;
