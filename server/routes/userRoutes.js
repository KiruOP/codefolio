const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { updateProfile, getSkills, updateSkills } = require('../controllers/userController');

// @route   PUT /api/users/profile
// @desc    Update user profile & social links
// @access  Private
router.put('/profile', protect, updateProfile);

// @route   GET /api/users/skills
// @desc    Get user skills
// @access  Private
router.get('/skills', protect, getSkills);

// @route   PUT /api/users/skills
// @desc    Update user skills
// @access  Private
router.put('/skills', protect, updateSkills);

module.exports = router;
