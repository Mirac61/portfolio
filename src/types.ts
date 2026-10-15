// Form der Inhalte in content.ts. Hier muss man nur ran, wenn ein neues Feld dazukommt.

export interface Link {
  label: string;
  // leer lassen = Link wird nicht angezeigt
  href: string;
}

export interface Project {
  // kurzer Name: Liste links, Pfad oben im Rahmen und Ordnername für scripts/git-stats.mjs
  id: string;
  title: string;
  type: string;
  // z.B. 'in arbeit', leer = keine Markierung
  status: string;
  desc: string;
  meta: Record<string, string>;
  repoUrl: string;
  // Bild (.webp/.png/.jpg) oder Video (.mp4) aus public/media, weglassen = kein Bild
  media?: {
    src: string;
    label: string;
    // Standbild für Videos, wird bei "weniger Bewegung" statt des Videos gezeigt
    poster?: string;
    // Optionales Light-Mode-Pendant; wird angezeigt, wenn das Portfolio im Light Mode läuft
    srcLight?: string;
  };
}

export interface ReadmeSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Content {
  session: string;
  footer: {
    mode: string;
    branch: string;
    meta: string;
  };
  profile: {
    title: string;
    host: string;
    status: string;
    headline: string;
    // eine Zeile unter der Headline; facts werden als 2-Spalten-Grid gezeigt, sub optional
    subline: string;
    facts: { key: string; value: string; sub?: string }[];
    links: Link[];
  };
  projects: {
    title: string;
    repoLabel: string;
    items: Project[];
  };
  stack: {
    title: string;
    groups: { folder: string; files: string[] }[];
    // desc = Zeile im ls-Listing; did/likes = Absätze in der Detailansicht einer Datei.
    // Das ASCII-Logo kommt aus src/images/<name>_logo.txt
    info: Record<string, { desc: string; did?: string; likes?: string }>;
  };
  readme: {
    title: string;
    sections: ReadmeSection[];
    linksHeading: string;
  };
}

export type StackRow =
  | { key: string; kind: 'folder'; folder: string; files: string[]; depth: 0 }
  | { key: string; kind: 'file'; folder: string; file: string; depth: 1 };
