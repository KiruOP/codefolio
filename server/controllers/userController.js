const User = require('../models/User');

// @route   PUT /api/users/profile
// @desc    Update user profile & social links
// @access  Private
exports.updateProfile = async (req, res) => {
  const { fullName, location, bio, github, linkedin, website } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update embedded profile details
    if (!user.profile) user.profile = {};
    if (fullName) user.profile.name = fullName;
    if (location) user.profile.location = location;
    if (bio) user.profile.bio = bio;

    // Update embedded social links
    if (!user.profile.socialLinks) user.profile.socialLinks = {};
    if (github) user.profile.socialLinks.github = github;
    if (linkedin) user.profile.socialLinks.linkedin = linkedin;
    if (website) user.profile.socialLinks.website = website;

    await user.save();
    
    // Return updated user omitting password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
