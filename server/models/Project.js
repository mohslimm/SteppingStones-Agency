const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  nicheCategory: { type: String, required: true },
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  gallery: [{ type: String }],
  demoVideo: { type: String, default: '' },
  roiImpact: { type: String, default: '' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
