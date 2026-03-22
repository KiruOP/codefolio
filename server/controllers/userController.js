const User = require('../models/User');

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT /api/users/profile
// @desc    Update user profile & social links
// @access  Private
exports.updateProfile = async (req, res) => {
  const { fullName, location, bio, github, linkedin, website, avatar, resumeData, resumeName } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update embedded profile details
    if (!user.profile) user.profile = {};
    if (fullName !== undefined) user.profile.name = fullName;
    if (location !== undefined) user.profile.location = location;
    if (bio !== undefined) user.profile.bio = bio;

    // Profile picture (base64 dataURL)
    if (avatar !== undefined) user.profile.avatar = avatar;

    // Resume PDF (base64)
    if (resumeData !== undefined) user.profile.resumeData = resumeData;
    if (resumeName !== undefined) user.profile.resumeName = resumeName;

    // Update embedded social links
    if (!user.profile.socialLinks) user.profile.socialLinks = {};
    if (github !== undefined) user.profile.socialLinks.github = github;
    if (linkedin !== undefined) user.profile.socialLinks.linkedin = linkedin;
    if (website !== undefined) user.profile.socialLinks.website = website;

    user.markModified('profile');
    await user.save();
    
    // Return updated user omitting password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET /api/users/skills
// @desc    Get user skills
// @access  Private
exports.getSkills = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json(user.skills || []);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT /api/users/skills
// @desc    Update user skills
// @access  Private
exports.updateSkills = async (req, res) => {
  const { skills } = req.body; // Expects an array of { category, items }
  
  if (!Array.isArray(skills)) {
    return res.status(400).json({ message: 'Skills must be an array' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.skills = skills;
    await user.save();

    res.json(user.skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT /api/users/template
// @desc    Update user template selection
// @access  Private
exports.updateTemplate = async (req, res) => {
  const { templateId } = req.body;
  if (!templateId) {
    return res.status(400).json({ message: 'Template ID is required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.templateId = templateId;
    await user.save();
    
    // Return updated user omitting password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
