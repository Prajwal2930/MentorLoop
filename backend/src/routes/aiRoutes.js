const express = require('express');

const { analyzeCodeRequest } = require('../controllers/codeAnalysisController');
const { protect } = require('../middleware/authMiddleware');
const { validateCodeAnalysis } = require('../validators/codeAnalysisValidator');

const router = express.Router();

router.post('/analyze-code', protect, validateCodeAnalysis, analyzeCodeRequest);

module.exports = router;
