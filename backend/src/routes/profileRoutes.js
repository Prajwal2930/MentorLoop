const express = require('express');

const { completeProfile, getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { validateProfileUpdate } = require('../validators/profileValidator');

const router = express.Router();

router.use(protect);

router.patch('/complete', completeProfile);
router.route('/').get(getProfile).put(validateProfileUpdate, updateProfile);

module.exports = router;
