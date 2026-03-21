const User = require('../models/User');
const Project = require('../models/Project');
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @route   GET /api/portfolio/:username
// @desc    Get complete portfolio data by username
// @access  Public
exports.getPortfolioByUsername = async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    
    // Fetch user without sensitive data
    const user = await User.findOne({ username }).select('-password -email');
    if (!user) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Fetch associated projects
    const projects = await Project.find({ user: user._id }).sort({ createdAt: -1 });

    // Ensure we correctly assemble the response structure, embedding skills
    res.json({
      user,
      projects,
      skills: user.skills || []
    });
  } catch (err) {
    console.error(`Error in getPortfolioByUsername: ${err.message}`);
    res.status(500).send('Server Error');
  }
};

// @route   POST /api/portfolio/:username/contact
// @desc    Send a message to a user via portfolio
// @access  Public
exports.sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;
  const username = req.params.username.toLowerCase();

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Portfolio not found' });

    // 1. Save Message to Database (Branch 17)
    const newMessage = new Message({
      user: user._id,
      senderName: name,
      senderEmail: email,
      message
    });
    await newMessage.save();

    // 2. Transmit Email via Nodemailer (Branch 18)
    // We will use Ethereal for dev if no real SMTP details exist.
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: user.email,
        subject: `[CodeFolio] New Contact from ${name}`,
        text: `You have received a new message from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p>You have received a new message from your portfolio.</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
      }).catch(err => console.error('SMTP Delivery failed:', err));
    }

    res.status(200).json({ success: true, message: 'Message securely transmitted' });
  } catch (err) {
    console.error(`Contact API Error: ${err.message}`);
    res.status(500).send('Server Error');
  }
};
