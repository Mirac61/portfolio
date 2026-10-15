// Alle Texte der Seite. Nur diese Datei anfassen, um Inhalte zu ändern.
// Leere Strings ('') werden nicht angezeigt. Bilder liegen in public/media.
import type { Content, StackRow } from './types';

// ASCII-Logos: src/images/<name>_logo.txt, z.B. "spring boot" -> spring_boot_logo.txt.
// go ist von Hand gemacht, die übrigen erzeugt scripts/ascii-logos.mjs.
const logoFiles = import.meta.glob<string>('./images/*_logo.txt', { query: '?raw', import: 'default', eager: true });

export function stackArt(name: string): string[] | undefined {
  const art = logoFiles[`./images/${name.replace(/[^a-z0-9]+/g, '_')}_logo.txt`];
  return art ? art.replace(/\s+$/, '').split(/\r?\n/) : undefined;
}

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
          frontend: 'React',
          backend: 'Go · Gin',
          datenbank: 'PostgreSQL',
          pdf: 'Maroto v2',
          infra: 'Docker, GitHub Actions',
          team: '2 Personen',
        },
        repoUrl: 'https://github.com/Mirac61/VentoryGo',
        media: { src: '/media/ventorygo.webp', label: 'screenshot' },
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
        media: { src: '/media/kairo-dark.webp', srcLight: '/media/kairo-light.webp', label: 'screenshot' },
      },
      {
        id: 'activitytracker',
        title: 'Activity Tracker',
        type: 'android + spring-boot',
        status: '',
        desc: 'Offline-first Activity Tracker aus einem sechsköpfigen Uni-Teamprojekt. Der Android-Client in Kotlin speichert Einträge lokal und synchronisiert sie per WorkManager mit einer Spring-Boot-API. Authentifizierung läuft über Keycloak, Releases werden per GitHub Actions signiert. Mein Fokus lag auf dem Offline-Sync, der Statistik-Ansicht und dem Release-Workflow.',
        meta: {
          backend: 'Spring Boot · Keycloak',
          client: 'Kotlin · Android',
          datenbank: 'PostgreSQL · SQLite',
          sync: 'WorkManager',
          infra: 'Docker · GitHub Actions',
          team: '6 Personen',
        },
        repoUrl: 'https://github.com/Mirac61/activitytracker',
        media: { src: '/media/activitytracker-dark.webp', srcLight: '/media/activitytracker-light.webp', label: 'mockup' },
      },
      {
        id: 'yawntest',
        title: 'yawntest',
        type: 'go-test-generator',
        status: '',
        desc: 'Kommandozeilen-Tool in Go, das aus bestehendem Quellcode automatisch Tests generiert. Es erkennt HTTP-Handler, JSON-Structs, reine Funktionen und Validatoren und prüft, was unabhängig von der Geschäftslogik sicher gelten muss: keine Panics, 5xx nur bei echten Serverfehlern, JSON überlebt einen Round-Trip, gleiche Eingaben liefern gleiche Ausgaben. Offline, deterministisch und ausschließlich mit der Go-Standardbibliothek.',
        meta: {
          sprache: 'Go',
          testing: 'generierte Unit-Tests',
          checks: 'panic · 5xx · JSON round-trip · idempotenz · split-sum',
          infra: 'GitHub Actions',
        },
        repoUrl: 'https://github.com/Mirac61/yawntest',
        media: { src: '/media/yawntest.webp', label: 'screenshot' },
      },
    ],
  },

  // 2: Stack als Verzeichnis: Sidebar = Ordner, Haupt-Pane = `ls`-Listing des
  // Ordners. Enter oder Klick auf eine Datei = `cd` hinein (Detailansicht mit
  // ASCII-Logo und Text), esc oder cd .. zurück. Ein Eintrag, der in den
  // meta-Werten eines Projekts vorkommt, bekommt "# projektname" dahinter.
  stack: {
    title: 'stack',
    groups: [
      { folder: 'sprachen', files: ['go', 'java', 'kotlin', 'c++'] },
      { folder: 'backend', files: ['gin', 'spring boot', 'postgresql', 'sqlite', 'keycloak'] },
      { folder: 'infra', files: ['docker', 'ci/cd'] },
      { folder: 'tools', files: ['neovim', 'tmux', 'ghostty', 'yazi'] },
    ],
    info: {
      sprachen: { desc: 'Programmiersprachen, mit denen ich täglich arbeite.' },
      backend: { desc: 'Server, Datenbanken und Anmeldung.' },
      infra: { desc: 'Bauen, testen und ausliefern.' },
      tools: { desc: 'Mein Terminal-Alltag.' },

      // desc = eine Zeile fürs ls-Listing, did/likes = Text in der Detailansicht
      go: {
        desc: 'Meine Hauptsprache im Backend.',
        did: 'Das Backend von VentoryGo mit Gin und PostgreSQL, Kairo mit SQLite und yawntest, ein Tool, das aus Go-Code automatisch Tests erzeugt. Go habe ich mir selbst beigebracht.',
        likes: 'Wenig Magie, schnelle Builds und eine Standardbibliothek, mit der man ohne Abhängigkeiten weit kommt. Fehler sind normale Rückgabewerte und damit immer sichtbar.',
      },
      java: {
        desc: 'Aus dem Studium und für Spring-Boot-Dienste.',
        did: 'Die Grundlagen der Objektorientierung im Studium und die Spring-Boot-API im Activity Tracker.',
        likes: 'Das ausgereifte Ökosystem und eine Typisierung, die auch in großen Codebasen den Überblick hält.',
      },
      kotlin: {
        desc: 'Moderne JVM-Sprache, wenn Java zu ausführlich wird.',
        did: 'Den Android-Client des Activity Trackers, inklusive Offline-Sync über WorkManager und der Statistik-Ansicht.',
        likes: 'Null-Sicherheit im Typsystem, Data Classes und Coroutines statt verschachtelter Callbacks.',
      },
      'c++': {
        desc: 'Systemnah: Pipes, Prozesse und Speicher selbst verwalten.',
        did: 'mysh, eine eigene Unix-Shell mit Pipes, Umleitungen, Aliasen und Tab-Vervollständigung. Startzeit mit hyperfine gemessen, Speicher mit Valgrind geprüft.',
        likes: 'Man sieht genau, was das Betriebssystem tut: fork, exec, Dateideskriptoren. Nichts passiert hinter dem Rücken.',
      },

      gin: {
        desc: 'Schlanker HTTP-Router für Go, ohne viel Magie.',
        did: 'Die REST-API von VentoryGo: Routing, Middleware für Sessions und Mandantentrennung.',
        likes: 'Schnell eingerichtet und nah an net/http. Middleware bleibt einfache Go-Funktionen.',
      },
      'spring boot': {
        desc: 'Für größere Java-Dienste mit DI, REST und Sicherheit.',
        did: 'Die Sync-API des Activity Trackers mit Keycloak-Anbindung, im Team mit sechs Personen.',
        likes: 'Für vieles gibt es einen erprobten Weg. Dependency Injection und Spring Security nehmen einem viel Boilerplate ab.',
      },
      postgresql: {
        desc: 'Relationale Datenbank mit Transaktionen und sauberem SQL.',
        did: 'Die Datenbank hinter VentoryGo, unter anderem für lückenlose Rechnungsnummern pro Nutzer und Jahr, und der Server-Speicher im Activity Tracker.',
        likes: 'Transaktionen und Constraints, auf die man sich verlassen kann. Viele Regeln lassen sich direkt im Schema absichern.',
      },
      sqlite: {
        desc: 'Dateibasierte Datenbank für lokale Tools und kleine Dienste.',
        did: 'Der lokale Speicher von Kairo und der Offline-Speicher auf dem Android-Client des Activity Trackers.',
        likes: 'Eine Datei, kein Server, trotzdem echtes SQL. Ideal für Anwendungen, die ohne Cloud auskommen sollen.',
      },
      keycloak: {
        desc: 'Identity-Provider für Login, Rollen und SSO.',
        did: 'Login und Rollen für den Activity Tracker, angebunden an die Spring-Boot-API.',
        likes: 'Authentifizierung muss man nicht selbst bauen. OAuth2 und OpenID Connect laufen nach Standard.',
      },

      docker: {
        desc: 'Container für reproduzierbare Builds und Läufe.',
        did: 'Entwicklungs- und Deploy-Umgebungen für VentoryGo und den Activity Tracker, mit Datenbank per Compose.',
        likes: 'Ein Befehl und die komplette Umgebung läuft, auf jedem Rechner gleich.',
      },
      'ci/cd': {
        desc: 'GitHub Actions: Build, Tests und Deploy automatisch.',
        did: 'Pipelines für Build und Tests in VentoryGo und yawntest sowie signierte Android-Releases im Activity Tracker.',
        likes: 'Fehler fallen beim Push auf und nicht erst beim Release.',
      },

      neovim: {
        desc: 'Mein Editor: LSP, Suche und alles über Tastenkürzel.',
        did: 'Meine eigene Konfiguration mit LSP für Go, Java und C++, Fuzzy-Suche und Git-Integration.',
        likes: 'Die Hände bleiben auf der Tastatur und der Editor passt sich mir an, nicht umgekehrt.',
      },
      tmux: {
        desc: 'Sitzungen und Fenster, die einen SSH-Abbruch überleben.',
        did: 'Eine Sitzung pro Projekt mit Editor, Server und Logs nebeneinander. Diese Seite ist danach gestaltet.',
        likes: 'Man kann eine Sitzung verlassen und später genau dort weitermachen, wo man aufgehört hat.',
      },
      ghostty: {
        desc: 'Schnelles Terminal mit GPU-Rendering.',
        did: 'Mein tägliches Terminal, eingerichtet mit JetBrains Mono und einem dunklen Theme.',
        likes: 'Schnell, schlicht und mit sinnvollen Standardeinstellungen.',
      },
      yazi: {
        desc: 'Dateimanager für schnelles Navigieren im Terminal.',
        did: 'Zum Durchsuchen von Projekten und Logs, ohne das Terminal zu verlassen.',
        likes: 'Vorschau für Dateien und Bilder direkt im Terminal und Vim-Tastenkürzel.',
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
          .split(/\s*[,·]\s*/)
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
