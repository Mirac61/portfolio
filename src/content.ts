// Alle Texte der Seite. Nur diese Datei anfassen, um Inhalte zu ändern.
// Leere Strings ('') werden nicht angezeigt. Bilder liegen in public/media.
import type { Content, StackRow } from './types';

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
    headline: 'Ich baue Systeme, nicht nur Features.',
    subline: 'Backend Engineering · Go · Java',
    facts: [
      { key: 'name', value: 'Mirac Sancak' },
      { key: 'studium', value: 'Softwaretechnik', sub: 'HS Esslingen' },
      { key: 'semester', value: '5' },
      { key: 'fokus', value: 'Backend', sub: 'Go · Java · Spring Boot' },
      { key: 'hobbies', value: 'Calisthenics · Fußball · Motorsport' },
      { key: 'sucht', value: 'Werkstudent · Praxissemester', sub: 'SS 2027' },
    ],
    // der erste sichtbare Link wird als lila Button hervorgehoben
    links: [
      { label: 'mail', href: '' }, // z.B. 'mailto:name@example.com'
      { label: 'github', href: 'https://github.com/Mirac61' },
      { label: 'linkedin', href: 'https://linkedin.com/in/mirac-ibrahim-sancak-47917238b' }, 
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
          team: '2 Personen',
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

  // 2: Stack als Verzeichnis: Sidebar = Ordner, Haupt-Pane = `ls`-Listing des
  // Ordners. Enter oder Klick auf eine Datei = `cd` hinein (Detailansicht,
  // aktuell ein Platzhalter-Slot), esc oder cd .. zurück. Ein Eintrag, der
  // in den meta-Werten eines Projekts vorkommt, bekommt "# projektname" dahinter.
  // `info` liefert Text und ASCII-Grafik für den Slot.
  stack: {
    title: 'stack',
    groups: [
      { folder: 'sprachen', files: ['go', 'java', 'kotlin', 'c++'] },
      { folder: 'backend', files: ['gin', 'spring boot', 'postgresql', 'keycloak'] },
      { folder: 'infra', files: ['docker', 'ci/cd'] },
      { folder: 'tools', files: ['neovim', 'tmux', 'ghostty', 'yazi'] },
    ],
    info: {
      sprachen: { desc: 'Programmiersprachen, mit denen ich täglich arbeite.' },
      backend: { desc: 'Server, Datenbanken und Anmeldung.' },
      infra: { desc: 'Bauen, testen und ausliefern.' },
      tools: { desc: 'Mein Terminal-Alltag.' },

      go: { desc: 'Meine Hauptsprache im Backend. Ganzzahlige Cents, klare Nebenläufigkeit, schnelle Builds.' },
      java: {
        desc: 'Aus dem Studium und für Spring-Boot-Dienste.',
        art: [
          '  ███  ███  █   █  ███',
          '   █  █   █ █   █ █   █',
          '   █  █████ █   █ █████',
          '█  █  █   █  █ █  █   █',
          ' ██   █   █   █   █   █',
        ],
      },
      kotlin: {
        desc: 'Moderne JVM-Sprache, wenn Java zu ausführlich wird.',
        art: [
          '█   █  ███  █████ █      ███  █   █',
          '█  █  █   █   █   █       █   ██  █',
          '███   █   █   █   █       █   █ █ █',
          '█  █  █   █   █   █       █   █  ██',
          '█   █  ███    █   █████  ███  █   █',
        ],
      },
      'c++': { desc: 'Systemnah: Pipes, Prozesse und Speicher selbst verwalten.' },

      gin: { desc: 'Schlanker HTTP-Router für Go, ohne viel Magie.' },
      'spring boot': {
        desc: 'Für größere Java-Dienste mit DI, REST und Sicherheit.',
        art: [
          ' ████ ████  ████   ███  █   █  ████       ████   ███   ███  █████',
          '█     █   █ █   █   █   ██  █ █           █   █ █   █ █   █   █',
          ' ███  ████  ████    █   █ █ █ █  ██       ████  █   █ █   █   █',
          '    █ █     █  █    █   █  ██ █   █       █   █ █   █ █   █   █',
          '████  █     █   █  ███  █   █  ████       ████   ███   ███    █',
        ],
      },
      postgresql: { desc: 'Relationale Datenbank mit Transaktionen und sauberem SQL.' },
      keycloak: {
        desc: 'Identity-Provider für Login, Rollen und SSO.',
        art: [
          '█   █ █████ █   █  ████ █      ███   ███  █   █',
          '█  █  █      █ █  █     █     █   █ █   █ █  █',
          '███   ████    █   █     █     █   █ █████ ███',
          '█  █  █       █   █     █     █   █ █   █ █  █',
          '█   █ █████   █    ████ █████  ███  █   █ █   █',
        ],
      },

      docker: { desc: 'Container für reproduzierbare Builds und Läufe.' },
      'ci/cd': {
        desc: 'GitHub Actions: Build, Tests und Deploy automatisch.',
        art: [
          ' ████  ███      █  ████ ████',
          '█       █      █  █     █   █',
          '█       █     █   █     █   █',
          '█       █    █    █     █   █',
          ' ████  ███  █      ████ ████',
        ],
      },

      neovim: {
        desc: 'Mein Editor: LSP, Suche und alles über Tastenkürzel.',
        art: [
          '█   █ █████  ███  █   █  ███  █   █',
          '██  █ █     █   █ █   █   █   ██ ██',
          '█ █ █ ████  █   █ █   █   █   █ █ █',
          '█  ██ █     █   █  █ █    █   █   █',
          '█   █ █████  ███    █    ███  █   █',
        ],
      },
      tmux: {
        desc: 'Sitzungen und Fenster, die einen SSH-Abbruch überleben.',
        art: [
          '█████ █   █ █   █ █   █',
          '  █   ██ ██ █   █  █ █',
          '  █   █ █ █ █   █   █',
          '  █   █   █ █   █  █ █',
          '  █   █   █  ███  █   █',
        ],
      },
      ghostty: {
        desc: 'Schnelles Terminal mit GPU-Rendering.',
        art: [
          ' ████ █   █  ███   ████ █████ █████ █   █',
          '█     █   █ █   █ █       █     █    █ █',
          '█  ██ █████ █   █  ███    █     █     █',
          '█   █ █   █ █   █     █   █     █     █',
          ' ████ █   █  ███  ████    █     █     █',
        ],
      },
      yazi: {
        desc: 'Dateimanager für schnelles Navigieren im Terminal.',
        art: [
          '█   █  ███  █████  ███',
          ' █ █  █   █    █    █',
          '  █   █████   █     █',
          '  █   █   █  █     █',
          '  █   █   █ █████  ███',
        ],
      },
    },
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
    // füllt sich automatisch aus profile.links
    linksHeading: 'links',
  },
};

// Links ohne Adresse werden überall ausgeblendet
export const links = content.profile.links.filter(({ href }) => href);

// Readme-Abschnitte plus der Link-Abschnitt am Ende, so wie sie links in der Liste stehen
export const readmeHeadings = [...content.readme.sections.map(({ heading }) => heading), content.readme.linksHeading];

// projects whose meta lists this technology, e.g. "go" -> ventorygo, kairo
export function usedIn(file: string): string[] {
  return content.projects.items
    .filter((project) =>
      Object.values(project.meta).some((value) =>
        value
          .toLowerCase()
          .split(', ')
          .includes(file),
      ),
    )
    .map((project) => project.id);
}

// flat list of folders and their files, in tree order; used by App.tsx and Stack.tsx
export const stackRows: StackRow[] = content.stack.groups.flatMap(({ folder, files }) => [
  { key: folder, kind: 'folder' as const, folder, files, depth: 0 as const },
  ...files.map((file) => ({ key: file, kind: 'file' as const, folder, file, depth: 1 as const })),
]);
