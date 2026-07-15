const express = require('express');

const { getAnalysisById, getAnalysisHistory } = require('../controllers/codeAnalysisController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/history', getAnalysisHistory);
router.get('/:id', getAnalysisById);

module.exports = router;
