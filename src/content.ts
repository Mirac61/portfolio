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
  repoUrl: string;
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

// TODO values stay in this file for tracking but must never render
export function isPending(value: string): boolean {
  return value.startsWith('TODO');
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
    keybindingHint: string;
    items: Project[];
  };
  stack: {
    title: string;
    tree: StackTreeItem[];
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
        href: 'https://github.com/Mirac61',
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
        repoUrl: 'https://github.com/Mirac61/VentoryGo',
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
        repoUrl: 'https://github.com/Mirac61/mysh',
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
        repoUrl: 'https://github.com/Mirac61/Vlanscape',
        visual: {
          type: 'screenshot',
          src: '/media/vlanscape.webp',
          filename: 'vlanscape.webp',
          alt: 'Screenshot: Vlanscape-Topologie-Editor mit Geräten, Switch-Ports und VLAN-Verbindungen',
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
        repoUrl: 'https://github.com/Mirac61/Kairo',
        visual: {
          type: 'screenshot',
          src: '/media/kairo.webp',
          filename: 'kairo.webp',
          alt: 'Screenshot: Kairo-Wochenansicht mit Kalendereinträgen und Ungeplant-Spalte',
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
      { prefix: '│   ├── ', label: 'java', folder: false },
      { prefix: '│   ├── ', label: 'kotlin', folder: false },
      { prefix: '│   └── ', label: 'c++', folder: false },
      { prefix: '├── ', label: 'backend', folder: true },
      { prefix: '│   ├── ', label: 'gin', folder: false },
      { prefix: '│   ├── ', label: 'spring boot', folder: false },
      { prefix: '│   ├── ', label: 'postgresql', folder: false },
      { prefix: '│   └── ', label: 'keycloak', folder: false },
      { prefix: '├── ', label: 'infra', folder: true },
      { prefix: '│   ├── ', label: 'docker', folder: false },
      { prefix: '│   └── ', label: 'ci/cd', folder: false },
      { prefix: '└── ', label: 'tools', folder: true },
      { prefix: '    ├── ', label: 'neovim', folder: false },
      { prefix: '    ├── ', label: 'tmux', folder: false },
      { prefix: '    ├── ', label: 'ghostty', folder: false },
      { prefix: '    └── ', label: 'yazi', folder: false },
    ],
  },

  readme: {
    title: 'readme',
    lead: 'Ich studiere Softwaretechnik an der HS Esslingen, aktuell im 5. Semester. Mein Schwerpunkt ist Backend-Entwicklung mit Go und Java/Spring Boot. Go habe ich mir selbst beigebracht.',
    sections: [
      {
        heading: 'was ich suche',
        list: ['eine Werkstudentenstelle im Backend', 'ein Praxissemester ab SS 2027'],
      },
    ],
  },
} as const satisfies Content;
