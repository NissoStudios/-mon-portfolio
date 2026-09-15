export type Lang = "fr" | "en";

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    about: string;
    work: string;
    approach: string;
    skills: string;
    contact: string;
    projects: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
    backHome: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    description: string;
    exploreWork: string;
    connect: string;
    basedIn: string;
    builtFor: string;
  };
  builtForStrip: { label: string };
  featured: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    description: string;
    clientBadge: string;
    viewCaseStudy: string;
    launchDemo: string;
  };
  about: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    description: string;
    steps: { title: string; desc: string }[];
  };
  experience: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    items: { period: string; title: string; org: string; description: string }[];
  };
  work: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    description: string;
    launchDemo: string;
    viewAll: string;
  };
  approach: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    steps: { n: string; title: string; desc: string }[];
  };
  skills: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    groups: { title: string; items: string[] }[];
  };
  philosophy: { eyebrow: string; quote: string; description: string };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    talk: string;
    whatsapp: string;
    github: string;
    facebook: string;
  };
  footer: { tagline: string; rights: string };
  demoLoading: string;
  projectsPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    intro: string;
    featuredLabel: string;
    otherLabel: string;
    contextLabel: string;
    roleLabel: string;
    stackLabel: string;
    learnedLabel: string;
    launchDemo: string;
    viewSource: string;
    backHome: string;
  };
}

export const dictionary: Record<Lang, Dictionary> = {
  fr: {
    meta: {
      title: "Nisso Emmanuel Franky — Ingénieur logiciel & développeur cybersécurité | Nisso Studios",
      description:
        "Portfolio de Nisso Emmanuel Franky (Nisso Studios) — étudiant en génie logiciel et développeur sensibilisé à la cybersécurité, stagiaire chez SOSUCAM. Applications web, mobiles et métier construites pour SOSUCAM, le Secrétariat Ousy et Mobile Six.",
    },
    nav: {
      about: "À propos",
      work: "Projets",
      approach: "Méthode",
      skills: "Compétences",
      contact: "Contact",
      projects: "Études de cas",
      cta: "Construisons quelque chose",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      backHome: "Accueil",
    },
    hero: {
      eyebrow: "INGÉNIEUR LOGICIEL · CYBERSÉCURITÉ · PRODUITS NUMÉRIQUES",
      titleLead: "Je transforme des problèmes réels en",
      titleHighlight: "solutions numériques.",
      description:
        "Étudiant en génie logiciel à l'ICT University et développeur sensibilisé à la cybersécurité, je construis des applications web, mobiles et métier utiles, avec un vrai souci de fonctionnalité, de sécurité et d'impact concret.",
      exploreWork: "Découvrir mes projets",
      connect: "Discutons",
      basedIn: "BASÉ AU CAMEROUN · JE CONSTRUIS POUR LE MONDE RÉEL",
      builtFor: "APPLICATIONS CONÇUES POUR SOSUCAM · SECRÉTARIAT OUSY · MOBILE SIX (STARTUP)",
    },
    builtForStrip: { label: "CONSTRUIT POUR" },
    featured: {
      eyebrow: "PARTENAIRE INDUSTRIEL",
      titleLead: "Deux applications, ",
      titleHighlight: "un partenaire : SOSUCAM.",
      description:
        "GestMedicert et E-Commercial répondent à deux besoins réels rencontrés pendant mon stage chez SOSUCAM. Ce sont les deux projets qui représentent le mieux ce que je sais construire.",
      clientBadge: "CRÉÉ POUR SOSUCAM",
      viewCaseStudy: "Voir l'étude de cas",
      launchDemo: "Lancer la démo",
    },
    about: {
      eyebrow: "01 / ÉTAT D'ESPRIT",
      titleLead: "Je ne commence pas par le code.",
      titleHighlight: "Je commence par le problème.",
      description:
        "Chaque projet part d'un problème qui mérite d'être résolu. Je cherche d'abord à comprendre le processus réel, à identifier ce qui peut être amélioré, à concevoir le bon système, puis seulement à construire la technologie derrière.",
      steps: [
        { title: "Comprendre", desc: "Les utilisateurs, le processus et le contexte." },
        { title: "Concevoir", desc: "Le flux de travail et l'architecture." },
        { title: "Construire", desc: "La solution avec les bons outils." },
        { title: "Sécuriser & améliorer", desc: "Accès, données, fiabilité et itération." },
      ],
    },
    experience: {
      eyebrow: "PARCOURS",
      titleLead: "Ce que je fais, ",
      titleHighlight: "concrètement.",
      items: [
        {
          period: "Depuis avril 2026",
          title: "Stagiaire développeur",
          org: "SOSUCAM",
          description:
            "Conception d'applications internes — gestion documentaire RH/médicale et workflow commercial — pour les sites de Mbandjock et Nkoteng.",
        },
        {
          period: "Juin – novembre 2025",
          title: "Formateur en développement web",
          org: "Secrétariat Ousy",
          description: "Formations en HTML, CSS et JavaScript pour des apprenants débutants.",
        },
        {
          period: "Études en cours",
          title: "Étudiant en génie logiciel",
          org: "ICT University",
          description: "Formation en ingénierie logicielle, avec un intérêt marqué pour la cybersécurité.",
        },
      ],
    },
    work: {
      eyebrow: "02 / TRAVAUX SÉLECTIONNÉS",
      titleLead: "Des problèmes réels. ",
      titleHighlight: "Des systèmes réels.",
      description: "D'autres projets sont ajoutés régulièrement — lancez n'importe quel prototype ci-dessous.",
      launchDemo: "Lancer la démo",
      viewAll: "Voir toutes les études de cas",
    },
    approach: {
      eyebrow: "03 / MA MÉTHODE",
      titleLead: "Du problème à ",
      titleHighlight: "l'impact.",
      steps: [
        { n: "01", title: "PROBLÈME", desc: "Comprendre ce qui est réellement cassé, et pour qui." },
        { n: "02", title: "RECHERCHE", desc: "Regarder comment c'est résolu aujourd'hui, et pourquoi ça ne suffit pas." },
        { n: "03", title: "CONCEPTION SYSTÈME", desc: "Modéliser les données et le flux avant toute interface." },
        { n: "04", title: "DÉVELOPPEMENT", desc: "Construire avec la stack que le problème exige vraiment." },
        { n: "05", title: "SÉCURITÉ", desc: "Traiter accès, données et intégrité comme des fonctionnalités à part entière." },
        { n: "06", title: "TESTS", desc: "Casser le système exprès avant qu'un utilisateur ne le fasse par accident." },
        { n: "07", title: "DÉPLOIEMENT", desc: "Livrer quelque chose que de vraies personnes peuvent utiliser." },
        { n: "08", title: "ITÉRATION", desc: "Observer ce qui se passe, puis améliorer." },
      ],
    },
    skills: {
      eyebrow: "04 / CAPACITÉS",
      titleLead: "Les outils sont le moyen. ",
      titleHighlight: "L'ingénierie est la compétence.",
      groups: [
        { title: "GÉNIE LOGICIEL", items: ["PHP", "JavaScript", "React", "Next.js", "Python", "Java", "C++"] },
        { title: "BASES DE DONNÉES", items: ["Microsoft SQL Server", "MySQL", "Modélisation relationnelle"] },
        { title: "MOBILE & APIs", items: ["Android", "Kotlin", "Flutter", "Dart", "Mapbox", "APIs REST"] },
        { title: "SÉCURITÉ", items: ["Authentification", "Autorisation", "Intégrité des données", "SHA-256", "HMAC", "Requêtes préparées"] },
      ],
    },
    philosophy: {
      eyebrow: "05 / PHILOSOPHIE",
      quote: "« La technologie a de la valeur quand elle améliore quelque chose qui compte vraiment. »",
      description:
        "Automatisation. Efficacité. Traçabilité. Sécurité. Accessibilité. L'objectif n'est jamais la technologie pour elle-même — c'est l'amélioration mesurable.",
    },
    contact: {
      eyebrow: "06 / CONTACT",
      title: "Un problème qui mérite d'être résolu ?",
      description: "Transformons l'idée en quelque chose de réel.",
      talk: "Discutons",
      whatsapp: "WhatsApp",
      github: "GitHub",
      facebook: "Facebook",
    },
    footer: {
      tagline: "Ingénieur logiciel · Cybersécurité · Solutions numériques",
      rights: "© 2026 Nisso Emmanuel Franky",
    },
    demoLoading: "Chargement de la démo…",
    projectsPage: {
      metaTitle: "Projets & études de cas",
      metaDescription:
        "Études de cas détaillées : le problème résolu, le rôle joué, la stack technique et ce que chaque projet m'a réellement appris — de GestMedicert et E-Commercial (SOSUCAM) à TripBook, TransMap, Java Restaurant, Mobile Six et Blog-O-Platform.",
      eyebrow: "MES PROJETS",
      titleLead: "Une sélection de projets qui ont",
      titleHighlight: "façonné ma façon de penser le logiciel.",
      intro:
        "Chaque projet ci-dessous a été choisi parce qu'il m'a appris quelque chose de concret — pas seulement une technologie, mais une façon de raisonner sur un problème réel.",
      featuredLabel: "CRÉÉS POUR SOSUCAM",
      otherLabel: "AUTRES PROJETS",
      contextLabel: "LE PROBLÈME",
      roleLabel: "RÔLE",
      stackLabel: "STACK TECHNIQUE",
      learnedLabel: "CE QUE J'EN AI RETENU",
      launchDemo: "Lancer le prototype",
      viewSource: "Voir le code source",
      backHome: "Retour à l'accueil",
    },
  },
  en: {
    meta: {
      title: "Nisso Emmanuel Franky — Software Engineer & Cybersecurity Developer | Nisso Studios",
      description:
        "Portfolio of Nisso Emmanuel Franky (Nisso Studios) — software engineering student and cybersecurity-minded developer, currently interning at SOSUCAM. Web, mobile and business applications built for SOSUCAM, Secrétariat Ousy and Mobile Six.",
    },
    nav: {
      about: "About",
      work: "Projects",
      approach: "Approach",
      skills: "Skills",
      contact: "Contact",
      projects: "Case studies",
      cta: "Let's build something",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      backHome: "Home",
    },
    hero: {
      eyebrow: "SOFTWARE ENGINEER · CYBERSECURITY · DIGITAL PRODUCTS",
      titleLead: "I turn real-world problems into",
      titleHighlight: "digital solutions.",
      description:
        "Software engineering student at ICT University and cybersecurity-minded developer building useful web, mobile and business solutions with a focus on functionality, security and real-world impact.",
      exploreWork: "Explore my work",
      connect: "Let's connect",
      basedIn: "BASED IN CAMEROON · BUILDING FOR THE REAL WORLD",
      builtFor: "APPS DESIGNED FOR SOSUCAM · SECRÉTARIAT OUSY · MOBILE SIX (STARTUP)",
    },
    builtForStrip: { label: "BUILT FOR" },
    featured: {
      eyebrow: "INDUSTRY PARTNER",
      titleLead: "Two applications, ",
      titleHighlight: "one partner: SOSUCAM.",
      description:
        "GestMedicert and E-Commercial both came out of real needs I encountered during my internship at SOSUCAM. They're the two projects that best represent what I can build.",
      clientBadge: "BUILT FOR SOSUCAM",
      viewCaseStudy: "View case study",
      launchDemo: "Launch demo",
    },
    about: {
      eyebrow: "01 / MINDSET",
      titleLead: "I don't start with code.",
      titleHighlight: "I start with the problem.",
      description:
        "Every project starts with a problem worth solving. I focus on understanding the process, identifying what can be improved, designing the right system and then building the technology behind it.",
      steps: [
        { title: "Understand", desc: "Users, process and context." },
        { title: "Design", desc: "Workflow and architecture." },
        { title: "Build", desc: "The solution with the right tools." },
        { title: "Secure & improve", desc: "Access, data, reliability and iteration." },
      ],
    },
    experience: {
      eyebrow: "EXPERIENCE",
      titleLead: "What I actually ",
      titleHighlight: "do.",
      items: [
        {
          period: "Since April 2026",
          title: "Software Engineering Intern",
          org: "SOSUCAM",
          description:
            "Building internal applications — HR/medical document management and commercial workflow tooling — for the Mbandjock and Nkoteng sites.",
        },
        {
          period: "June – November 2025",
          title: "Web Development Trainer",
          org: "Secrétariat Ousy",
          description: "Delivered HTML, CSS and JavaScript training sessions for beginner learners.",
        },
        {
          period: "Currently enrolled",
          title: "Software Engineering Student",
          org: "ICT University",
          description: "Studying software engineering, with a strong focus on cybersecurity.",
        },
      ],
    },
    work: {
      eyebrow: "02 / SELECTED WORK",
      titleLead: "Real problems. ",
      titleHighlight: "Real systems.",
      description: "More projects added regularly — launch any live prototype below.",
      launchDemo: "Launch demo",
      viewAll: "View all case studies",
    },
    approach: {
      eyebrow: "03 / HOW I BUILD",
      titleLead: "From problem to ",
      titleHighlight: "impact.",
      steps: [
        { n: "01", title: "PROBLEM", desc: "Understand what's actually broken, and for whom." },
        { n: "02", title: "RESEARCH", desc: "Look at how it's solved today, and why that falls short." },
        { n: "03", title: "SYSTEM DESIGN", desc: "Model the data and the workflow before any UI." },
        { n: "04", title: "DEVELOPMENT", desc: "Build with the stack the problem actually needs." },
        { n: "05", title: "SECURITY", desc: "Treat access, data and integrity as first-class features." },
        { n: "06", title: "TESTING", desc: "Break it on purpose before a user does it by accident." },
        { n: "07", title: "DEPLOYMENT", desc: "Ship something real people can actually use." },
        { n: "08", title: "ITERATION", desc: "Watch what happens, then make it better." },
      ],
    },
    skills: {
      eyebrow: "04 / CAPABILITIES",
      titleLead: "Tools are the means. ",
      titleHighlight: "Engineering is the skill.",
      groups: [
        { title: "SOFTWARE ENGINEERING", items: ["PHP", "JavaScript", "React", "Next.js", "Python", "Java", "C++"] },
        { title: "DATABASES", items: ["Microsoft SQL Server", "MySQL", "Relational design"] },
        { title: "MOBILE & APIs", items: ["Android", "Kotlin", "Flutter", "Dart", "Mapbox", "REST APIs"] },
        { title: "SECURITY", items: ["Authentication", "Authorization", "Data integrity", "SHA-256", "HMAC", "Prepared queries"] },
      ],
    },
    philosophy: {
      eyebrow: "05 / PHILOSOPHY",
      quote: "\u201cTechnology becomes valuable when it improves something that matters.\u201d",
      description:
        "Automation. Efficiency. Traceability. Security. Accessibility. The goal is not technology for its own sake — it is measurable improvement.",
    },
    contact: {
      eyebrow: "06 / CONTACT",
      title: "Have a problem worth solving?",
      description: "Let's turn the idea into something real.",
      talk: "Let's talk",
      whatsapp: "WhatsApp",
      github: "GitHub",
      facebook: "Facebook",
    },
    footer: {
      tagline: "Software Engineer · Cybersecurity · Digital Solutions",
      rights: "© 2026 Nisso Emmanuel Franky",
    },
    demoLoading: "Loading demo…",
    projectsPage: {
      metaTitle: "Projects & case studies",
      metaDescription:
        "In-depth case studies covering the problem solved, my role, the tech stack and what I actually learned — from GestMedicert and E-Commercial (SOSUCAM) to TripBook, TransMap, Java Restaurant, Mobile Six and Blog-O-Platform.",
      eyebrow: "MY PROJECTS",
      titleLead: "A selection of projects that",
      titleHighlight: "shaped how I think about software.",
      intro:
        "Every project below was picked because it taught me something concrete — not just a technology, but a way of reasoning about a real problem.",
      featuredLabel: "BUILT FOR SOSUCAM",
      otherLabel: "OTHER PROJECTS",
      contextLabel: "THE PROBLEM",
      roleLabel: "ROLE",
      stackLabel: "TECH STACK",
      learnedLabel: "WHAT I LEARNED",
      launchDemo: "Launch prototype",
      viewSource: "View source",
      backHome: "Back to home",
    },
  },
};
