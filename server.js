// @developer: Ahmed Aboelcode (@aboelcode)
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const fs = require('fs');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const PROFILE_FILE = path.join(DATA_DIR, 'profile.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const SKILLS_FILE = path.join(DATA_DIR, 'skills.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`Created data directory at ${DATA_DIR}`);
  }
} catch (error) {
  console.error(`Error creating data directory: ${error.message}`);
}

// Helper functions for file operations
const readJsonFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return null;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

const writeJsonFile = (filePath, data) => {
  try {
    // Ensure the directory exists
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
};

// Initialize default data files if they don't exist
// Profile
if (!fs.existsSync(PROFILE_FILE)) {
  const defaultProfile = {
    name: "Ahmed Aboelcode",
    title: "Full-Stack Developer",
    bio: "Passionate full-stack developer with expertise in creating responsive and user-friendly web applications.",
    email: "aboelcode@gmail.com",
    location: "Egypt",
    github_url: "https://github.com/aboelcode",
    facebook_url: "https://facebook.com/aboelcode",
    linkedin_url: "https://linkedin.com/in/aboelcode",
    profile_image: "/images/profile.jpg",
    resume_url: "/files/resume.pdf"
  };
  
  if (writeJsonFile(PROFILE_FILE, defaultProfile)) {
    console.log(`Created default profile at ${PROFILE_FILE}`);
  }
}

// Projects
if (!fs.existsSync(PROJECTS_FILE)) {
  const defaultProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with product catalog, shopping cart, and payment integration.",
      image_url: "/images/projects/ecommerce.jpg",
      github_url: "https://github.com/aboelcode/ecommerce",
      live_url: "https://ecommerce-demo.aboelcode.com",
      featured: true,
      display_order: 1,
      technologies: ["Node.js", "Express", "JavaScript", "HTML", "CSS"]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A task management application to help users organize their work with features like task categories, due dates, and progress tracking.",
      image_url: "/images/projects/taskmanager.jpg",
      github_url: "https://github.com/aboelcode/taskmanager",
      live_url: "https://taskmanager-demo.aboelcode.com",
      featured: true,
      display_order: 2,
      technologies: ["Node.js", "Express", "JavaScript", "HTML", "CSS"]
    }
  ];
  
  if (writeJsonFile(PROJECTS_FILE, defaultProjects)) {
    console.log(`Created default projects at ${PROJECTS_FILE}`);
  }
}

// Skills
if (!fs.existsSync(SKILLS_FILE)) {
  const defaultSkills = [
    { id: 1, name: "HTML", category: "Frontend", proficiency: 90, icon: "html5", display_order: 1 },
    { id: 2, name: "CSS", category: "Frontend", proficiency: 85, icon: "css3", display_order: 2 },
    { id: 3, name: "JavaScript", category: "Frontend", proficiency: 90, icon: "javascript", display_order: 3 },
    { id: 4, name: "Node.js", category: "Backend", proficiency: 85, icon: "node-js", display_order: 5 },
    { id: 5, name: "Express", category: "Backend", proficiency: 80, icon: "server", display_order: 6 }
  ];
  
  if (writeJsonFile(SKILLS_FILE, defaultSkills)) {
    console.log(`Created default skills at ${SKILLS_FILE}`);
  }
}

// Messages
if (!fs.existsSync(MESSAGES_FILE)) {
  if (writeJsonFile(MESSAGES_FILE, [])) {
    console.log(`Created empty messages file at ${MESSAGES_FILE}`);
  }
}

console.log('Local JSON data files ready');

// API Routes
app.get('/api/profile', (req, res) => {
  try {
    const profile = readJsonFile(PROFILE_FILE);
    if (profile) {
      res.json(profile);
    } else {
      // If profile data doesn't exist, return default profile
      const defaultProfile = {
        name: "Ahmed Aboelcode",
        title: "Full-Stack Developer",
        bio: "Passionate full-stack developer with expertise in responsive web applications.",
        email: "aboelcode@gmail.com",
        location: "Egypt"
      };
      res.json(defaultProfile);
    }
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});

app.get('/api/projects', (req, res) => {
  try {
    const projects = readJsonFile(PROJECTS_FILE);
    if (projects) {
      res.json(projects);
    } else {
      // Return empty array if no projects found
      res.json([]);
    }
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects data' });
  }
});

app.get('/api/skills', (req, res) => {
  try {
    const skills = readJsonFile(SKILLS_FILE);
    if (skills) {
      res.json(skills);
    } else {
      // Return empty array if no skills found
      res.json([]);
    }
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ error: 'Failed to fetch skills data' });
  }
});

// Message submission endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const messages = readJsonFile(MESSAGES_FILE) || [];
    const newMessage = {
      id: messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1,
      name,
      email,
      message,
      read: false,
      created_at: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    if (writeJsonFile(MESSAGES_FILE, messages)) {
      res.status(201).json({ success: true, message: 'Message sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to save message' });
    }
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Local:   http://localhost:${PORT}`);
  console.log(`Website: https://aboelcode.com`);
}); 