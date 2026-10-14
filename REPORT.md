# REPORT.md – Overnight-Redesign

Branch: `redesign-tui` (nicht gepusht, nicht deployed)
Stand: letzter Commit dieses Berichts. Build (`bun run build`), Typecheck und Lint (`bun run lint`) laufen ohne Fehler und Warnungen.

## Commits (ein Commit pro Abschnitt)

| Commit | Abschnitt | Inhalt |
|---|---|---|
| `fix: hide pending TODO values and wire real repo links` | 1 | TODO-Werte unsichtbar, echte Repo-Links |
| `feat: render MIRAC logo from figlet grid in code` | 2 | Logo als Code-Komponente |
| `feat: real project visuals from repo screenshots and stretched master-detail layout` | 3 | echte Visuals, List/Detail gleich hoch |
| `feat: add stack and readme panes side by side with computed tree summary` | 4 | stack + readme nebeneinander |
| `feat: polish interactions, responsive bars, light mode tokens, meta/og and lighthouse fixes` | 5 | Feinschliff, Meta/OG, Lighthouse |
| letzter Commit | 6 | finale Screenshots + dieser Report |

## Was geändert wurde

### 1. TODOs unsichtbar
- `isPending()` in `src/content.ts`: Werte, die mit `TODO` beginnen, bleiben in der Datei, werden aber nie gerendert.
- Betroffen und ausgeblendet: `status`-Zeile aller vier Projekte, Visual-Boxen von mysh und VentoryGo (kein leerer Rahmen).
- GitHub-Profil gesetzt: `https://github.com/Mirac61`.
- Repo-Links der Projekte per `git remote -v` in `~/code/personal/*` ermittelt und pro Projekt in `content.ts` (`repoUrl`) verdrahtet.
- Mail- und LinkedIn-Button bleiben sichtbar (gedimmt, `aria-disabled`), weil die URLs fehlen.

### 2. Logo
- `src/components/NameLogo.tsx`: "MIRAC" als figlet-"ANSI-Regular"-String-Array im Code.
- Jedes `█` wird ein `rect` auf exaktem Raster (1×1 im viewBox), keine Überlappung, `shape-rendering: crispEdges`, kein `opacity`.
- Verlauf zeilenweise als feste Füllfarben über Tokens `--logo-row-1..5` (hell `#c4b5fd` → `--accent` `#8b5cf6`), Light-Mode hat eigene Reihe.
- Layout: links Logo (Spalte `minmax(0, 624px)`), rechts Info-Spalte, gap 48px, oben bündig; Logohöhe (~160px) endet knapp über den Buttons. Mobil: Logo über der Info, 100% Breite.
- Ersetzt das alte, kaum lesbare `public/logo.svg`; dessen Build-Skripte und das C2PA-Manifest wurden ersatzlos entfernt (Signatur wäre durch Farbänderung invalid gewesen).

### 3. Projekte
- Liste und Detail im Grid mit `align-items: stretch`, dadurch gleiche Höhe; Keybinding-Hilfe (`↑/↓ auswählen · enter repo öffnen`) sitzt am Boden der Liste.
- Visuals nur echt:
  - **Vlanscape**: `assets/topology.png` aus dem Repo → `public/media/vlanscape.webp` (cwebp).
  - **Kairo**: `frontend/.shots/cur-week.png` aus dem Repo (Screenshot-Tooling des Repos selbst, Mock-Daten laut Script-Header) → `public/media/kairo.webp`.
  - **mysh / VentoryGo**: `vhs` ist nicht installiert → keine Aufzeichnung. Tapes liegen unter `vhs/` inkl. `vhs/README.md` mit Ablauf; Visual-Boxen ausgeblendet.
- Terminal-Fenster-Box (Titelzeile mit Dateiname, 16:10) bleibt; `object-fit: contain` statt `cover`, damit echte Screenshots nicht beschnitten werden.
- A11y-Muster gewechselt: `listbox`/`option` statt `tablist`/`tab` (axe verlangt exakte Kind-Rollen); Pfeiltasten, Enter und sichtbarer Fokus bleiben.

### 4. Stack + README
- Nebeneinander im Grid (`minmax(280px, 2fr) / minmax(0, 3fr)`), `align-items: stretch` → gleiche Höhe; mobil gestapelt.
- Tree exakt mit den vorgegebenen Einträgen; Zählzeile wird berechnet (`4 verzeichnisse, 14 dateien`), nicht hardcodet.
- README enthält exakt den freigegebenen Text (Lead + `## was ich suche` mit zwei Listenpunkten), Stil wie bisher.

### 5. Feinschliff
- Übergänge überall über Token `--dur: 140ms`; globale `prefers-reduced-motion`-Regel kappt Animationen/Transitions; Videos pausieren bei reduced motion.
- Fokus-Logik zentral in `App.tsx`: IntersectionObserver bestimmt das Pane im Viewport → Akzent-Rahmen + aktiver Tab folgen beim Scrollen.
- Gleiche Abstände: überflüssiger Extra-Margin am Projekte-Pane entfernt, Container-Gap einheitlich 16px.
- 390px: nichts läuft über; tmux-Tabs scrollen horizontal (Scrollbar versteckt); Status oben rechts (`werkstudent/praxis`) entfällt unter 640px (Inhalt steht im Profil/README); Statuszeile unten zeigt unter 480px nur `NORMAL` + Branch + Theme-Toggle.
- Light Mode: eigene Tokens sauber gepflegt (inkl. Logo-Reihen, Pending-Buttons), Toggle `[ light ] / [ dark ]` in der Statuszeile wieder aktiv, Wahl persistiert in `localStorage`. Start ist bewusst immer dark (Terminal-Identität), Light ist eine explizite Wahl.
- `index.html`: `<title>`, meta description, Open-Graph-Tags, Favicon `public/favicon.svg` (█-M-Motiv), Font-Preloads (4 woff2, `crossorigin`).
- OG-Bild `public/og.png` (1200×630) wird über `/?og=1` gerendert (`.og-frame` zeigt nur das Profil-Pane) und per `scripts/og-shot.mjs` erzeugt.
- Lighthouse (Preview-Build, Playwright-Chromium): **Performance 98, Accessibility 100, Best Practices 100, SEO 100**. Dafür behoben: robots.txt ergänzt, `--text-muted` auf kontrastreichere Werte gesetzt (dark `#808080`, light `#6b6b6b`), Typ-Label in aktiver Listenzeile aufgehellt, ARIA-Rollen korrigiert. Die neue Kategorie "agentic-browsing" (50) gehört nicht zu den vier Kernwerten.

### 6. Abschluss
- Finale Screenshots in `shots/final/`: `desktop.png`, `mobile.png`, `project-ventorygo.png`, `project-mysh.png`, `project-vlanscape.png`, `project-kairo.png`.
- Light-Mode-Shots: `shots/s5-light-desktop.png`, `shots/s5-light-mobile.png`.
- Lighthouse-JSON: `shots/lighthouse.json`.

## Entscheidungen (Dokumentation)

1. **Dark als Start-Theme**, obwohl `prefers-color-scheme` existiert: Playwright emuliert standardmäßig light, und die TUI-Identität der Seite ist dark. Light bleibt per Toggle + `localStorage` erreichbar.
2. **Kein `use`-Präfix vs. Linter**: oxlint erzwingt `use*` für Funktionen mit Hooks. Gelöst, indem die Theme-Logik als reine Funktionen (`initialTheme`, `applyTheme`, `nextTheme`) in `src/theme.ts` liegt und der State in der Komponente `App` lebt – ganz ohne eigenen Hook.
3. **Kairo-Visual mit Mock-Daten**: Das Repo-eigene Shot-Script erzeugt UI-Screenshots mit Mock-Daten. Das Bild ist echte App-UI (kein nachgebautes Fake-Visual), die Daten sind jedoch Beispieldaten des Repos. Bewusst so übernommen und hier transparent gemacht.
4. **Keine vhs-Installation über Nacht**: `vhs` fehlte; System-Tools ohne Rücksprache installieren war mir zu riskant. Tapes + Anleitung liegen bereit, Boxen sind ausgeblendet.
5. **Repos nur gelesen**: Für Remotes und Screenshots wurde in `~/code/personal/*` nichts verändert oder committet; Screenshots wurden kopiert und konvertiert.
6. **Statuszeile sticky behalten**: Der Balken mitten im Full-Page-Screenshot ist ein Stitching-Artefakt von `--full-page` + `position: sticky`. Im echten Viewport sitzt die Zeile unten; `padding-bottom` am Main verhindert verdeckten Inhalt am Scroll-Ende.
7. **`object-fit: contain`** für Visuals: Kairo-Screenshot ist 16:9, Box 16:10 – `cover` hätte UI-Ränder beschnitten.
8. **Bun statt npm/npx** für alle Kommandos (`bun run …`, `bunx playwright …`); `bunx lighthouse` lädt ephemeral und ändert keine Projekt-Dependencies.

## Was ausgeblendet ist (pending TODOs in `src/content.ts`)

- `profile.links.mail.href` – echte Mail-Adresse fehlt (Button sichtbar, gedimmt)
- `profile.links.linkedin.href` – echte LinkedIn-URL fehlt (Button sichtbar, gedimmt)
- `status` aller vier Projekte (`TODO: Projektstatus eintragen`)
- `visual.src` von mysh und VentoryGo (`TODO`) – Boxen unsichtbar

## Was du noch liefern / ausführen musst

1. **Mail-Adresse** und **LinkedIn-URL** → in `src/content.ts` unter `profile.links`.
2. **Projektstatus** (z. B. "aktiv", "archiviert") für alle vier Projekte → `content.ts` → `projects.items[].status`.
3. **Optional Terminal-Videos**: `vhs` installieren (`brew install vhs`), dann laut `vhs/README.md` die Tapes ausführen (mysh-Shell-Session; VentoryGo mit laufendem Server). Ausgabe nach `public/media/*.webm` legen und in `content.ts` bei `visual.src` eintragen (`type: 'terminal'` ist bereits unterstützt).
4. **Optional**: Kairo-Visual neu schießen, falls du echte Daten statt der Repo-Mock-Daten zeigen willst (`pnpm shot` im Kairo-Frontend), dann `public/media/kairo.webp` ersetzen.

## Skripte

| Befehl | Zweck |
|---|---|
| `bun run dev` / `bun run preview` | Dev-Server / Production-Preview |
| `bun scripts/project-shots.mjs <ordner>` | Full-Page-Shots mit je ausgewähltem Projekt |
| `bun scripts/light-shot.mjs` | Light-Mode-Shots (Desktop + Mobile) |
| `bun scripts/og-shot.mjs` | erzeugt `public/og.png` (1200×630) |
| `bun scripts/peek.mjs <selector> <out>` | Viewport-Shot eines Bereichs (gegen Sticky-Stitching-Artefakt) |
