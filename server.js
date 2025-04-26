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
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper functions for file operations
const readJsonFile = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
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
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
};

// Initialize empty data files if they don't exist
if (!fs.existsSync(PROFILE_FILE)) {
  writeJsonFile(PROFILE_FILE, {
    name: "Ahmed Aboelcode",
    title: "Full-Stack Developer",
    bio: "Passionate full-stack developer with expertise in creating responsive and user-friendly web applications.",
    email: "aboelcode@gmail.com",
    location: "Egypt"
  });
}

if (!fs.existsSync(PROJECTS_FILE)) {
  writeJsonFile(PROJECTS_FILE, []);
}

if (!fs.existsSync(SKILLS_FILE)) {
  writeJsonFile(SKILLS_FILE, []);
}

if (!fs.existsSync(MESSAGES_FILE)) {
  writeJsonFile(MESSAGES_FILE, []);
}

console.log('Local JSON data files ready');

// API Routes
app.get('/api/profile', (req, res) => {
  try {
    const profile = readJsonFile(PROFILE_FILE);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile data not found' });
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
      res.status(404).json({ error: 'Projects data not found' });
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
      res.status(404).json({ error: 'Skills data not found' });
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