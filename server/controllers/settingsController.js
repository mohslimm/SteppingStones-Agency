const Setting = require('../models/Setting');

const DEFAULT_SETTINGS = {
  agencyName: 'Stepping Stones Agency',
  tagline: 'Elite AI Systems, Spatial Sensing & Quiet Luxury Digital Engineering',
  founder: 'Mohamed Slimani',
  contactEmail: 'contact@steppingstones.agency',
  contactPhone: '+213 550 000 000',
  address: 'Algiers / Dubai / Paris',
  maintenance: false,
  socialLinks: {
    github: 'https://github.com/mohslimm',
    linkedin: '',
    twitter: ''
  }
};

const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    let settings = null;
    if (Setting.db?.readyState === 1) {
      settings = await Setting.findOne();
    }
    const current = settings ? settings.toObject() : DEFAULT_SETTINGS;
    res.status(200).json({ success: true, key, value: current[key] ?? null });
  } catch (error) {
    res.status(200).json({ success: true, key: req.params.key, value: DEFAULT_SETTINGS[req.params.key] ?? null });
  }
};

const updateSetting = async (req, res) => {
  try {
    const { key, value } = req.body;
    let settings = null;
    if (Setting.db?.readyState === 1) {
      settings = await Setting.findOneAndUpdate({}, { [key]: value }, { new: true, upsert: true });
    }
    res.status(200).json({ success: true, key, value });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getSettings = async (req, res) => {
  try {
    let settings = null;
    if (Setting.db?.readyState === 1) {
      settings = await Setting.findOne();
    }
    res.status(200).json({ success: true, data: settings || DEFAULT_SETTINGS });
  } catch (error) {
    res.status(200).json({ success: true, data: DEFAULT_SETTINGS });
  }
};

const updateSettings = async (req, res) => {
  try {
    let settings = null;
    if (Setting.db?.readyState === 1) {
      settings = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    }
    res.status(200).json({ success: true, data: settings || req.body });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getSetting,
  updateSetting,
  getSettings,
  updateSettings
};
