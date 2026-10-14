export const content = {
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
    name: 'Mirac Sancak',
    role: 'softwaretechnik student',
    facts: [
      { key: 'studium', value: 'Softwaretechnik (B.Sc.)' },
      { key: 'hochschule', value: 'HS Esslingen' },
      { key: 'semester', value: '5. Semester' },
      { key: 'fokus', value: 'Backend, Tools, Netzwerke' },
      { key: 'shell', value: 'zsh' },
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
          pdf: 'Maroto v2',
          auth: 'Argon2id + HttpOnly-Cookies',
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
} as const;

export type Content = typeof content;
