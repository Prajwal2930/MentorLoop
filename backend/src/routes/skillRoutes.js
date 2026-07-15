const express = require('express');

const { createSkill, deleteSkill, getSkills, updateSkill } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');
const { validateCreateSkill, validateUpdateSkill } = require('../validators/skillValidator');

const router = express.Router();

router.use(protect);

router.route('/').get(getSkills).post(validateCreateSkill, createSkill);
router.route('/:id').put(validateUpdateSkill, updateSkill).delete(deleteSkill);

module.exports = router;
