const express = require('express');

const { createProjectReview, getProjectReviewById, getProjectReviewHistory } = require('../controllers/projectReviewController');
const { protect } = require('../middleware/authMiddleware');
const { validateProjectReview } = require('../validators/projectReviewValidator');

const router = express.Router();

router.post('/review', protect, validateProjectReview, createProjectReview);
router.get('/reviews', protect, getProjectReviewHistory);
router.get('/review/:id', protect, getProjectReviewById);

module.exports = router;
