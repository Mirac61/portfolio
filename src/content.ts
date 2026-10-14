export interface ProjectMedia {
  href: string;
  label: string;
  // first frame for videos, chosen so it already shows output
  poster?: string;
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
  repoUrl: string;
  media: ProjectMedia;
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

export interface StackGroup {
  folder: string;
  files: string[];
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
    hints: { key: string; label: string }[];
    meta: string;
  };
  profile: {
    host: string;
    headline: string;
    lines: ProfileFact[];
    links: Record<string, ProfileLink>;
  };
  projects: {
    title: string;
    repoLabel: string;
    items: Project[];
  };
  stack: {
    title: string;
    groups: StackGroup[];
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
    hints: [
      { key: '0-3', label: 'fenster' },
      { key: 'j/k', label: 'auswahl' },
      { key: 't', label: 'theme' },
    ],
    meta: 'utf-8 · de · © 2026 Mirac Sancak',
  },

  profile: {
    host: 'mirac@esslingen',
    headline: 'Ich baue Backends mit Go und Java.',
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
    repoLabel: 'repo ansehen',
    items: [
      {
        id: 'ventorygo',
        name: 'ventorygo',
        title: 'VentoryGo',
        type: 'rechnungs-backend',
        lang: 'go',
        path: '~/projects/ventorygo',
        status: 'TODO: Projektstatus eintragen',
        desc: 'Rechnungen für Freelancer und kleine Firmen. Das Go-Backend rechnet mit ganzzahligen Cents, vergibt Rechnungsnummern lückenlos pro Nutzer und Jahr, trennt Mandanten strikt und erzeugt PDFs nach DIN 5008. Login über widerrufbare Sessions mit Argon2id.',
        meta: {
          sprache: 'Go',
          framework: 'Gin',
          datenbank: 'PostgreSQL',
          pdf: 'Maroto v2',
          infra: 'Docker, GitHub Actions',
        },
        repoUrl: 'https://github.com/Mirac61/VentoryGo',
        media: { href: '/media/ventorygo.webp', label: 'mockup' },
      },
      {
        id: 'mysh',
        name: 'mysh',
        title: 'mysh',
        type: 'unix-shell',
        lang: 'c++',
        path: '~/projects/mysh',
        status: 'TODO: Projektstatus eintragen',
        desc: 'Eigene Unix-Shell in C++: Pipes, Umleitungen, && und ||, Aliase, Tab-Vervollständigung und ein Powerline-Prompt mit Git-Status. Startzeit mit hyperfine gemessen (1,5 ms), Speicher mit Valgrind geprüft (keine Lecks).',
        meta: {
          sprache: 'C++',
          messung: 'hyperfine, Valgrind',
        },
        repoUrl: 'https://github.com/Mirac61/mysh',
        media: { href: '/media/mysh.mp4', poster: '/media/mysh.webp', label: 'aufnahme' },
      },
      {
        id: 'vlanscape',
        name: 'vlanscape',
        title: 'Vlanscape',
        type: 'heimnetz-planer',
        lang: 'typescript',
        path: '~/projects/vlanscape',
        status: 'TODO: Projektstatus eintragen',
        desc: 'Planer fürs Heimnetz: Geräte platzieren, Ports verbinden, VLANs und WLANs festlegen und Hardware im Rack anordnen. Live-Prüfungen melden doppelte IPs, VLAN-Konflikte und Schleifen, bevor ein Kabel gezogen ist.',
        meta: {
          sprache: 'TypeScript',
          framework: 'React',
          thema: 'Netzwerk, VLANs, Rack',
        },
        repoUrl: 'https://github.com/Mirac61/Vlanscape',
        media: { href: '/media/vlanscape.webp', label: 'screenshot' },
      },
      {
        id: 'kairo',
        name: 'kairo',
        title: 'Kairo',
        type: 'planer-app',
        lang: 'go',
        path: '~/projects/kairo',
        status: 'TODO: Projektstatus eintragen',
        desc: 'Lokaler Planer für Aufgaben, Kalender, Gewohnheiten und Notizen, ohne Konto und ohne Cloud. Go-Backend mit SQLite, Web-Oberfläche in Vue 3 und eine VS-Code-Erweiterung, die Aufgaben zum geöffneten Projekt zeigt.',
        meta: {
          sprache: 'Go',
          frontend: 'Vue',
          datenbank: 'SQLite',
        },
        repoUrl: 'https://github.com/Mirac61/Kairo',
        media: { href: '/media/kairo.webp', label: 'screenshot' },
      },
    ],
  },

  stack: {
    title: 'stack',
    groups: [
      { folder: 'sprachen', files: ['go', 'java', 'kotlin', 'c++'] },
      { folder: 'backend', files: ['gin', 'spring boot', 'postgresql', 'keycloak'] },
      { folder: 'infra', files: ['docker', 'ci/cd'] },
      { folder: 'tools', files: ['neovim', 'tmux', 'ghostty', 'yazi'] },
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
