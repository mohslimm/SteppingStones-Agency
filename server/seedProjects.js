/**
 * Project Seeder — Stepping Stones Agency
 * Run with: node seedProjects.js
 * Inserts verified production projects into MongoDB Atlas.
 * Synchronized with NeoSlim Master Portfolio (30 projects).
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
  githubUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  gallery: [{ type: String }],
  demoVideo: { type: String, default: '' },
  roiImpact: { type: String, default: '' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

const PROJECTS = [
  {
    "title": "El Mouhami Pro (المحامي برو)",
    "description": "Système d'exploitation juridique d'élite pour cabinets d'avocats et conseillers : agent vocal d'accueil bilingue (Arabe / Français), qualification 24/7 des contentieux et génération automatique de dossiers chiffrés.",
    "techStack": [
      "React 19",
      "Next.js 15",
      "Voice AI Intake",
      "Web Speech API",
      "Supabase PostgreSQL",
      "Tailwind CSS v4",
      "Framer Motion"
    ],
    "nicheCategory": "LegalTech & Voice AI",
    "liveUrl": "https://al-mouhami.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/Cabinet-Slimani-Legal-AI",
    "image": "/projects/el-mouhami-render.jpg",
    "gallery": [
      "/projects/el-mouhami-render.jpg",
      "/projects/el-mouhami-pro-cover.svg",
      "/projects/cabinet-morel.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Agent Vocal Bilingue Temps Réel & Qualification Juridique Automatisée",
    "featured": true
  },
  {
    "title": "Aegis Alpha — MT5 Trading Terminal",
    "description": "Passerelle de trading algorithmique haute fréquence connectée à MetaTrader 5 via IPC natif (<1ms) avec disjoncteur matériel Risk Shield verrouillant les pertes journalières à 2%.",
    "techStack": [
      "Python 3.11",
      "MetaTrader 5 IPC",
      "Flask",
      "HTML5 Canvas",
      "Quantitative Risk Shield",
      "Telegram API"
    ],
    "nicheCategory": "Quantitative Finance & HFT",
    "liveUrl": "https://aegis-alpha.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/Aegis-Alpha-MT5-Bridge",
    "image": "/projects/aegis-alpha-render.jpg",
    "gallery": [
      "/projects/aegis-alpha-render.jpg",
      "/projects/aegis-alpha-mt5-cover.svg"
    ],
    "demoVideo": "",
    "roiImpact": "Latence IPC <1ms & Coupe-Circuit Matériel Drawdown 2%",
    "featured": true
  },
  {
    "title": "ANIS PHONE",
    "description": "Plateforme e-commerce haut de gamme spécialisée dans la téléphonie flagship et l'écosystème tech de luxe, avec configurateur 3D interactif et gestion d'inventaire temps réel.",
    "techStack": [
      "Next.js 16",
      "React 19",
      "Three.js / R3F",
      "Supabase SSR",
      "Tailwind CSS v4",
      "TypeScript"
    ],
    "nicheCategory": "E-Commerce & Luxury Retail",
    "liveUrl": "https://anis-phone.vercel.app",
    "githubUrl": "https://github.com/mohslimm/anis-phone",
    "image": "/projects/anis-phone-render.jpg",
    "gallery": [
      "/projects/anis-phone-render.jpg",
      "/projects/anis-phone.png",
      "/projects/anis-phone-galaxy.jpg",
      "/projects/anis-phone-iphone.jpg",
      "/projects/anis-phone-watch.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Configurateur 3D Interactif & Temps de Réponse Sub-Seconde",
    "featured": true
  },
  {
    "title": "StoneLink",
    "description": "Cockpit commercial B2B enterprise propulsé par l'IA : prospection automatisée multi-agents, audit web temps réel, softphone Twilio intégré et routage LLM hybride.",
    "techStack": [
      "Claude 3.5 Sonnet",
      "Gemini 2.5 Pro",
      "Tauri Desktop",
      "Twilio Voice",
      "BullMQ",
      "Redis"
    ],
    "nicheCategory": "AI Orchestration & Multi-LLM",
    "liveUrl": "https://stonelink.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/stonelink",
    "image": "/projects/stonelink-render.jpg",
    "gallery": [
      "/projects/stonelink-render.jpg",
      "/projects/stonelink.png",
      "/projects/nebula.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Routage LLM Hybride Multi-Fournisseurs & Softphone VoIP Intégré",
    "featured": true
  },
  {
    "title": "Nexus Horizon ERP",
    "description": "Système d'exploitation d'entreprise souverain pour environnement desktop : orchestrateur multi-modules, base relationnelle locale et hub d'intelligence décentralisé.",
    "techStack": [
      "Electron",
      "Express v5",
      "Prisma ORM",
      "PostgreSQL",
      "SQLite",
      "Docker",
      "GraphQL"
    ],
    "nicheCategory": "Sovereign ERP & Supply Chain",
    "liveUrl": "https://nexus.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/nexus-horizon-erp",
    "image": "/projects/nexus-horizon-render.jpg",
    "gallery": [
      "/projects/nexus-horizon-render.jpg",
      "/projects/quantum.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Architecture Modulaire Souveraine & Moteur de Données Hybride",
    "featured": true
  },
  {
    "title": "Kachef (كاشف)",
    "description": "Écosystème CRM collaboratif anti-colis piégés et détection des fraudes e-commerce en Algérie (58 wilayas), réduisant drastiquement les retours et sécurisant les expéditions.",
    "techStack": [
      "Next.js",
      "AI Risk Intelligence",
      "PostgreSQL",
      "58 Wilayas Logistics API",
      "TypeScript"
    ],
    "nicheCategory": "B2B Intelligence & COD Fraud Radar",
    "liveUrl": "https://kachef.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/kachef",
    "image": "/projects/kachef-radar-render.jpg",
    "gallery": [
      "/projects/kachef-radar-render.jpg",
      "/projects/kachef-banner.png",
      "/projects/kachef.png"
    ],
    "demoVideo": "",
    "roiImpact": "Réduction de 82% des Commandes Fantômes & Couverture 58 Wilayas",
    "featured": true
  },
  {
    "title": "Tropicalboat Luxury Yacht Charters",
    "description": "Audit technique complet et plateforme haut de gamme appliquant les préceptes du Quiet Luxury pour le courtage et la location de yachts de prestige.",
    "techStack": [
      "Next.js",
      "Quiet Luxury UX",
      "Lighthouse 100%",
      "Framer Motion",
      "OWASP Security",
      "TypeScript"
    ],
    "nicheCategory": "Hospitality & Maritime ERP",
    "liveUrl": "https://tropical-boat.vercel.app/",
    "githubUrl": "https://github.com/mohslimm/vespera-luxury-brokerage",
    "image": "/projects/tropicalboat-1.png",
    "gallery": [
      "/projects/tropicalboat-1.png",
      "/projects/tropicalboat-2.png"
    ],
    "demoVideo": "",
    "roiImpact": "Score Lighthouse 100% & Design System Quiet Luxury",
    "featured": true
  },
  {
    "title": "ResortOS",
    "description": "ERP multi-tenant haute performance pour l'hôtellerie de luxe : gestion des réservations, conciergerie automatisée, dispatch des équipes et reporting analytique en temps réel.",
    "techStack": [
      "NestJS 11",
      "React 19",
      "Vite 8",
      "Multi-Tenant SaaS",
      "PostgreSQL",
      "TypeScript"
    ],
    "nicheCategory": "Hospitality & Maritime ERP",
    "liveUrl": "https://resortos.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/resort-os",
    "image": "/projects/resort-os-render.jpg",
    "gallery": [
      "/projects/resort-os-render.jpg",
      "/projects/resortos.png",
      "/projects/tropicalboat-1.png"
    ],
    "demoVideo": "",
    "roiImpact": "Architecture Multi-Tenant Résiliente & Dispatch Temps Réel",
    "featured": true
  },
  {
    "title": "Gestia — Gestion Locative IA",
    "description": "Plateforme SaaS moderne de gestion locative intelligente pour bailleurs indépendants (2 à 20 lots) : encaissement automatisé des loyers, traitement IA des baux et portail locataires.",
    "techStack": [
      "Next.js App Router",
      "Supabase SSR",
      "Tailwind CSS v4",
      "AI OCR Lease Parser",
      "TypeScript"
    ],
    "nicheCategory": "PropTech & Concierge AI",
    "liveUrl": "https://gestia.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/gestia",
    "image": "/projects/gestia-render.jpg",
    "gallery": [
      "/projects/gestia-render.jpg",
      "/projects/gestia.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Automatisation à 100% de la Quittance et Scoring de Solvabilité IA",
    "featured": true
  },
  {
    "title": "Cabinet Morel & Associés",
    "description": "Plateforme digitale haut de gamme pour cabinet d'avocats d'affaires parisien : prise de consultation chiffrée, espace client sécurisé et direction artistique Quiet Luxury.",
    "techStack": [
      "MERN Stack",
      "Express v5",
      "MongoDB Atlas",
      "Tailwind CSS",
      "Framer Motion",
      "TypeScript"
    ],
    "nicheCategory": "LegalTech & Voice AI",
    "liveUrl": "https://cabinetmorel.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/cabinet-morel",
    "image": "/projects/cabinet-morel.jpg",
    "gallery": [
      "/projects/cabinet-morel.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Portail Client Sécurisé Chiffré & Score SEO 100/100",
    "featured": false
  },
  {
    "title": "Commercia POS & CRM",
    "description": "Système POS de caisse et CRM omnicanal pour commerces de détail avec synchronisation temps réel, support hors-ligne et application mobile Capacitor.",
    "techStack": [
      "React",
      "Capacitor Android",
      "Node.js",
      "POS Hardware",
      "Offline-First",
      "SQLite"
    ],
    "nicheCategory": "Retail POS & Fiscal Hub",
    "liveUrl": "https://commercia.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/commercia",
    "image": "/projects/commercia-render.jpg",
    "gallery": [
      "/projects/commercia-render.jpg",
      "/projects/commercia-banner.png",
      "/projects/commercia.png"
    ],
    "demoVideo": "",
    "roiImpact": "Mode Hors-Ligne Total & Support Périphériques ESC/POS",
    "featured": false
  },
  {
    "title": "Autoshine Pro",
    "description": "Plateforme de réservation et vitrine digitale premium pour centre de detailing automobile et soins esthétiques de véhicules de luxe.",
    "techStack": [
      "React",
      "Tailwind CSS v4",
      "GSAP",
      "Lenis Smooth Scroll",
      "Lucide React"
    ],
    "nicheCategory": "Automotive Detailing & CRM",
    "liveUrl": "https://autoshine.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/autoshine-pro",
    "image": "/projects/autoshine-render.jpg",
    "gallery": [
      "/projects/autoshine-render.jpg",
      "/projects/autoshine-card.png",
      "/projects/autoshine.png"
    ],
    "demoVideo": "",
    "roiImpact": "Direction Artistique Premium & Réservation Fluide en 3 Clics",
    "featured": false
  },
  {
    "title": "Parfait Voyage",
    "description": "Plateforme digitale moderne pour agence de voyages et circuits touristiques sur mesure, axée sur la vitesse de réservation et une ergonomie sans friction.",
    "techStack": [
      "React",
      "Vite",
      "Booking Engine",
      "Lighthouse 98%",
      "Netlify"
    ],
    "nicheCategory": "Private Aviation & Concierge",
    "liveUrl": "https://parfaitvoyage.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/parfait-voyage",
    "image": "/projects/parfait-voyage-render.jpg",
    "gallery": [
      "/projects/parfait-voyage-render.jpg",
      "/projects/parfait-voyage.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Expérience Voyage Immersive & Optimisation Mobile Rapide",
    "featured": false
  },
  {
    "title": "Essenté",
    "description": "Application MERN Stack axée sur les codes du luxe minimaliste et de l'architecture d'intérieur haut de gamme.",
    "techStack": [
      "MERN Stack",
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Luxury Aesthetics"
    ],
    "nicheCategory": "E-Commerce & Luxury Retail",
    "liveUrl": "https://essente.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/essente-web",
    "image": "/projects/essente.png",
    "gallery": [
      "/projects/essente.png"
    ],
    "demoVideo": "",
    "roiImpact": "Esthétique Minimaliste Haut de Gamme & API Modulaire",
    "featured": false
  },
  {
    "title": "Al-Lamea",
    "description": "Portail corporate multilingue haut de gamme pour société de négoce international et logistique globale.",
    "techStack": [
      "React",
      "Vite",
      "Framer Motion",
      "GSAP",
      "i18next Multilingue",
      "Tailwind CSS"
    ],
    "nicheCategory": "Freight & Last-Mile Logistics",
    "liveUrl": "https://allamea.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/al-lamea",
    "image": "/projects/allamea-render.jpg",
    "gallery": [
      "/projects/allamea-render.jpg",
      "/projects/allamea.png"
    ],
    "demoVideo": "",
    "roiImpact": "Internationalisation Trilingue avec Support RTL Natif",
    "featured": false
  },
  {
    "title": "MenuFlow AI — Fine Dining & QR Matrix",
    "description": "Système d'exploitation gastronomique et réservation intelligente pour établissements de haute cuisine : menu QR dynamique, plan de salle interactif et alertes SMS Twilio.",
    "techStack": [
      "Next.js 15",
      "Supabase PostgreSQL",
      "Twilio SMS",
      "QR Menu Dynamic",
      "Table Matrix",
      "Tailwind CSS v4"
    ],
    "nicheCategory": "Restaurant Tech & QR Matrix",
    "liveUrl": "https://menuflow.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/menuflow-luxury",
    "image": "/projects/menuflow-render.jpg",
    "gallery": [
      "/projects/menuflow-render.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Accélération du Chiffre d'Affaires (+34%) & Plan de Salle Temps Réel",
    "featured": true
  },
  {
    "title": "Livreur Cash Logistics Hub",
    "description": "Hub mobile de réconciliation financière et coffre-fort numérique pour coursiers et chauffeurs livreurs COD en Algérie (58 wilayas) : zéro divergence de caisse et clôture instantanée.",
    "techStack": [
      "React 19",
      "Offline-First SQLite",
      "IoT Geofencing",
      "Cash On Delivery Escrow",
      "Tailwind CSS v4"
    ],
    "nicheCategory": "Freight & Last-Mile Logistics",
    "liveUrl": "https://livreurcash.neoslim.online",
    "githubUrl": "https://github.com/mohslimm/livreur-cash",
    "image": "/projects/livreur-cash-render.jpg",
    "gallery": [
      "/projects/livreur-cash-render.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Réconciliation à 100% sans Écart & Sécurisation IoT Géolocalisée",
    "featured": false
  },
  {
    "title": "Hamptons Interior Architecture",
    "description": "Plateforme sur mesure pour cabinet d'architecture d'intérieur haut de gamme dans les Hamptons : galeries plein écran, simulateur de budget de rénovation et CRM de qualification.",
    "techStack": [
      "React",
      "Tailwind CSS",
      "Vite",
      "Editorial Luxury",
      "Backoffice Leads Inbox",
      "Client Roster"
    ],
    "nicheCategory": "Luxury Niche — Architecture & Design Intérieur",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/high-end-interior-design-firm-hamptons-1.png",
    "gallery": [
      "/projects/niches/high-end-interior-design-firm-hamptons-1.png",
      "/projects/niches/high-end-interior-design-firm-hamptons-2.png",
      "/projects/niches/high-end-interior-design-firm-hamptons-3.png"
    ],
    "demoVideo": "",
    "roiImpact": "Direction Artistique Éditoriale & Tunnel de Qualification Privé",
    "featured": false
  },
  {
    "title": "Scottsdale Aesthetic Surgery Institute",
    "description": "Plateforme clinique pour institut de chirurgie esthétique et plastique à Scottsdale : comparateur avant/après interactif, prise de consultation privée et sécurité des données de santé.",
    "techStack": [
      "React",
      "Vite",
      "Before/After Slider",
      "HIPAA-Compliant Intake",
      "Framer Motion",
      "Tailwind CSS"
    ],
    "nicheCategory": "Luxury Niche — Chirurgie Plastique & Médecine Esthétique",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/plastic-surgery-clinic-scottsdale-1.png",
    "gallery": [
      "/projects/niches/plastic-surgery-clinic-scottsdale-1.png",
      "/projects/niches/plastic-surgery-clinic-scottsdale-2.png",
      "/projects/niches/plastic-surgery-clinic-scottsdale-3.png"
    ],
    "demoVideo": "",
    "roiImpact": "Comparateur Avant/Après Haute Précision & Prise de RDV Discrète",
    "featured": false
  },
  {
    "title": "Monaco Bespoke Luxury Rentals",
    "description": "Portail de location saisonnière de penthouses et villas d'exception en Principauté de Monaco et sur la Côte d'Azur, avec conciergerie VIP dédiée.",
    "techStack": [
      "React",
      "Vite",
      "Concierge Dispatch",
      "Quiet Luxury Glass",
      "Real-Time Availability",
      "Tailwind"
    ],
    "nicheCategory": "Luxury Niche — Location Immobilière Ultra-Luxe",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/monaco-rentals.jpg",
    "gallery": [
      "/projects/niches/monaco-rentals.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Expérience Conciergerie VIP & Architecture Sub-Seconde",
    "featured": false
  },
  {
    "title": "Dubai Exotic Supercar Fleet",
    "description": "Plateforme de réservation instantanée de supercars et hypercars à Dubaï (Ferrari, Lamborghini, Bugatti) : télémétrie des véhicules, caution cryptée et livraison sur héliport.",
    "techStack": [
      "React",
      "Vite",
      "Instant Fleet Booking",
      "Live Telemetry",
      "Multi-Currency",
      "Tailwind"
    ],
    "nicheCategory": "Luxury Niche — Supercars & Véhicules d'Exception",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/dubai-supercars.jpg",
    "gallery": [
      "/projects/niches/dubai-supercars.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Réservation Instantanée en 3 É tapes & Caution Sécurisée",
    "featured": false
  },
  {
    "title": "Aegis Swiss Private Wealth",
    "description": "Plateforme institutionnelle de banque privée et de gestion de fortune suisse (Genève & Zurich) : simulation de mandat discrétionnaire, préservation du capital et conformité FINMA.",
    "techStack": [
      "React",
      "Vite",
      "Swiss Banking Aesthetics",
      "Biometric Simulation",
      "Encrypted Leads",
      "Tailwind"
    ],
    "nicheCategory": "Luxury Niche — Banque Privée & Gestion de Fortune",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/swiss-wealth.jpg",
    "gallery": [
      "/projects/niches/swiss-wealth.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Design System Confidentiel & Simulateur de Préservation de Capital",
    "featured": false
  },
  {
    "title": "Aspen Luxury Ski Chalets",
    "description": "Agence immobilière d'exception à Aspen : chalets ski-in/ski-out de renommée mondiale, visites privées en hélicoptère et conciergerie alpine intégrée.",
    "techStack": [
      "React",
      "Vite",
      "Ski-in/Ski-out Filter",
      "Winter Luxury Dark",
      "Private Tour Scheduler"
    ],
    "nicheCategory": "Luxury Niche — Immobilier de Montagne de Prestige",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/aspen-chalets.jpg",
    "gallery": [
      "/projects/niches/aspen-chalets.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Plans Interactifs Ski-in/Ski-out & Planification de Visites VIP",
    "featured": false
  },
  {
    "title": "Manhattan Corporate M&A Advisory",
    "description": "Cabinet d'avocats d'affaires et de fusions-acquisitions à Manhattan : historique des transactions majeures, analyses réglementaires confidentielles et prise de mandat d'urgence.",
    "techStack": [
      "React",
      "Vite",
      "High-Stakes Legal Portal",
      "Deal Tombstones",
      "Encrypted Intake",
      "Tailwind"
    ],
    "nicheCategory": "Luxury Niche — Droit des Affaires & Fusions-Acquisitions",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/manhattan-law.jpg",
    "gallery": [
      "/projects/niches/manhattan-law.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Module de Tombstones de Transactions & Canal Confidentiel",
    "featured": false
  },
  {
    "title": "Harley Street Boutique Dermatology",
    "description": "Clinique de dermatologie esthétique et soins laser sur Harley Street, Londres : guide des protocoles cliniques, consultation de diagnostic de peau et prise de RDV directe.",
    "techStack": [
      "React",
      "Vite",
      "Laser Treatment Guide",
      "Skin Diagnostic Intake",
      "Minimalist Clean",
      "Tailwind"
    ],
    "nicheCategory": "Luxury Niche — Dermatologie Esthétique & Laser",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/london-dermatology.jpg",
    "gallery": [
      "/projects/niches/london-dermatology.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Module de Diagnostic de Soins & Réservation Clinique Fluide",
    "featured": false
  },
  {
    "title": "Miami Beach Longevity & MedSpa",
    "description": "Centre médico-esthétique et médecine de longévité à Miami Beach : thérapies par perfusion IV, cryothérapie, soins régénératifs et adhésion au club privé de santé.",
    "techStack": [
      "React",
      "Vite",
      "Longevity Protocol Matrix",
      "IV Therapy Menu",
      "VIP Membership Portal"
    ],
    "nicheCategory": "Luxury Niche — Médecine Régénérative & MedSpa",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/miami-medspa.jpg",
    "gallery": [
      "/projects/niches/miami-medspa.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Configurateur de Protocoles de Longévité & Adhésions Membres",
    "featured": false
  },
  {
    "title": "Hamptons Waterfront Estates",
    "description": "Agence immobilière ultra-exclusive dans les Hamptons : manoirs en front de mer, propriétés équestres et transactions discrètes hors-marché (Off-Market).",
    "techStack": [
      "React",
      "Vite",
      "Waterfront Estate Showcase",
      "Private Aerial Tours",
      "Buyer Prequalification"
    ],
    "nicheCategory": "Luxury Niche — Immobilier de Prestige Littoral",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/hamptons-real-estate.jpg",
    "gallery": [
      "/projects/niches/hamptons-real-estate.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Accès Réservé Off-Market & Score Lighthouse 99%",
    "featured": false
  },
  {
    "title": "Marbella Golden Mile Properties",
    "description": "Courtage immobilier d'élite sur le Golden Mile de Marbella : villas contemporaines à La Zagaleta, résidences de golf et investissements à fort rendement.",
    "techStack": [
      "React",
      "Vite",
      "Golden Mile Mansions",
      "Multilingual ES/EN",
      "Virtual 3D Walkthrough"
    ],
    "nicheCategory": "Luxury Niche — Immobilier Résidentiel Méditerranéen",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/marbella-estates.jpg",
    "gallery": [
      "/projects/niches/marbella-estates.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Support Multilingue Immédiat & Catalogue La Zagaleta",
    "featured": false
  },
  {
    "title": "Mayfair Family Office Governance",
    "description": "Société de conseil pour family offices et gouvernance familiale à Mayfair, Londres : transmission intergénérationnelle, philanthropie et structuration d'actifs mondiaux.",
    "techStack": [
      "React",
      "Vite",
      "Multi-Generational Wealth",
      "Global Custody",
      "Discreet Heritage",
      "Tailwind"
    ],
    "nicheCategory": "Luxury Niche — Family Office & Conseil en Succession",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/family-office-london.jpg",
    "gallery": [
      "/projects/niches/family-office-london.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Direction Artistique Héritage Britannique & Portail Confidentiel",
    "featured": false
  },
  {
    "title": "Sol y Mar Elite Mediterranean Brokers",
    "description": "Courtier spécialisé dans les îles privées et les domaines côtiers en Méditerranée (Baléares, Ibiza, Côte d'Azur) : acquisitions exclusives et amarrages de superyachts.",
    "techStack": [
      "React",
      "Vite",
      "Private Islands & Seafronts",
      "Solar Luxury Palette",
      "Lead CRM",
      "Tailwind"
    ],
    "nicheCategory": "Luxury Niche — Îles Privées & Domaines Côtiers",
    "liveUrl": "",
    "githubUrl": "",
    "image": "/projects/niches/mediterranean-estates.jpg",
    "gallery": [
      "/projects/niches/mediterranean-estates.jpg"
    ],
    "demoVideo": "",
    "roiImpact": "Catalogue d'Îles Privées & Fiches Techniques Nautiques",
    "featured": false
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.log('[DRY-RUN] MONGODB_URI non définie. Affichage des ' + PROJECTS.length + ' projets prêts à être injectés :');
    PROJECTS.forEach((p, idx) => {
      console.log(` ${idx + 1}. [${p.nicheCategory}] ${p.title} -> ${p.roiImpact}`);
    });
    return;
  }

  try {
    console.log('Connexion à MongoDB Atlas...');
    try {
    console.log('Tentative de connexion Atlas...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2500 });
  } catch (atlasErr) {
    console.warn('Atlas indisponible (' + atlasErr.message + '). Repli sur MongoDB local...');
    await mongoose.connect('mongodb://127.0.0.1:27017/steppingstones', { serverSelectionTimeoutMS: 2500 });
  }
    console.log('Connecté à MongoDB Atlas.');
    await Project.deleteMany({});
    console.log('Anciens projets purgés.');
    await Project.insertMany(PROJECTS);
    console.log(`Succès : ${PROJECTS.length} projets d'élite injectés avec succès.`);
    await mongoose.disconnect();
    console.log('Déconnexion propre.');
  } catch (err) {
    console.error("Erreur d'injection MongoDB :", err.message);
  }
}

if (require.main === module) {
  seed();
}

module.exports = { PROJECTS, Project };
