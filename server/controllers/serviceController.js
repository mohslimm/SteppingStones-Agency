const Service = require('../models/Service');

const DEFAULT_SERVICES = [
  {
    title: 'AI Systems Architecture & Multi-LLM Orchestration',
    description: 'Conception et déploiement d\'infrastructures d\'IA souveraines (OmniRoute, RAG vectoriel, Voice AI dialectal). Optimisation token RTK/Caveman et failover résilient sans interruption de service.',
    icon: 'Cpu',
    features: ['Multi-LLM Gateway (Gemini, Claude, GPT)', 'Voice AI Dialectal 24/7', 'Compression Token RTK -60%', 'Sécurité Défensive PentAG'],
    startingPrice: 'Sur mesure',
    order: 1
  },
  {
    title: 'Digital Engineering & High-End Platforms',
    description: 'Développement d\'applications d\'exception Next.js 15/16, React 19 et Vite taillées pour la conversion maximale. Performance Lighthouse 95+, design system Quiet Luxury et micro-interactions immersives.',
    icon: 'Layers',
    features: ['React 19 & Tailwind CSS v4', 'Design System Quiet Luxury Custom', 'Animations Framer Motion & GSAP', 'Temps de chargement < 800ms'],
    startingPrice: 'Sur mesure',
    order: 2
  },
  {
    title: 'Quantitative Finance & Low-Latency Bridges',
    description: 'Passerelles d\'exécution algorithmique pour MetaTrader 5 et courtiers institutionnels. Coupe-circuit Risk Shield matériel, flux de ticks Canvas 60 FPS et disjoncteurs de capital.',
    icon: 'TrendingUp',
    features: ['Passerelle IPC MT5 <1ms', 'Disjoncteur Risk Shield Automatisé', 'Graphiques Haute Fréquence Canvas', 'Alertes Chiffrées Telegram'],
    startingPrice: 'Sur mesure',
    order: 3
  },
  {
    title: 'Spatial Sensing & IoT Infrastructure',
    description: 'Intégration de vision RF passive par CSI WiFi (RuView), automatisation Home Assistant / Matter et monitoring de sécurité en temps réel sans caméras invasives.',
    icon: 'Radio',
    features: ['Détection RF CSI ESP32', 'Présence sans Caméra', 'Interopérabilité Home Assistant / Matter', 'Architecture Edge Locale'],
    startingPrice: 'Sur mesure',
    order: 4
  }
];

const getServices = async (req, res) => {
  try {
    let services = [];
    if (Service.db?.readyState === 1) {
      services = await Service.find().sort({ order: 1 });
    }
    if (!services || services.length === 0) {
      services = DEFAULT_SERVICES;
    }
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(200).json({ success: true, count: DEFAULT_SERVICES.length, data: DEFAULT_SERVICES });
  }
};

const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Service supprimé.' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService
};
