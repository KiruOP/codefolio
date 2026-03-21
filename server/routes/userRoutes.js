const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { updateProfile, getSkills, updateSkills, updateTemplate } = require('../controllers/userController');

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

// @route   PUT /api/users/template
// @desc    Update user template selection
// @access  Private
router.put('/template', protect, updateTemplate);

module.exports = router;
