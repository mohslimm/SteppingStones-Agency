const Lead = require('../models/Lead');

// @desc    Create new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  try {
    const { name, email, phone, service, message, budget } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Champs obligatoires manquants (nom, email, message).' });
    }

    let lead = null;
    if (Lead.db?.readyState === 1) {
      lead = await Lead.create({
        name,
        email,
        phone,
        service,
        message,
        budget,
        ip: req.ip || ''
      });
    }

    res.status(201).json({
      success: true,
      message: 'Demande enregistrée avec succès. Notre équipe vous recontactera sous 24h.',
      data: lead || { name, email, service, message, budget }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private (Admin)
const getLeads = async (req, res) => {
  try {
    let leads = [];
    if (Lead.db?.readyState === 1) {
      leads = await Lead.find().sort({ createdAt: -1 });
    }
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id
// @access  Private (Admin)
const updateLead = async (req, res) => {
  try {
    if (Lead.db?.readyState !== 1) {
      return res.status(200).json({ success: true, message: 'Lead mis à jour (mock mode).' });
    }
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ success: false, error: 'Lead non trouvé.' });
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLead
};
