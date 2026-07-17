const express = require('express');
const { evaluateInterviewSession, getInterviewById, getInterviewHistory, startInterview } = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.use(protect);
router.post('/start', startInterview);
router.post('/evaluate', evaluateInterviewSession);
router.get('/history', getInterviewHistory);
router.get('/:id', getInterviewById);

module.exports = router;
