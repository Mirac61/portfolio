// Alle Texte der Seite. Nur diese Datei anfassen, um Inhalte zu ändern.
// Leere Strings ('') werden nicht angezeigt. Bilder liegen in public/media.
import type { Content } from './types';

export const content: Content = {
  // Kasten oben links in der tmux-Leiste
  session: 'mirac',

  // Statuszeile unten
  footer: {
    mode: 'NORMAL',
    branch: 'main',
    meta: 'utf-8 · de · © 2026 Mirac Sancak',
  },

  // 0: Startseite
  profile: {
    title: 'profil',
    host: 'mirac@esslingen',
    status: 'werkstudent: offen',
    headline: 'Ich baue Backends mit Go und Java.',
    facts: [
      { key: 'name', value: 'Mirac Sancak' },
      { key: 'studium', value: 'Softwaretechnik, HS Esslingen' },
      { key: 'semester', value: '5' },
      { key: 'fokus', value: 'Backend (Go, Java/Spring Boot)' },
      { key: 'sucht', value: 'Werkstudent · Praxissemester SS 2027' },
    ],
    // der erste sichtbare Link wird als lila Button hervorgehoben
    links: [
      { label: 'mail', href: '' }, // z.B. 'mailto:name@example.com'
      { label: 'github', href: 'https://github.com/Mirac61' },
      { label: 'linkedin', href: '' }, // z.B. 'https://www.linkedin.com/in/...'
    ],
  },

  // 1: Projekte. Reihenfolge hier = Reihenfolge auf der Seite.
  projects: {
    title: 'projekte',
    repoLabel: 'repo ansehen',
    items: [
      {
        id: 'ventorygo',
        title: 'VentoryGo',
        type: 'rechnungs-backend',
        status: '',
        desc: 'Rechnungen für Freelancer und kleine Firmen. Das Go-Backend rechnet mit ganzzahligen Cents, vergibt Rechnungsnummern lückenlos pro Nutzer und Jahr, trennt Mandanten strikt und erzeugt PDFs nach DIN 5008. Login über widerrufbare Sessions mit Argon2id.',
        meta: {
          sprache: 'Go',
          framework: 'Gin',
          datenbank: 'PostgreSQL',
          pdf: 'Maroto v2',
          infra: 'Docker, GitHub Actions',
        },
        repoUrl: 'https://github.com/Mirac61/VentoryGo',
        media: { src: '/media/ventorygo.webp', label: 'mockup' },
      },
      {
        id: 'mysh',
        title: 'mysh',
        type: 'unix-shell',
        status: '',
        desc: 'Eigene Unix-Shell in C++: Pipes, Umleitungen, && und ||, Aliase, Tab-Vervollständigung und ein Powerline-Prompt mit Git-Status. Startzeit mit hyperfine gemessen (1,5 ms), Speicher mit Valgrind geprüft (keine Lecks).',
        meta: {
          sprache: 'C++',
          messung: 'hyperfine, Valgrind',
        },
        repoUrl: 'https://github.com/Mirac61/mysh',
        media: { src: '/media/mysh.mp4', poster: '/media/mysh.webp', label: 'aufnahme' },
      },
      {
        id: 'vlanscape',
        title: 'Vlanscape',
        type: 'heimnetz-planer',
        status: '',
        desc: 'Planer fürs Heimnetz: Geräte platzieren, Ports verbinden, VLANs und WLANs festlegen und Hardware im Rack anordnen. Live-Prüfungen melden doppelte IPs, VLAN-Konflikte und Schleifen, bevor ein Kabel gezogen ist.',
        meta: {
          sprache: 'TypeScript',
          framework: 'React',
          thema: 'Netzwerk, VLANs, Rack',
        },
        repoUrl: 'https://github.com/Mirac61/Vlanscape',
        media: { src: '/media/vlanscape.webp', label: 'screenshot' },
      },
      {
        id: 'kairo',
        title: 'Kairo',
        type: 'planer-app',
        status: '',
        desc: 'Lokaler Planer für Aufgaben, Kalender, Gewohnheiten und Notizen, ohne Konto und ohne Cloud. Go-Backend mit SQLite, Web-Oberfläche in Vue 3 und eine VS-Code-Erweiterung, die Aufgaben zum geöffneten Projekt zeigt.',
        meta: {
          sprache: 'Go',
          frontend: 'Vue',
          datenbank: 'SQLite',
        },
        repoUrl: 'https://github.com/Mirac61/Kairo',
        media: { src: '/media/kairo.webp', label: 'screenshot' },
      },
    ],
  },

  // 2: Stack. Ein Eintrag, der in den meta-Werten eines Projekts vorkommt,
  // bekommt automatisch "# projektname" dahinter.
  stack: {
    title: 'stack',
    groups: [
      { folder: 'sprachen', files: ['go', 'java', 'kotlin', 'c++'] },
      { folder: 'backend', files: ['gin', 'spring boot', 'postgresql', 'keycloak'] },
      { folder: 'infra', files: ['docker', 'ci/cd'] },
      { folder: 'tools', files: ['neovim', 'tmux', 'ghostty', 'yazi'] },
    ],
  },

  // 3: Readme. Abschnitte frei erweiterbar, jeweils mit paragraphs und/oder list.
  readme: {
    title: 'readme',
    sections: [
      {
        heading: 'über mich',
        paragraphs: [
          'Ich studiere Softwaretechnik an der HS Esslingen, aktuell im 5. Semester. Mein Schwerpunkt ist Backend-Entwicklung mit Go und Java/Spring Boot. Go habe ich mir selbst beigebracht.',
        ],
      },
      {
        heading: 'was ich suche',
        list: ['eine Werkstudentenstelle im Backend', 'ein Praxissemester ab SS 2027'],
      },
    ],
    // diese beiden Abschnitte füllen sich automatisch aus git-Daten und profile.links
    recentHeading: 'zuletzt',
    linksHeading: 'links',
  },
};

// Links ohne Adresse werden überall ausgeblendet
export const links = content.profile.links.filter(({ href }) => href);
