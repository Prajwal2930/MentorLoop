const express = require('express');

const { generateLearningRoadmap, getCurrentRoadmap, getRoadmapById, updateRoadmapWeek } = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.post('/generate', generateLearningRoadmap);
router.get('/', getCurrentRoadmap);
router.get('/:id', getRoadmapById);
router.patch('/week/:weekId', updateRoadmapWeek);

module.exports = router;
