import type { Lang } from "./i18n";

interface LocalizedList {
  fr: string[];
  en: string[];
}

interface LocalizedText {
  fr: string;
  en: string;
}

export interface ProjectDetails {
  summary: LocalizedText;
  workflow: LocalizedList;
  features: LocalizedList;
  decisions: LocalizedList;
  outcome: LocalizedText;
}

export const projectDetails: Partial<Record<string, ProjectDetails>> = {
  ecommercial: {
    summary: {
      fr: "E-Commercial numérise le parcours complet d'une commande commerciale, depuis l'authentification de l'agent jusqu'à la génération des documents. L'application transforme un processus papier séquentiel en workflow contrôlé et traçable.",
      en: "E-Commercial digitizes the complete commercial order journey, from agent authentication to document generation. It turns a sequential paper process into a controlled and traceable workflow.",
    },
    workflow: {
      fr: [
        "L'agent se connecte et accède au tableau de bord commercial.",
        "Il sélectionne le produit, le poids du colis et saisit la quantité.",
        "Le système calcule automatiquement le poids total et le tonnage.",
        "La commande passe dans un état de validation explicite.",
        "Après validation, les documents commerciaux sont générés.",
      ],
      en: [
        "The agent signs in and opens the commercial dashboard.",
        "They select the product and package weight, then enter the quantity.",
        "The system automatically calculates total weight and tonnage.",
        "The order moves into an explicit validation state.",
        "Once validated, the commercial documents can be generated.",
      ],
    },
    features: {
      fr: [
        "Authentification des agents commerciaux",
        "Tableau de bord des commandes et produits",
        "Calcul automatique quantité × poids",
        "Validation contrôlée des commandes",
        "Génération des documents de livraison et de commande",
      ],
      en: [
        "Commercial agent authentication",
        "Orders and products dashboard",
        "Automatic quantity × weight calculation",
        "Controlled order validation",
        "Delivery and order document generation",
      ],
    },
    decisions: {
      fr: [
        "Des états explicites empêchent la génération de documents avant validation.",
        "Le calcul métier est centralisé pour éviter les divergences entre opérateurs.",
        "Les requêtes préparées protègent les opérations SQL Server contre les injections.",
      ],
      en: [
        "Explicit states prevent document generation before validation.",
        "Business calculations are centralized to avoid discrepancies between operators.",
        "Prepared queries protect SQL Server operations against injection.",
      ],
    },
    outcome: {
      fr: "Le prototype démontre comment réduire les erreurs de calcul, accélérer la préparation des commandes et créer une trace exploitable de chaque validation commerciale.",
      en: "The prototype demonstrates how to reduce calculation errors, speed up order preparation, and create a usable record of every commercial validation.",
    },
  },
  gestmedicert: {
    summary: {
      fr: "GestMedicert centralise la création, la validation et le suivi des documents médicaux et RH du personnel SOSUCAM sur les sites de Mbandjock et Nkoteng, avec des droits adaptés aux rôles.",
      en: "GestMedicert centralizes the creation, validation, and tracking of SOSUCAM staff medical and HR documents across the Mbandjock and Nkoteng sites, with role-appropriate permissions.",
    },
    workflow: {
      fr: [
        "L'utilisateur se connecte avec un rôle et un site de rattachement.",
        "Il recherche un employé autorisé et choisit le type de document.",
        "Le formulaire adapte ses champs au certificat, à la prolongation, à la naissance ou au décès.",
        "Le document reçoit une référence et une empreinte d'intégrité.",
        "Un validateur approuve ou rejette le document avec un motif.",
        "Les tableaux de bord agrègent les volumes et jours d'absence.",
      ],
      en: [
        "The user signs in with a role and assigned site.",
        "They find an authorized employee and choose a document type.",
        "The form adapts its fields for certificates, extensions, births, or deaths.",
        "The document receives a reference and integrity fingerprint.",
        "A validator approves or rejects it with a reason.",
        "Dashboards aggregate document volumes and absence days.",
      ],
    },
    features: {
      fr: [
        "Gestion multi-site Mbandjock / Nkoteng",
        "Contrôle d'accès basé sur les rôles",
        "Six types de documents médicaux et administratifs",
        "Validation, rejet motivé et correction",
        "Empreinte d'intégrité et signature",
        "Statistiques RH avec Chart.js",
      ],
      en: [
        "Mbandjock / Nkoteng multi-site management",
        "Role-based access control",
        "Six medical and administrative document types",
        "Validation, reasoned rejection, and correction",
        "Integrity fingerprint and signature",
        "HR statistics with Chart.js",
      ],
    },
    decisions: {
      fr: [
        "Le filtrage par site limite l'accès aux employés et documents pertinents.",
        "Les permissions sont évaluées au niveau de l'action, pas seulement de l'écran.",
        "L'empreinte d'intégrité rend toute modification du contenu détectable.",
        "Le cycle pending / validated / rejected conserve l'historique métier.",
      ],
      en: [
        "Site filtering limits access to relevant employees and documents.",
        "Permissions are evaluated at action level, not just screen level.",
        "The integrity fingerprint makes content changes detectable.",
        "The pending / validated / rejected lifecycle preserves business history.",
      ],
    },
    outcome: {
      fr: "GestMedicert propose une base cohérente pour remplacer les dossiers dispersés par un processus auditable, accélérer les validations et donner aux responsables une vision consolidée des absences.",
      en: "GestMedicert provides a coherent foundation for replacing scattered records with an auditable process, accelerating validations, and giving managers a consolidated view of absences.",
    },
  },
  tripbook: {
    summary: {
      fr: "TripBook réunit découverte, retours de voyageurs, agences, cartographie et communauté dans une expérience mobile pensée pour le voyage en Afrique.",
      en: "TripBook brings discovery, traveler feedback, agencies, maps, and community into a mobile experience designed for travel across Africa.",
    },
    workflow: {
      fr: [
        "Le voyageur découvre des récits et destinations dans son fil.",
        "Il consulte des agences et leurs avis communautaires.",
        "La carte l'aide à situer les lieux et opportunités.",
        "Il publie ses propres expériences et suit d'autres voyageurs.",
      ],
      en: [
        "The traveler discovers stories and destinations in the feed.",
        "They browse agencies and community reviews.",
        "The map helps locate places and opportunities.",
        "They publish their own experiences and follow other travelers.",
      ],
    },
    features: {
      fr: ["Fil communautaire", "Stories de voyageurs", "Fiches et avis d'agences", "Carte de découverte", "Profils et abonnements"],
      en: ["Community feed", "Traveler stories", "Agency profiles and reviews", "Discovery map", "Profiles and follows"],
    },
    decisions: {
      fr: [
        "Une navigation inférieure garde les fonctions principales accessibles à une main.",
        "Les contenus sont organisés autour de la confiance : auteur, lieu, note et contexte.",
        "L'état local rend le prototype utilisable sans backend distant.",
      ],
      en: [
        "Bottom navigation keeps core actions reachable with one hand.",
        "Content is organized around trust: author, location, rating, and context.",
        "Local state keeps the prototype usable without a remote backend.",
      ],
    },
    outcome: {
      fr: "Le projet m'a appris à concevoir une expérience mobile sociale complète, tout en gardant la découverte et la confiance au centre de chaque écran.",
      en: "The project taught me to design a complete social mobile experience while keeping discovery and trust at the center of every screen.",
    },
  },
  transmap: {
    summary: {
      fr: "TransMap représente un réseau de transport comme un système relié : arrêts, lignes, véhicules, itinéraires et états opérationnels visibles dans une seule application desktop.",
      en: "TransMap represents a transport network as a connected system: stops, routes, vehicles, itineraries, and operational states visible in one desktop application.",
    },
    workflow: {
      fr: [
        "L'opérateur s'authentifie et accède à une vue d'ensemble.",
        "Le réseau est affiché sous forme de nœuds et de liaisons.",
        "Les onglets permettent d'inspecter lignes, arrêts et véhicules.",
        "Les indicateurs résument l'état opérationnel du réseau.",
      ],
      en: [
        "The operator authenticates and opens an overview.",
        "The network appears as nodes and links.",
        "Tabs provide detailed views of routes, stops, and vehicles.",
        "Indicators summarize the network's operational state.",
      ],
    },
    features: {
      fr: ["Carte réseau", "Gestion des lignes", "Répertoire des arrêts", "Suivi des véhicules", "Indicateurs d'exploitation"],
      en: ["Network map", "Route management", "Stop directory", "Vehicle tracking", "Operational indicators"],
    },
    decisions: {
      fr: [
        "Les entités sont séparées mais reliées par un modèle de données explicite.",
        "La carte synthétise les relations que des tableaux seuls rendent difficiles à comprendre.",
        "L'architecture sépare données, logique de domaine et composants d'interface.",
      ],
      en: [
        "Entities stay separate while being connected through an explicit data model.",
        "The map summarizes relationships that tables alone make hard to understand.",
        "The architecture separates data, domain logic, and interface components.",
      ],
    },
    outcome: {
      fr: "TransMap a renforcé ma capacité à commencer par le modèle du domaine et à choisir une représentation visuelle adaptée à un système connecté.",
      en: "TransMap strengthened my ability to start from the domain model and choose a visual representation suited to a connected system.",
    },
  },
  "java-restaurant": {
    summary: {
      fr: "Java Restaurant consolide commandes, menu, réservations, liste d'attente et tendances dans un tableau de bord unique pour l'équipe du restaurant.",
      en: "Java Restaurant consolidates orders, menu, reservations, waitlist, and trends into one dashboard for the restaurant team.",
    },
    workflow: {
      fr: [
        "Le responsable consulte les indicateurs et tendances de la semaine.",
        "L'équipe ajoute les plats au panier et suit les commandes.",
        "Les réservations structurent les arrivées prévues.",
        "La liste d'attente gère les clients lorsque les tables sont occupées.",
      ],
      en: [
        "The manager reviews weekly indicators and trends.",
        "The team adds dishes to the cart and tracks orders.",
        "Reservations structure expected arrivals.",
        "The waitlist handles guests when tables are occupied.",
      ],
    },
    features: {
      fr: ["Tableau de bord", "Menu et panier", "Suivi des commandes", "Réservations", "Liste d'attente", "Graphiques de revenus"],
      en: ["Dashboard", "Menu and cart", "Order tracking", "Reservations", "Waitlist", "Revenue charts"],
    },
    decisions: {
      fr: [
        "Les opérations quotidiennes sont regroupées par contexte plutôt que par type de donnée.",
        "Les graphiques servent une décision précise : demande, volume et revenu.",
        "Les composants réutilisables gardent une interface dense cohérente.",
      ],
      en: [
        "Daily operations are grouped by context rather than raw data type.",
        "Charts support specific decisions: demand, volume, and revenue.",
        "Reusable components keep a dense interface consistent.",
      ],
    },
    outcome: {
      fr: "Ce projet m'a appris à hiérarchiser l'information opérationnelle et à construire un tableau de bord qui aide réellement à décider.",
      en: "This project taught me to prioritize operational information and build a dashboard that genuinely supports decisions.",
    },
  },
  "mobile-six": {
    summary: {
      fr: "Mobile Six coordonne les interventions d'une équipe télécom en distinguant clairement les besoins des administrateurs et ceux des techniciens terrain.",
      en: "Mobile Six coordinates telecom field operations by clearly separating the needs of administrators and field technicians.",
    },
    workflow: {
      fr: [
        "L'utilisateur choisit son rôle à la connexion.",
        "L'administrateur crée, priorise et assigne les interventions.",
        "Le technicien consulte ses tâches et fait progresser leur statut.",
        "Le journal et les notifications conservent la visibilité sur l'activité.",
      ],
      en: [
        "The user selects a role when signing in.",
        "The administrator creates, prioritizes, and assigns interventions.",
        "The technician reviews assigned work and advances task status.",
        "The activity log and notifications preserve operational visibility.",
      ],
    },
    features: {
      fr: ["Espaces administrateur et technicien", "Affectation des tâches", "Priorités et échéances", "Gestion des techniciens", "Journal d'activité", "Notifications"],
      en: ["Administrator and technician workspaces", "Task assignment", "Priorities and deadlines", "Technician management", "Activity log", "Notifications"],
    },
    decisions: {
      fr: [
        "Un même modèle de tâche alimente deux interfaces adaptées au rôle.",
        "Chaque modification importante produit une entrée de journal.",
        "Les priorités et statuts rendent la charge terrain immédiatement lisible.",
      ],
      en: [
        "One task model powers two role-appropriate interfaces.",
        "Every important change produces an activity-log entry.",
        "Priorities and statuses make field workload immediately readable.",
      ],
    },
    outcome: {
      fr: "Le prototype montre comment une petite équipe peut gagner en coordination sans multiplier les canaux informels et les feuilles de suivi.",
      en: "The prototype shows how a small team can improve coordination without multiplying informal channels and tracking sheets.",
    },
  },
  "blog-o-platform": {
    summary: {
      fr: "Blog-O-Platform est une plateforme d'écriture volontairement simple, enrichie d'un backend Express qui protège les opérations Firebase et le contenu publié.",
      en: "Blog-O-Platform is a deliberately focused writing platform, enhanced with an Express backend that protects Firebase operations and published content.",
    },
    workflow: {
      fr: [
        "Le lecteur parcourt les articles et ouvre une publication.",
        "L'auteur s'authentifie et accède à son tableau de bord.",
        "L'éditeur riche permet de structurer texte, citations, code et images.",
        "Le backend contrôle les requêtes avant leur accès à Firebase.",
      ],
      en: [
        "The reader browses articles and opens a post.",
        "The author authenticates and opens a personal dashboard.",
        "The rich editor structures text, quotes, code, and images.",
        "The backend controls requests before they reach Firebase.",
      ],
    },
    features: {
      fr: ["Lecture d'articles", "Authentification", "Éditeur riche", "Tableau de bord auteur", "Gestion des publications", "Backend Express sécurisé"],
      en: ["Article reading", "Authentication", "Rich editor", "Author dashboard", "Post management", "Secured Express backend"],
    },
    decisions: {
      fr: [
        "Express déplace les secrets et contrôles sensibles hors du navigateur.",
        "Helmet et la limitation de débit protègent les points d'entrée.",
        "L'éditeur reste volontairement limité pour préserver la cohérence des articles.",
      ],
      en: [
        "Express moves secrets and sensitive controls out of the browser.",
        "Helmet and rate limiting protect entry points.",
        "The editor stays deliberately constrained to preserve article consistency.",
      ],
    },
    outcome: {
      fr: "Le projet m'a fait passer d'une logique frontend/Firebase à une compréhension plus complète des responsabilités d'un backend sécurisé.",
      en: "The project moved me from a frontend/Firebase mindset toward a fuller understanding of secure backend responsibilities.",
    },
  },
};

export function localized<T extends LocalizedText | LocalizedList>(value: T, lang: Lang) {
  return value[lang];
}
