# mirac@esslingen ~ portfolio

Meine Portfolio-Seite, aufgebaut wie eine Terminal-Sitzung mit tmux. Profil, Projekte, Stack und Readme sind eigene Fenster und lassen sich komplett per Tastatur bedienen.

<p align="center">
  <img src="docs/screenshot.png" alt="Screenshot der Portfolio-Seite" width="900">
</p>

React 19, TypeScript und Vite. Es gibt keine UI-Bibliothek, das Styling steckt vollständig in `src/App.css`.

## Lokal starten

Vorausgesetzt werden Node.js 22 und pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # Typecheck und Build nach dist/
pnpm lint
```

| Skript | Zweck |
|---|---|
| `pnpm og` | erzeugt das Vorschaubild `public/og.png`, der Dev-Server muss laufen |
| `pnpm shots <ordner>` | Screenshots aller Fenster in Hell und Dunkel, Desktop und Mobil |
| `pnpm logos` | erzeugt die ASCII-Logos im Stack neu, siehe [docs/ascii-art.md](docs/ascii-art.md) |

## Inhalte

Sämtliche Texte stehen in `src/content.ts`. Für inhaltliche Änderungen muss keine andere Datei angefasst werden.

| Bereich | Schlüssel |
|---|---|
| Überschrift, Fakten, Links | `profile` |
| Projekte | `projects.items` |
| Stack-Einträge und ihre Texte | `stack` |
| Readme-Fenster | `readme.sections` |
| Statuszeile | `footer` |

Ein leerer String blendet das jeweilige Feld aus. Projektbilder liegen in `public/media/`, am besten als `.webp` im Format 16:10.

## Bedienung

| Taste | Aktion |
|---|---|
| `1` bis `4` | Fenster wechseln |
| `j` / `k`, `↓` / `↑` | navigieren |
| `l` / `→` / `Enter` | im Stack einen Ordner oder Eintrag öffnen |
| `h` / `←` / `Esc` | eine Ebene zurück |

Das Farbschema folgt der Systemeinstellung.

## Aufbau

```
src/
├── content.ts      alle Texte
├── types.ts        Form der Inhalte
├── App.tsx         Fenster, Tastenkürzel, Layout
├── App.css         Farben, Abstände, Responsive
├── components/     ein Fenster pro Datei
└── images/         ASCII-Logos für den Stack
```

Farben und Typografie sind in [DESIGN.md](DESIGN.md) festgehalten.
