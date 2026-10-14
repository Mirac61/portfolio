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
    facts: { key: string; value: string }[];
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
  };
  readme: {
    title: string;
    sections: ReadmeSection[];
    linksHeading: string;
  };
}
