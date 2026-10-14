import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'ventorygo',
    name: 'ventorygo',
    title: 'VentoryGo',
    type: 'rechnungsgenerator',
    lang: 'go',
    path: '~/projects/ventorygo',
    desc: 'Kommandozeilen-Tool zum Erzeugen von PDF-Rechnungen aus einer Artikel- und Kundenliste. Liest JSON, füllt Positionen mit Platzhaltern und erzeugt ein fertiges Dokument.',
    status: 'in arbeit',
    meta: {
      sprache: 'Go',
      tooling: 'cobra, gofpdf',
      status: 'mvp fertig',
    },
  },
  {
    id: 'mysh',
    name: 'mysh',
    title: 'mysh',
    type: 'shell-profiler',
    lang: 'c',
    path: '~/projects/mysh',
    desc: 'Minimaler Kommandozeilen-Profiler für die eigene Shell. Misst Startzeiten einzelner Funktionen und zeigt sie als interaktiven Flamegraph an.',
    status: 'prototyp',
    meta: {
      sprache: 'C',
      tooling: 'posix, gnuplot',
      status: 'prototyp',
    },
  },
  {
    id: 'vlanscape',
    name: 'vlanscape',
    title: 'Vlanscape',
    type: 'netzwerk-visualisierung',
    lang: 'python',
    path: '~/projects/vlanscape',
    desc: 'Kleines Dashboard, das Switch-Ports nach VLANs einfärbt und ein Patchpanel darstellt. Hilft beim Nachvollziehen von Netzwerksegmenten in Laboraufbauten.',
    status: 'in arbeit',
    meta: {
      sprache: 'Python',
      tooling: 'flask, jinja2',
      status: 'in arbeit',
    },
  },
  {
    id: 'kairo',
    name: 'kairo',
    title: 'Kairo',
    type: 'tagesplaner',
    lang: 'typescript',
    path: '~/projects/kairo',
    desc: 'Tagesplaner für Fokus-Blöcke. Ein Block wird markiert, der Rest des Tages wird als Puffer angezeigt. Keine Feature-Überflutung, nur Planung.',
    status: 'prototyp',
    meta: {
      sprache: 'TypeScript',
      tooling: 'react, vite',
      status: 'prototyp',
    },
  },
];
