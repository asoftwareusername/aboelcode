/**
 * @developer: Ahmed Aboelcode (@aboelcode)
 * Portfolio Website JavaScript
 */

// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const skillCategoryBtns = document.querySelectorAll('.skill-category-btn');
const skillsGrid = document.getElementById('skills-grid');
const projectsGrid = document.getElementById('projects-grid');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// State Management
let profile = {};
let skills = [];
let projects = [];
let activeSkillCategory = 'all';

// Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize
  await fetchData();
  setupEventListeners();
});

// Menu Toggle
menuToggle?.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navList.classList.toggle('active');
});

// Setup Event Listeners
function setupEventListeners() {
  // Navigation Smooth Scroll
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Close mobile menu if open
      if (navList.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
      }
      
      // Scroll to target section
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Skills Category Filtering
  skillCategoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      skillCategoryBtns.forEach(categoryBtn => categoryBtn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Update active category and filter skills
      activeSkillCategory = this.getAttribute('data-category');
      filterSkills();
    });
  });
  
  // Contact Form Submission
  contactForm?.addEventListener('submit', handleContactFormSubmit);
}

// Fetch Data from API
async function fetchData() {
  try {
    // Fetch profile data
    const profileResponse = await fetch('/api/profile');
    if (profileResponse.ok) {
      profile = await profileResponse.json();
      populateProfileData();
    }
    
    // Fetch skills data
    const skillsResponse = await fetch('/api/skills');
    if (skillsResponse.ok) {
      skills = await skillsResponse.json();
      populateSkills();
    }
    
    // Fetch projects data
    const projectsResponse = await fetch('/api/projects');
    if (projectsResponse.ok) {
      projects = await projectsResponse.json();
      populateProjects();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Fallback to sample data if API fails
    useFallbackData();
  }
}

// Use fallback data if API fails (for testing)
function useFallbackData() {
  // Fallback profile data
  profile = {
    name: 'Ahmed Aboelcode',
    title: 'Full-Stack Developer',
    bio: 'Passionate full-stack developer with expertise in creating responsive and user-friendly web applications. Skilled in both front-end and back-end technologies.',
    email: 'aboelcode@gmail.com',
    location: 'Egypt',
    github_url: 'https://github.com/aboelcode',
    linkedin_url: 'https://linkedin.com/in/aboelcode',
    facebook_url: 'https://facebook.com/aboelcode',
    profile_image: 'https://via.placeholder.com/300',
    resume_url: '#'
  };
  
  // Fallback skills data
  skills = [
    { name: 'HTML', category: 'Frontend', proficiency: 90, icon: 'html5', display_order: 1 },
    { name: 'CSS', category: 'Frontend', proficiency: 85, icon: 'css3', display_order: 2 },
    { name: 'JavaScript', category: 'Frontend', proficiency: 90, icon: 'javascript', display_order: 3 },
    { name: 'Responsive Design', category: 'Frontend', proficiency: 85, icon: 'mobile', display_order: 4 },
    { name: 'Node.js', category: 'Backend', proficiency: 85, icon: 'node-js', display_order: 5 },
    { name: 'Express', category: 'Backend', proficiency: 80, icon: 'server', display_order: 6 },
    { name: 'SQLite', category: 'Database', proficiency: 75, icon: 'database', display_order: 7 },
    { name: 'PostgreSQL', category: 'Database', proficiency: 70, icon: 'database', display_order: 8 },
    { name: 'Git', category: 'Tools', proficiency: 85, icon: 'git', display_order: 9 },
    { name: 'Python', category: 'Programming', proficiency: 75, icon: 'python', display_order: 10 }
  ];
  
  // Fallback projects data
  projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with product catalog, shopping cart, and payment integration.',
      image_url: 'https://via.placeholder.com/350x200',
      github_url: 'https://github.com/aboelcode/ecommerce',
      live_url: 'https://ecommerce-demo.aboelcode.com',
      featured: true,
      display_order: 1,
      technologies: JSON.stringify(['Node.js', 'Express', 'SQLite', 'JavaScript', 'HTML', 'CSS'])
    },
    {
      title: 'Task Management App',
      description: 'A task management application to help users organize their work with features like task categories, due dates, and progress tracking.',
      image_url: 'https://via.placeholder.com/350x200',
      github_url: 'https://github.com/aboelcode/taskmanager',
      live_url: 'https://taskmanager-demo.aboelcode.com',
      featured: true,
      display_order: 2,
      technologies: JSON.stringify(['Node.js', 'Express', 'SQLite', 'JavaScript', 'HTML', 'CSS'])
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather dashboard that displays current weather conditions and forecasts for multiple locations.',
      image_url: 'https://via.placeholder.com/350x200',
      github_url: 'https://github.com/aboelcode/weather',
      live_url: 'https://weather-demo.aboelcode.com',
      featured: false,
      display_order: 3,
      technologies: JSON.stringify(['JavaScript', 'HTML', 'CSS', 'Weather API'])
    }
  ];
  
  // Populate the page with fallback data
  populateProfileData();
  populateSkills();
  populateProjects();
}

// Populate Profile Data
function populateProfileData() {
  // Profile image
  const profileImageElement = document.getElementById('profile-image');
  if (profileImageElement && profile.profile_image) {
    profileImageElement.src = profile.profile_image;
    profileImageElement.alt = profile.name;
  }
  
  // Bio
  const bioElement = document.getElementById('bio');
  if (bioElement) {
    bioElement.textContent = profile.bio || '';
  }
  
  // Location
  const locationElement = document.getElementById('location');
  if (locationElement) {
    locationElement.textContent = profile.location || '';
  }
  
  // Email
  const emailElement = document.getElementById('email');
  if (emailElement) {
    emailElement.textContent = profile.email || '';
  }
  
  // Social Links
  const githubLink = document.getElementById('github-link');
  if (githubLink && profile.github_url) {
    githubLink.href = profile.github_url;
  }
  
  const linkedinLink = document.getElementById('linkedin-link');
  if (linkedinLink && profile.linkedin_url) {
    linkedinLink.href = profile.linkedin_url;
  }
  
  const facebookLink = document.getElementById('facebook-link');
  if (facebookLink && profile.facebook_url) {
    facebookLink.href = profile.facebook_url;
  }
  
  // Resume Link
  const resumeLink = document.getElementById('resume-link');
  if (resumeLink && profile.resume_url) {
    resumeLink.href = profile.resume_url;
  }
}

// Populate Skills
function populateSkills() {
  if (!skillsGrid || !Array.isArray(skills)) return;
  
  // Clear skills grid
  skillsGrid.innerHTML = '';
  
  // Filter skills by active category
  const filteredSkills = filterSkillsByCategory();
  
  // Sort skills by display order
  filteredSkills.sort((a, b) => a.display_order - b.display_order);
  
  // Create skill cards and append to grid
  filteredSkills.forEach(skill => {
    const skillCard = createSkillCard(skill);
    skillsGrid.appendChild(skillCard);
  });
}

// Filter skills by category
function filterSkillsByCategory() {
  if (activeSkillCategory === 'all') {
    return [...skills];
  }
  
  return skills.filter(skill => skill.category === activeSkillCategory);
}

// Filter skills based on active category
function filterSkills() {
  populateSkills();
}

// Create Skill Card
function createSkillCard(skill) {
  const card = document.createElement('div');
  card.className = 'skill-card';
  
  const header = document.createElement('div');
  header.className = 'skill-header';
  
  const info = document.createElement('div');
  
  const name = document.createElement('h3');
  name.className = 'skill-name';
  name.textContent = skill.name;
  
  const category = document.createElement('p');
  category.className = 'skill-category';
  category.textContent = skill.category;
  
  const progress = document.createElement('div');
  progress.className = 'skill-progress';
  
  const progressBar = document.createElement('div');
  progressBar.className = 'skill-progress-bar';
  progressBar.style.width = `${skill.proficiency}%`;
  
  info.appendChild(name);
  info.appendChild(category);
  
  header.appendChild(info);
  
  progress.appendChild(progressBar);
  
  card.appendChild(header);
  card.appendChild(progress);
  
  return card;
}

// Populate Projects
function populateProjects() {
  if (!projectsGrid || !Array.isArray(projects)) return;
  
  // Clear projects grid
  projectsGrid.innerHTML = '';
  
  // Sort projects by display order
  const sortedProjects = [...projects].sort((a, b) => a.display_order - b.display_order);
  
  // Create project cards and append to grid
  sortedProjects.forEach(project => {
    const projectCard = createProjectCard(project);
    projectsGrid.appendChild(projectCard);
  });
}

// Create Project Card
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  const imageContainer = document.createElement('div');
  imageContainer.className = 'project-image';
  
  const image = document.createElement('img');
  image.src = project.image_url || 'https://via.placeholder.com/350x200';
  image.alt = project.title;
  
  const content = document.createElement('div');
  content.className = 'project-content';
  
  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = project.title;
  
  const description = document.createElement('p');
  description.className = 'project-description';
  description.textContent = project.description;
  
  // Technologies
  const technologiesContainer = document.createElement('div');
  technologiesContainer.className = 'project-technologies';
  
  let technologies = [];
  
  try {
    if (typeof project.technologies === 'string') {
      technologies = JSON.parse(project.technologies);
    } else if (Array.isArray(project.technologies)) {
      technologies = project.technologies;
    }
  } catch (error) {
    console.error('Error parsing technologies:', error);
  }
  
  technologies.forEach(tech => {
    const techSpan = document.createElement('span');
    techSpan.className = 'project-technology';
    techSpan.textContent = tech;
    technologiesContainer.appendChild(techSpan);
  });
  
  // Links
  const links = document.createElement('div');
  links.className = 'project-links';
  
  if (project.github_url) {
    const githubLink = document.createElement('a');
    githubLink.className = 'project-link';
    githubLink.href = project.github_url;
    githubLink.target = '_blank';
    githubLink.rel = 'noopener';
    githubLink.textContent = 'View on GitHub';
    links.appendChild(githubLink);
  }
  
  if (project.live_url) {
    const liveLink = document.createElement('a');
    liveLink.className = 'project-link';
    liveLink.href = project.live_url;
    liveLink.target = '_blank';
    liveLink.rel = 'noopener';
    liveLink.textContent = 'Live Demo';
    links.appendChild(liveLink);
  }
  
  // Assemble card
  imageContainer.appendChild(image);
  
  content.appendChild(title);
  content.appendChild(description);
  content.appendChild(technologiesContainer);
  content.appendChild(links);
  
  card.appendChild(imageContainer);
  card.appendChild(content);
  
  return card;
}

// Handle contact form submission
async function handleContactFormSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email-input').value;
  const message = document.getElementById('message').value;
  
  // Validate form data
  if (!name || !email || !message) {
    showFormStatus('Please fill out all fields', 'error');
    return;
  }
  
  try {
    // Send form data to API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Clear form
      contactForm.reset();
      
      // Show success message
      showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
    } else {
      showFormStatus(data.error || 'Failed to send message. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    showFormStatus('Failed to send message. Please try again.', 'error');
  }
}

// Show form status message
function showFormStatus(message, type) {
  if (!formStatus) return;
  
  formStatus.textContent = message;
  formStatus.className = 'form-status';
  formStatus.classList.add(type);
  
  formStatus.style.display = 'block';
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
}

// Handle scroll event for active navigation
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  // Get all sections
  const sections = document.querySelectorAll('section');
  
  // Check which section is currently visible
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove active class from all navigation links
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      
      // Add active class to corresponding navigation link
      const activeNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (activeNavLink) {
        activeNavLink.classList.add('active');
      }
    }
  });
});