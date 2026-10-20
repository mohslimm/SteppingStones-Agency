/**
 * Project Seeder — Stepping Stones Agency
 * Run with: node seedProjects.js
 * Inserts verified production projects into MongoDB Atlas.
 */
require('dotenv').config();
const dns = require('dns');
const mongoose = require('mongoose');

// Fallback DNS fix for Windows/VPN SRV resolution
if (typeof dns.setServers === 'function') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {}
}

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  nicheCategory: { type: String, required: true },
  liveUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  gallery: [{ type: String }],
  demoVideo: { type: String, default: '' },
  roiImpact: { type: String, default: '' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const PROJECTS = [
  // ─── MOHAMED SLIMANI & STEPPING STONES FLAGSHIP PRODUCTIONS ─────────────────
  {
    title: 'El Mouhami Pro (المحامي برو) — Legal AI Operating System',
    description: 'Système d\'exploitation juridique d\'élite pour cabinets d\'avocats et conseillers. Comprend un agent vocal bilingue (Arabe dialectal / Français) pour la qualification 24/7 des contentieux, l\'analyse de recevabilité juridique et la transmission automatique de dossiers complets chiffrés par WhatsApp.',
    techStack: ['React 19', 'Next.js 15', 'TypeScript', 'Web Speech API', 'Tailwind CSS v4', 'PostgreSQL', 'Framer Motion'],
    nicheCategory: 'LegalTech & Voice AI',
    liveUrl: 'https://al-mouhami.neoslim.online',
    image: '/assets/images/el-mouhami-pro-cover.svg',
    gallery: ['/assets/images/el-mouhami-pro-cover.svg'],
    demoVideo: '',
    roiImpact: 'Temps de secrétariat juridique réduit de 75%, intake client disponible 24/7.',
    featured: true
  },
  {
    title: 'Gestia — Private Concierge & Luxury PropTech ERP',
    description: 'ERP haut de gamme pour gestionnaires de biens et copropriétés de prestige. Intègre un concierge vocal d\'urgence pour sinistres locataires, la relance automatisée des loyers par WhatsApp et la réconciliation financière en temps réel.',
    techStack: ['Next.js 14', 'TypeScript', 'Supabase PostgreSQL', 'Prisma ORM', 'n8n Workflows', 'Tailwind CSS', 'Electron'],
    nicheCategory: 'PropTech & ERP',
    liveUrl: 'https://gestia.steppingstones.agency',
    image: '/assets/images/gestia-erp-cover.svg',
    gallery: ['/assets/images/gestia-erp-cover.svg'],
    demoVideo: '',
    roiImpact: 'Taux de recouvrement des loyers élevé à 98.4%, résolution des urgences P1 sous 2h.',
    featured: true
  },
  {
    title: 'Kachef OS (كاشف) — B2B Sales Intelligence & Risk Engine',
    description: 'Radar de prospection commercial et moteur de risque d\'e-commerce déployé sur les 58 wilayas d\'Algérie. Détecte les entreprises sans site web, qualifie les dirigeants par appels sortants Voice AI et bloque les commandes frauduleuses en Cash on Delivery (COD).',
    techStack: ['React 19', 'Node.js', 'Express v5', 'MongoDB Atlas', 'Electron', 'Tauri', 'Zustand', 'Canvas API'],
    nicheCategory: 'Business Intelligence & Risk',
    liveUrl: 'https://kachef.steppingstones.agency',
    image: '/assets/images/kachef-radar-cover.svg',
    gallery: ['/assets/images/kachef-radar-cover.svg'],
    demoVideo: '',
    roiImpact: '1 200 leads B2B extraits par semaine, annulations de livraisons COD réduites de 42%.',
    featured: true
  },
  {
    title: 'StoneLink Platform & OmniRoute Multi-LLM Gateway',
    description: 'Passerelle d\'orchestration d\'IA unifiée devant 359 modèles (Gemini, Claude, GPT-4o, Groq, PentAG Local). Tolérance aux pannes zéro downtime avec failover inférieur à 100ms et réduction des dépenses d\'inférence de 60% grâce au compresseur syntaxique RTK/Caveman.',
    techStack: ['Next.js 15', 'Google Gemini 2.0', 'Anthropic Claude', 'OpenAI', 'Groq', 'Ollama PentAG', 'Tauri', 'Zustand'],
    nicheCategory: 'AI Orchestration & Cloud',
    liveUrl: 'https://stonelink.neoslim.online',
    image: '/assets/images/stonelink-omniroute-cover.svg',
    gallery: ['/assets/images/stonelink-omniroute-cover.svg'],
    demoVideo: '',
    roiImpact: 'Facture d\'inférence réduite de 60%, disponibilité de service garantie à 99.99%.',
    featured: true
  },
  {
    title: 'Anis Phone Prestige & Atlas Delivery (58 Wilayas)',
    description: 'E-commerce tech de luxe avec matrice logistique temps réel sur les 58 wilayas algériennes et agent vocal de confirmation d\'adresses COD en direct pour éliminer les retours transporteurs.',
    techStack: ['Next.js 16', 'React 19', 'Supabase PostgreSQL', 'GSAP 3.15', 'Tailwind CSS v4', 'Web Speech API'],
    nicheCategory: 'E-Commerce & Logistics',
    liveUrl: 'https://anisphone.steppingstones.agency',
    image: '/assets/images/anis-phone-atlas-cover.svg',
    gallery: ['/assets/images/anis-phone-atlas-cover.svg'],
    demoVideo: '',
    roiImpact: 'Taux d\'échec de livraison divisé par deux, validation de commande sous 45 secondes.',
    featured: true
  },
  {
    title: 'Aegis Alpha — MetaTrader 5 High-Frequency Bridge',
    description: 'Passerelle de trading algorithmique basse latence (<1ms via IPC natif) connectée à MetaTrader 5 avec coupe-circuit matériel Risk Shield (drawdown max 2%) et dispatch de signaux chiffrés sur Telegram.',
    techStack: ['Python 3.11', 'MetaTrader 5 API', 'Flask', 'HTML5 Canvas', 'Tailwind CSS', 'WebSockets', 'Telegram API'],
    nicheCategory: 'Quantitative Finance & HFT',
    liveUrl: 'https://aegis-alpha.neoslim.online',
    image: '/assets/images/aegis-alpha-mt5-cover.svg',
    gallery: ['/assets/images/aegis-alpha-mt5-cover.svg'],
    demoVideo: '',
    roiImpact: 'Exécution d\'ordres sous la milliseconde, protection du capital verrouillée à -2.0% max.',
    featured: true
  },
  {
    title: 'ResortOS — Enterprise SaaS ERP for Luxury Resorts',
    description: 'ERP multi-tenants pour palaces 5 étoiles et complexes hôteliers méditerranéens. Ordonnancement des villas de prestige, gestion des mouillages de superyachts et conciergerie automatisée.',
    techStack: ['NestJS 11', 'Prisma ORM', 'PostgreSQL', 'React 19', 'Tailwind CSS v4', 'TypeScript'],
    nicheCategory: 'ERP & Hospitality',
    liveUrl: 'https://resortos.steppingstones.agency',
    image: '/assets/images/resort-os-cover.svg',
    gallery: ['/assets/images/resort-os-cover.svg'],
    demoVideo: '',
    roiImpact: 'Temps d\'enregistrement VIP divisé par 3, score de performance Lighthouse 99/100.',
    featured: true
  },
  {
    title: 'Vespera Luxury Brokerage — Superyacht Charters',
    description: 'Plateforme de courtage et réservation de yachts de luxe en Méditerranée. Catalogue interactif 3D, calculateur d\'itinéraires Monaco / Saint-Tropez et sécurité bancaire OWASP.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'OWASP Security'],
    nicheCategory: 'Luxury Web & Booking',
    liveUrl: 'https://tropical-boat.vercel.app/',
    image: 'https://res.cloudinary.com/ds8xynpj6/image/upload/v1790715877/portfolio_projects/y17muyg9w2p2fn4renel.jpg',
    gallery: ['https://res.cloudinary.com/ds8xynpj6/image/upload/v1790715877/portfolio_projects/y17muyg9w2p2fn4renel.jpg'],
    demoVideo: '',
    roiImpact: 'Augmentation des demandes de devis qualifiées de +120%.',
    featured: false
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('[DRY-RUN] MONGODB_URI non définie. Affichage des 8 projets prêts à être injectés :');
    PROJECTS.forEach((p, idx) => {
      console.log(` ${idx + 1}. [${p.nicheCategory}] ${p.title} -> ${p.roiImpact}`);
    });
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('Connecté à MongoDB Atlas.');
    await Project.deleteMany({});
    console.log('Anciens projets purgés.');
    await Project.insertMany(PROJECTS);
    console.log(`Succès : ${PROJECTS.length} projets d'élite injectés avec succès.`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Erreur d\'injection MongoDB :', err.message);
  }
}

if (require.main === module) {
  seed();
}

module.exports = { PROJECTS, Project };
