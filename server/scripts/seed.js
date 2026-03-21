const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const User = require('../models/User');
const Project = require('../models/Project');
const Message = require('../models/Message');

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/codefolio";
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected for Seeding...');

    // Clear existing demo data
    const demoUsernames = ['johndoe', 'neohacker'];
    const usersToDelete = await User.find({ username: { $in: demoUsernames } });
    const userIds = usersToDelete.map(u => u._id);
    
    await Project.deleteMany({ user: { $in: userIds } });
    await Message.deleteMany({ user: { $in: userIds } });
    await User.deleteMany({ username: { $in: demoUsernames } });

    console.log('Previous demo data obliterated.');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // 1. Minimal Persona (John Doe)
    const john = new User({
      username: 'johndoe',
      email: 'john@example.com',
      password: passwordHash,
      templateId: 'minimal',
      isPro: false,
      profile: {
        name: 'John Doe',
        company: 'Vercel',
        location: 'San Francisco, CA',
        bio: 'Senior Product Engineer specializing in high-performance React architectures and accessible UI/UX systems. I construct scalable web applications using Next.js and Tailwind CSS.',
        socialLinks: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com'
        }
      },
      skills: [
        { category: 'Frontend Architecture', items: ['React', 'Next.js', 'Typescript', 'Tailwind CSS'] },
        { category: 'Backend Systems', items: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis'] },
        { category: 'DevOps & Tooling', items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions'] }
      ]
    });
    const savedJohn = await john.save();

    // John's Projects
    await Project.insertMany([
      {
        user: savedJohn._id,
        title: 'Acme E-Commerce',
        description: 'A headless storefront handling 10k+ daily hits, built with Next.js App Router and Shopify Storefront API.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
        techStack: ['Next.js', 'Shopify', 'Tailwind', 'GraphQL'],
        repoLink: 'https://github.com',
        liveLink: 'https://example.com'
      },
      {
        user: savedJohn._id,
        title: 'Fintech Dashboard',
        description: 'Real-time financial analytics portal featuring websockets and D3.js data visualizations.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
        techStack: ['React', 'D3.js', 'Node.js', 'Socket.io'],
        repoLink: 'https://github.com',
        liveLink: 'https://example.com'
      },
      {
        user: savedJohn._id,
        title: 'TaskFlow Manager',
        description: 'Drag-and-drop kanban board optimized for extreme re-rendering performance.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
        techStack: ['React', 'Redux', 'DnD-Kit', 'Firebase'],
        repoLink: 'https://github.com'
      }
    ]);

    // 2. Cyberpunk Persona (Neo Hacker)
    const neo = new User({
      username: 'neohacker',
      email: 'neo@matrix.io',
      password: passwordHash,
      templateId: 'cyberpunk',
      isPro: true,
      profile: {
        name: 'Neo',
        company: 'Zion Mainframe',
        location: 'Sector 01',
        bio: 'Systems Architect and Security Expert. I operate in the shadows of the web, constructing impenetrable backend clusters and bleeding-edge neural interfaces.',
        socialLinks: {
          github: 'https://github.com',
          twitter: 'https://twitter.com'
        }
      },
      skills: [
        { category: 'System Languages', items: ['Rust', 'C++', 'Go', 'Assembly'] },
        { category: 'Network Security', items: ['Penetration Testing', 'Cryptography', 'Wireshark', 'Burp Suite'] },
        { category: 'Infrastructure', items: ['Kubernetes', 'Linux Kernel', 'AWS Outposts', 'Terraform'] },
        { category: 'Data Nodes', items: ['Apache Kafka', 'Cassandra', 'GridFS'] }
      ]
    });
    const savedNeo = await neo.save();

    // Neo's Projects
    await Project.insertMany([
      {
        user: savedNeo._id,
        title: 'Ghost Node Router',
        description: 'An encrypted P2P routing relay written in Rust, bypassing standard ISP monitoring.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
        techStack: ['Rust', 'WASM', 'libp2p'],
        repoLink: 'https://github.com'
      },
      {
        user: savedNeo._id,
        title: 'Terminal Interface OS',
        description: 'A fully functional browser-based terminal OS featuring a native filesystem simulation.',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221eca9?auto=format&fit=crop&q=80',
        techStack: ['JavaScript', 'Canvas', 'WebGL'],
        liveLink: 'https://example.com'
      },
      {
        user: savedNeo._id,
        title: 'Grid Zero Scanner',
        description: 'Automated vulnerability reconnaissance bot sweeping corporate subdomains.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        techStack: ['Go', 'Docker', 'Bash']
      },
      {
        user: savedNeo._id,
        title: 'Neural Net Visualizer',
        description: 'Real-time rendering of deep learning epochs using WebGL shaders.',
        image: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?auto=format&fit=crop&q=80',
        techStack: ['Python', 'WebGL', 'Three.js'],
        repoLink: 'https://github.com',
        liveLink: 'https://example.com'
      }
    ]);

    console.log('Seeding Sequence Completed!');
    console.log(`Demo 1 (Minimal): username 'johndoe', pass 'password123'`);
    console.log(`Demo 2 (Cyberpunk - PRO): username 'neohacker', pass 'password123'`);
    process.exit(0);

  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedDB();
