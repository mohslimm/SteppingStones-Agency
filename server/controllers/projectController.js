const Project = require('../models/Project');
const { PROJECTS } = require('../seedProjects');

// @desc    Get all projects (with fallback to master inventory)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    let projects = [];
    if (Project.db?.readyState === 1) {
      projects = await Project.find().sort({ featured: -1, createdAt: -1 }).lean();
    }
    
    // If database returned no projects or not connected, deliver the 30 master projects
    if (!projects || projects.length === 0) {
      projects = PROJECTS;
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    // Graceful fallback to static master inventory
    res.status(200).json({
      success: true,
      count: PROJECTS.length,
      data: PROJECTS,
      warning: 'Delivered via master static cache'
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const { title, description, techStack, nicheCategory, liveUrl, githubUrl, roiImpact, featured } = req.body;

    let image = req.body.image || '';
    if (req.files?.image?.[0]) {
      image = req.files.image[0].path || `/uploads/${req.files.image[0].filename}`;
    }

    let gallery = [];
    if (req.files?.gallery) {
      gallery = req.files.gallery.map(f => f.path || `/uploads/${f.filename}`);
    }

    const project = await Project.create({
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : (typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()) : []),
      nicheCategory,
      liveUrl,
      githubUrl,
      image: image || '/projects/nexus-horizon-render.jpg',
      gallery: gallery.length > 0 ? gallery : [image],
      roiImpact,
      featured: featured === 'true' || featured === true
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getProjects,
  createProject
};
