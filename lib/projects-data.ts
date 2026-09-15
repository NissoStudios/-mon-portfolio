import type { LucideIcon } from "lucide-react";
import { Bus, Database, Globe2, LockKeyhole, PenSquare, Radio, UtensilsCrossed } from "lucide-react";

export interface ProjectCaseStudy {
  id: string;
  num: string;
  tag: string;
  title: string;
  icon: LucideIcon;
  demoId: string;
  sourcePath: string;
  featured: boolean;
  client?: string;
  tech: string[];
  headline: { fr: string; en: string };
  context: { fr: string; en: string };
  role: { fr: string; en: string };
  learned: { fr: string[]; en: string[] };
}

const REPO_BASE = "https://github.com/NissoStudios/-mon-portfolio/blob/main/";

export const projects: ProjectCaseStudy[] = [
  {
    id: "ecommercial",
    num: "01",
    tag: "BUSINESS PROCESS",
    title: "E-COMMERCIAL",
    icon: Database,
    demoId: "ecommercial",
    sourcePath: REPO_BASE + "app/page.tsx",
    featured: true,
    client: "SOSUCAM",
    tech: ["PHP", "SQL Server", "HTML/CSS"],
    headline: {
      fr: "D'un cahier papier à un workflow commercial numérique.",
      en: "From a paper notebook to a digital commercial workflow.",
    },
    context: {
      fr: "Le suivi des commandes se faisait sur papier : calcul du tonnage à la main, aucune trace fiable avant validation, et un risque d'erreur à chaque étape entre la saisie et la génération des documents.",
      en: "Order tracking ran on paper — tonnage calculated by hand, no reliable trail before validation, and room for error at every step between data entry and document generation.",
    },
    role: {
      fr: "Créé pour SOSUCAM — automatisation d'un processus commercial interne.",
      en: "Built for SOSUCAM — automating an internal commercial process.",
    },
    learned: {
      fr: [
        "Modéliser un flux métier réel avant d'écrire la moindre interface.",
        "Écrire des requêtes SQL Server préparées pour éviter les injections.",
        "Remplacer une saisie manuelle par un calcul automatique fiable (quantité × poids de colis).",
        "Structurer un workflow de validation avec des états explicites (en attente / validé).",
      ],
      en: [
        "Modeling a real business workflow before writing a single screen.",
        "Writing prepared SQL Server queries to prevent injection.",
        "Replacing manual entry with a reliable automatic calculation (quantity × package weight).",
        "Structuring a validation workflow around explicit states (pending / validated).",
      ],
    },
  },
  {
    id: "gestmedicert",
    num: "02",
    tag: "HEALTHCARE",
    title: "GESTMEDICERT",
    icon: LockKeyhole,
    demoId: "gestmedicert",
    sourcePath: REPO_BASE + "components/demos/GestMedicertDemo.tsx",
    featured: true,
    client: "SOSUCAM",
    tech: ["Next.js", "TypeScript", "Chart.js"],
    headline: {
      fr: "Des dossiers médicaux papier à un workflow numérique sécurisé.",
      en: "Paper medical records to a secure digital workflow.",
    },
    context: {
      fr: "Les certificats médicaux, prolongations, actes de naissance et de décès du personnel étaient gérés sur papier entre deux sites (Mbandjock et Nkoteng), sans traçabilité ni contrôle d'accès clair entre les rôles.",
      en: "Medical certificates, leave extensions, births and deaths for staff were tracked on paper across two sites (Mbandjock and Nkoteng), with no traceability and no clear access control between roles.",
    },
    role: {
      fr: "Créé pour SOSUCAM pendant mon stage — gestion documentaire RH et médicale.",
      en: "Built for SOSUCAM during my internship — HR and medical document management.",
    },
    learned: {
      fr: [
        "Concevoir un contrôle d'accès basé sur les rôles et sur le site (Mbandjock / Nkoteng).",
        "Garantir l'intégrité de chaque document avec une empreinte de type SHA-256.",
        "Structurer des données RH sensibles (matricule, direction, poste) sans exposer plus que nécessaire.",
        "Visualiser des indicateurs RH (jours d'absence, documents validés) avec Chart.js.",
        "Gérer un vrai cycle de vie de document : création, validation, rejet avec motif.",
      ],
      en: [
        "Designing access control based on both role and site (Mbandjock / Nkoteng).",
        "Guaranteeing document integrity with a SHA-256-style fingerprint.",
        "Structuring sensitive HR data (employee ID, department, role) without over-exposing it.",
        "Visualizing HR metrics (absence days, validated documents) with Chart.js.",
        "Handling a real document lifecycle: creation, validation, rejection with a reason.",
      ],
    },
  },
  {
    id: "tripbook",
    num: "03",
    tag: "MOBILE · TRAVEL",
    title: "TRIPBOOK",
    icon: Globe2,
    demoId: "tripbook",
    sourcePath: REPO_BASE + "components/demos/TripBookDemo.tsx",
    featured: false,
    tech: ["Kotlin", "Android"],
    headline: {
      fr: "Voyager en Afrique en confiance, grâce à la communauté.",
      en: "A community-driven way to travel Africa with confidence.",
    },
    context: {
      fr: "Voyager de façon indépendante en Afrique manque souvent de retours fiables entre voyageurs et d'agences vérifiées — les décisions se prennent sans information de terrain.",
      en: "Independent travel across Africa often lacks trustworthy peer feedback and verified agencies — decisions get made without real ground information.",
    },
    role: {
      fr: "Projet personnel — application mobile Android.",
      en: "Personal project — Android mobile app.",
    },
    learned: {
      fr: [
        "Construire une expérience mobile Kotlin/Android complète : fil d'actualité, stories, communauté.",
        "Concevoir une interface qui reste lisible avec une connectivité faible.",
        "Gérer un état local riche (favoris, abonnements, avis) directement sur l'appareil.",
        "Penser la navigation mobile (barre inférieure, onglets) pour un usage à une main.",
      ],
      en: [
        "Building a complete Kotlin/Android mobile experience: feed, stories, community.",
        "Designing an interface that stays usable with weak connectivity.",
        "Managing rich local state (favorites, follows, reviews) directly on-device.",
        "Designing mobile navigation (bottom bar, tabs) for one-handed use.",
      ],
    },
  },
  {
    id: "transmap",
    num: "04",
    tag: "TRANSPORT",
    title: "TRANSMAP",
    icon: Bus,
    demoId: "transmap",
    sourcePath: REPO_BASE + "components/demos/TransMapDemo.tsx",
    featured: false,
    tech: ["Python", "PySide6", "SQLAlchemy"],
    headline: {
      fr: "Modéliser un réseau de transport avant d'écrire un seul écran.",
      en: "Modeling a transport network before writing a single screen.",
    },
    context: {
      fr: "Avant de construire une interface, il fallait d'abord comprendre et modéliser correctement un réseau de transport : arrêts, lignes, véhicules et statut en temps réel.",
      en: "Before any screen could be built, the transport network itself — stops, routes, vehicles, live status — had to be understood and modeled correctly.",
    },
    role: {
      fr: "Projet personnel — modélisation et suivi d'un réseau de transport.",
      en: "Personal project — transport network modeling and monitoring.",
    },
    learned: {
      fr: [
        "Modéliser des entités reliées (arrêts, lignes, véhicules) avec SQLAlchemy.",
        "Construire une application desktop complète avec Python et PySide6.",
        "Représenter visuellement un réseau et son état plutôt qu'une simple liste.",
        "Séparer proprement la logique métier de l'interface graphique.",
      ],
      en: [
        "Modeling connected entities (stops, routes, vehicles) with SQLAlchemy.",
        "Building a full desktop application with Python and PySide6.",
        "Visually representing a network and its live status instead of a plain list.",
        "Cleanly separating business logic from the graphical interface.",
      ],
    },
  },
  {
    id: "java-restaurant",
    num: "05",
    tag: "HOSPITALITY",
    title: "JAVA RESTAURANT",
    icon: UtensilsCrossed,
    demoId: "java-restaurant",
    sourcePath: REPO_BASE + "components/demos/JavaRestaurantDemo.jsx",
    featured: false,
    tech: ["React", "Recharts"],
    headline: {
      fr: "Un seul tableau de bord pour les commandes, les tables et la demande.",
      en: "One dashboard for orders, tables and demand.",
    },
    context: {
      fr: "Un restaurant qui gère commandes, réservations et liste d'attente sans vue d'ensemble perd du temps en cuisine comme en salle, et finit par perdre des clients.",
      en: "A restaurant juggling orders, reservations and a waitlist without one shared view loses time in the kitchen and the dining room — and eventually loses customers.",
    },
    role: {
      fr: "Projet personnel — tableau de bord de gestion pour un restaurant.",
      en: "Personal project — management dashboard for a restaurant.",
    },
    learned: {
      fr: [
        "Construire un tableau de bord orienté décision plutôt que de simples listes.",
        "Visualiser des tendances hebdomadaires (commandes, revenu) avec Recharts.",
        "Penser un flux de commande de bout en bout : panier, réservation, liste d'attente.",
        "Organiser une interface dense sans la rendre confuse.",
      ],
      en: [
        "Building a decision-oriented dashboard instead of plain lists.",
        "Visualizing weekly trends (orders, revenue) with Recharts.",
        "Designing an end-to-end order flow: cart, reservations, waitlist.",
        "Keeping a dense interface organized instead of overwhelming.",
      ],
    },
  },
  {
    id: "mobile-six",
    num: "06",
    tag: "TELECOM · STARTUP",
    title: "MOBILE SIX",
    icon: Radio,
    demoId: "mobile-six",
    sourcePath: REPO_BASE + "components/demos/MobileSixDemo.jsx",
    featured: false,
    client: "Mobile Six",
    tech: ["React", "Recharts"],
    headline: {
      fr: "Coordonner des équipes terrain pour une startup télécom, en direct.",
      en: "Coordinating field teams for a telecom startup, live.",
    },
    context: {
      fr: "Une startup télécom naissante devait coordonner ses techniciens terrain sans outil dédié : pas de suivi des tâches, pas de journal d'activité, pas de vue d'ensemble pour les responsables.",
      en: "An early-stage telecom startup needed to coordinate field technicians without a dedicated tool — no task tracking, no activity log, no overview for managers.",
    },
    role: {
      fr: "Créé pour Mobile Six, une startup télécom.",
      en: "Built for Mobile Six, an early-stage telecom startup.",
    },
    learned: {
      fr: [
        "Construire deux expériences distinctes (administrateur / technicien) à partir des mêmes données.",
        "Suivre des interventions terrain avec des statuts et priorités clairs.",
        "Journaliser les actions pour garder une trace de qui a fait quoi.",
        "Concevoir des notifications qui restent utiles sans devenir du bruit.",
      ],
      en: [
        "Building two distinct experiences (admin / technician) from the same underlying data.",
        "Tracking field interventions with clear statuses and priorities.",
        "Logging actions to keep a record of who did what.",
        "Designing notifications that stay useful instead of becoming noise.",
      ],
    },
  },
  {
    id: "blog-o-platform",
    num: "07",
    tag: "PUBLISHING",
    title: "BLOG-O-PLATFORM",
    icon: PenSquare,
    demoId: "blog-o-platform",
    sourcePath: REPO_BASE + "components/demos/BlogOPlatformDemo.jsx",
    featured: false,
    tech: ["JavaScript", "Express", "Firebase"],
    headline: {
      fr: "Un outil d'écriture concentré, sans le poids d'un page-builder.",
      en: "A focused writing tool, without the page-builder bloat.",
    },
    context: {
      fr: "Un projet d'équipe basé uniquement sur Firebase manquait d'une vraie couche serveur : rien n'empêchait les abus, et la logique de sécurité restait côté client.",
      en: "A team project built on Firebase alone lacked a real server layer — nothing prevented abuse, and security logic stayed on the client side.",
    },
    role: {
      fr: "Projet d'équipe à l'école — le backend a ensuite été repensé en solo.",
      en: "Team project at school — the backend was later rebuilt solo.",
    },
    learned: {
      fr: [
        "Faire évoluer un projet Firebase statique vers un vrai backend Express.",
        "Ajouter une couche de sécurité (Helmet, limitation de débit) qu'un frontend seul ne peut pas fournir.",
        "Construire un éditeur de texte riche sans dépendance lourde.",
        "Séparer les identifiants sensibles du bundle envoyé au navigateur.",
      ],
      en: [
        "Evolving a static Firebase project into a real Express backend.",
        "Adding a security layer (Helmet, rate limiting) that a frontend alone can't provide.",
        "Building a rich text editor without a heavy dependency.",
        "Keeping sensitive credentials out of the bundle shipped to the browser.",
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
