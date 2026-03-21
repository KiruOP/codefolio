const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { updateProfile } = require('../controllers/userController');

// @route   PUT /api/users/profile
// @desc    Update user profile & social links
// @access  Private
router.put('/profile', auth, updateProfile);

module.exports = router;
