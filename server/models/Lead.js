const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  service: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  budget: { type: String, default: '' },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'converted', 'closed'], default: 'new' },
  ip: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
