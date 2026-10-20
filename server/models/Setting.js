const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  agencyName: { type: String, default: 'Stepping Stones Agency' },
  tagline: { type: String, default: 'Elite AI Systems, Spatial Sensing & Quiet Luxury Digital Engineering' },
  contactEmail: { type: String, default: 'contact@steppingstones.agency' },
  contactPhone: { type: String, default: '+213 550 000 000' },
  address: { type: String, default: 'Algiers / Dubai / Paris' },
  socialLinks: {
    github: { type: String, default: 'https://github.com/mohslimm' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
