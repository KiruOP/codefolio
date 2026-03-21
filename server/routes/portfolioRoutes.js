const express = require('express');
const router = express.Router();
const { getPortfolioByUsername, sendContactMessage } = require('../controllers/portfolioController');

// @route   GET /api/portfolio/:username
// @desc    Get complete portfolio data by username
// @access  Public
router.get('/:username', getPortfolioByUsername);

// @route   POST /api/portfolio/:username/contact
// @desc    Send a message via the portfolio contact form
// @access  Public
router.post('/:username/contact', sendContactMessage);

module.exports = router;
