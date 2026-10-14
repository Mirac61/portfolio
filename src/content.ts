export interface ProjectVisual {
  type: 'screenshot' | 'terminal';
  src: string;
  filename: string;
  alt: string;
}

export interface Project {
  id: string;
  name: string;
  title: string;
  type: string;
  lang: string;
  path: string;
  status: string;
  desc: string;
  meta: Record<string, string>;
  tech: string[];
  visual: ProjectVisual;
}

export interface StatusTab {
  id: string;
  label: string;
}

export interface ProfileLink {
  label: string;
  href: string;
}

export interface ProfileFact {
  key: string;
  value: string;
}

export interface StackTreeItem {
  prefix: string;
  label: string;
  folder: boolean;
}

export interface ReadmeSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Content {
  meta: {
    title: string;
    author: string;
  };
  statusBar: {
    session: string;
    tabs: StatusTab[];
    hiring: string;
    internship: string;
  };
  footer: {
    mode: string;
    branch: string;
    path: string;
    meta: string;
  };
  profile: {
    host: 'mirac@esslingen',
    lines: ProfileFact[];
    links: Record<string, ProfileLink>;
  };
  projects: {
    title: string;
    listHint: string;
    positionLabel: string;
    repoLabel: string;
    repoHref: string;
    noVisualLabel: string;
    keybindingHint: string;
    items: Project[];
  };
  stack: {
    title: string;
    tree: StackTreeItem[];
    summary: string;
  };
  readme: {
    title: string;
    lead: string;
    sections: ReadmeSection[];
  };
}

export const content: Content = {
  meta: {
    title: 'mirac@esslingen ~ portfolio',
    author: 'Mirac Sancak',
  },

  statusBar: {
    session: 'mirac',
    tabs: [
      { id: 'profil', label: 'profil' },
      { id: 'projekte', label: 'projekte' },
      { id: 'stack', label: 'stack' },
      { id: 'readme', label: 'readme' },
    ],
    hiring: 'werkstudent: offen',
    internship: 'praxissemester: SS 2027',
  },

  footer: {
    mode: 'NORMAL',
    branch: 'main',
    path: '~/mirac/portfolio',
    meta: 'utf-8 · de · © 2026 Mirac Sancak',
  },

  profile: {
    host: 'mirac@esslingen',
    lines: [
      { key: 'name', value: 'Mirac Sancak' },
      { key: 'studium', value: 'Softwaretechnik, HS Esslingen' },
      { key: 'semester', value: '5' },
      { key: 'fokus', value: 'Backend (Go, Java/Spring Boot)' },
      { key: 'sucht', value: 'Werkstudent · Praxissemester SS 2027' },
    ],
    links: {
      mail: {
        label: 'mail',
        href: 'TODO: echte Mail-Adresse eintragen',
      },
      github: {
        label: 'github',
        href: 'TODO: echte GitHub-URL eintragen',
      },
      linkedin: {
        label: 'linkedin',
        href: 'TODO: echte LinkedIn-URL eintragen',
      },
    },
  },

  projects: {
    title: 'projekte',
    listHint: 'klicken oder ↑/↓ zum auswählen',
    positionLabel: '{current}/{total}',
    repoLabel: 'repo ansehen',
    repoHref: 'TODO: Projekt-URL eintragen',
    noVisualLabel: 'TODO: Screenshot oder Terminal-Ausschnitt einfügen',
    keybindingHint: '↑/↓ auswählen · enter repo öffnen',
    items: [
      {
        id: 'ventorygo',
        name: 'ventorygo',
        title: 'VentoryGo',
        type: 'rechnungs-backend',
        lang: 'go',
        path: '~/projects/ventorygo',
        status: 'TODO: Projektstatus eintragen',
        desc: 'Backend für Rechnungen in Go mit Gin und PostgreSQL. Erzeugt PDF-Rechnungen mit Maroto v2 und verwendet Session-Auth mit Argon2id sowie HttpOnly-Cookies.',
        meta: {
          sprache: 'Go',
          framework: 'Gin',
          datenbank: 'PostgreSQL',
        },
        tech: ['Go', 'Gin', 'PostgreSQL', 'Maroto v2', 'Argon2id'],
        visual: {
          type: 'screenshot',
          src: 'TODO',
          filename: 'ventorygo.png',
          alt: 'Screenshot der VentoryGo-Oberfläche',
        },
      },
      {
        id: 'mysh',
        name: 'mysh',
        title: 'mysh',
        type: 'unix-shell',
        lang: 'c++',
        path: '~/projects/mysh',
        status: 'TODO: Projektstatus eintragen',
        desc: 'Eigene Unix-Shell in C++ mit Fokus auf Profiling und Performance-Optimierung.',
        meta: {
          sprache: 'C++',
          fokus: 'Profiling, Performance',
        },
        tech: ['C++', 'Unix', 'Profiling'],
        visual: {
          type: 'terminal',
          src: 'TODO',
          filename: 'mysh.webm',
          alt: 'Terminal-Ausschnitt der mysh-Shell',
        },
      },
      {
        id: 'vlanscape',
        name: 'vlanscape',
        title: 'Vlanscape',
        type: 'heimnetz-planer',
        lang: 'typescript',
        path: '~/projects/vlanscape',
        status: 'TODO: Projektstatus eintragen',
        desc: 'Visueller Heimnetz-Planer für Geräte, Ports, VLANs und Rack-Aufbau. Gebaut mit React und TypeScript.',
        meta: {
          sprache: 'TypeScript',
          framework: 'React',
          thema: 'Netzwerk, VLANs, Rack',
        },
        tech: ['TypeScript', 'React', 'Netzwerk', 'VLANs'],
        visual: {
          type: 'screenshot',
          src: 'TODO',
          filename: 'vlanscape.png',
          alt: 'Screenshot des Vlanscape-Netzwerkplaners',
        },
      },
      {
        id: 'kairo',
        name: 'kairo',
        title: 'Kairo',
        type: 'planer-app',
        lang: 'go',
        path: '~/projects/kairo',
        status: 'TODO: Projektstatus eintragen',
        desc: 'Planer-App für Aufgaben, Kalender, Projekte und Notizen. Backend in Go, Frontend in Vue.',
        meta: {
          sprache: 'Go',
          frontend: 'Vue',
          thema: 'Aufgaben, Kalender, Notizen',
        },
        tech: ['Go', 'Vue', 'Planung'],
        visual: {
          type: 'screenshot',
          src: 'TODO',
          filename: 'kairo.png',
          alt: 'Screenshot der Kairo-Planer-Oberfläche',
        },
      },
    ],
  },

  stack: {
    title: 'stack',
    tree: [
      { prefix: '.', label: '', folder: false },
      { prefix: '├── ', label: 'sprachen', folder: true },
      { prefix: '│   ├── ', label: 'go', folder: false },
      { prefix: '│   ├── ', label: 'java / spring boot', folder: false },
      { prefix: '│   ├── ', label: 'kotlin / android', folder: false },
      { prefix: '│   └── ', label: 'c++', folder: false },
      { prefix: '├── ', label: 'backend', folder: true },
      { prefix: '│   ├── ', label: 'postgresql', folder: false },
      { prefix: '│   ├── ', label: 'docker', folder: false },
      { prefix: '│   └── ', label: 'keycloak', folder: false },
      { prefix: '├── ', label: 'tools', folder: true },
      { prefix: '│   ├── ', label: 'ci/cd', folder: false },
      { prefix: '│   └── ', label: 'git', folder: false },
      { prefix: '└── ', label: 'lernen', folder: true },
      { prefix: '    └── ', label: 'TODO: hier eintragen', folder: false },
    ],
    summary: '4 verzeichnisse, 6 dateien',
  },

  readme: {
    title: 'readme',
    lead: 'TODO: Lead-Satz eintragen',
    sections: [
      {
        heading: 'über mich',
        paragraphs: ['TODO: Abschnitt über mich eintragen. Nichts erfinden.'],
      },
      {
        heading: 'was ich suche',
        list: [
          'Werkstudentenstelle im Backend',
          'Praxissemester ab SS 2027',
        ],
      },
      {
        heading: 'kontakt',
        paragraphs: ['TODO: Kontakt-Text eintragen.'],
      },
    ],
  },
} as const satisfies Content;
