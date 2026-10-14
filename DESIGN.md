# DESIGN.md – Portfolio Mirac Sancak

Vorgabe für alle UI-Arbeiten an der Portfolio-Seite. Bei jeder Komponente gilt: erst hier nachschauen, dann bauen. Was hier nicht steht, wird nicht erfunden, sondern nachgefragt.

## Leitidee

- Terminal-UI im Stil von lazygit, btop und tmux: modern, abgerundet, ruhig.
- Dunkles Anthrazit plus **genau ein** Akzent: Lila.
- Das Terminal-Gefühl entsteht durch **Struktur** (Panes mit Titel im Rahmen, Statusleisten, Mono-Schrift, Schlüssel-Wert-Listen) und nicht durch eine nachgebaute Shell.
- Keine Befehle zum Eintippen und kein Grün. Die Headline darf sich ein- und ausschreiben, sonst keine Tipp-Animationen.

## Farben

Die gültigen Werte für Dunkel und Hell stehen nur in `src/App.css` unter „Tokens“, damit es keine zweite Liste gibt, die veraltet.

- Palette „Mitternacht“ (Vergleich aller Varianten in `docs/farben.html`). Kein reines Schwarz und kein reines Weiß, die Grautöne bleiben neutral, Lila gibt es nur am Akzent.
- Dunkel: Seite `#0B0B0D`, Text `#ECECEF`, Akzent Lavendel `#A78BFA`.
- Hell: Seite `#F1F1F3`, Text `#18181B`, Akzent `#7C3AED`.
- Boxen (Panes) haben die Seitenfarbe. Erkennbar sind sie über einen deutlichen Rahmen (`--border`, etwa 1,8:1 zur Seite in beiden Modi).
- Der Wechsel zwischen Dunkel und Hell blendet über eine View Transition weich über, bei „weniger Bewegung“ springt er direkt um.
- Lila deckt höchstens 5–10 % der Fläche ab: Rahmentitel-Nummern, Schlüssel, Marker, Buttons, Cursor, das fokussierte Pane.
- Alternative Akzente, falls #8B5CF6 nicht passt: `#7C3AED`, `#A855F7`, `#6366F1`. Es bleibt bei einem Akzent.

## Typografie

- **Eine Schrift:** JetBrains Mono, Schnitte 400, 500 und 700. Möglichst selbst hosten (woff2), sonst Google Fonts.
- UI-Labels werden kleingeschrieben (`projekte`, `sprache`, `in arbeit`). Fließtext und Eigennamen folgen der normalen Schreibung.

| Rolle | Größe | Gewicht | Zeilenhöhe |
|---|---|---|---|
| Logo-Banner (SVG) | `min(60cqi, 72vh, 720px)` breit | – | – |
| Kontakt-Display | `clamp(30px, 4.6vw, 58px)`, Laufweite −0.03em | 700 | 1.05 |
| Projekttitel (Vorschau) | `clamp(22px, 2.4vw, 30px)`, Laufweite −0.02em | 700 | 1.2 |
| H1 (Profil) | `clamp(19px, 2.1vw, 26px)` | 700 | 1.35 |
| README-Lead | `clamp(17px, 1.7vw, 21px)` | 400 | 1.6 |
| README-Überschrift | 17px | 700 | – |
| Fließtext | 14.5–15px | 400 | 1.75 |
| UI, Schlüssel-Wert | 13.5–14px | 400 | 1.6–1.95 |
| Labels, Meta, Pane-Titel | 12–13px | 400/500 | – |

## Radien

| Element | Radius |
|---|---|
| Pane | 16px |
| Box in einem Pane, Button | 10px |
| Listenzeile, Status-Pill, Kalenderblock, Farbpalette | 8px |
| Ports, Flamegraph-Balken | 3px |

Keine eckigen 0px-Rahmen.

## Abstände und Raster

- Seiten-Gutter: `clamp(16px, 3vw, 32px)`, Inhalt maximal `1320px` breit.
- Abstand zwischen Panes: 32px vertikal, 18px horizontal. Vertikal mehr, weil der Pane-Titel 10px über den Rahmen ragt.
- Pane-Innenabstand: oben 28–40px, seitlich `clamp(16px, 3vw, 40px)`.
- Klickbare Elemente mindestens 44px hoch.

## Komponenten

### Pane

```css
.pane {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: border-color .2s ease;
}
.pane:hover { border-color: var(--border-hover); }

.pane-title {             /* sitzt im Rahmen */
  position: absolute;
  top: -10px;
  left: 22px;
  padding: 0 8px;
  background: var(--bg);
  font-size: 13px;
  line-height: 18px;
}
```

- Titelformat: `[n] name`, wobei `[n]` in `--accent-text` steht. Ein optionaler Zähler `(4)` steht in `--text-dim`.
- **Genau ein** fokussiertes Pane (die Projektliste): Rahmen `--accent-focus` plus `box-shadow: 0 0 36px var(--accent-faint)`.

### tmux-Leiste (oben, Navigation)

- Hintergrund `--bg-bar`, unten `1px solid --border-subtle`, 13px, Höhe 44px.
- Ganz links der Session-Block `mirac` mit Hintergrund `--accent`, Text `--on-accent`, 700.
- Tabs im Format `1:profil*`, `2:projekte` … Der aktive Tab hat `--bg-tab-active` und `--text`, inaktive Tabs `--text-muted` und beim Hover `#1A1A1A`.
- Rechts der Status: `● werkstudent: offen` (Punkt in `--accent-text`) und `praxissemester: SS 2027`.

### Statuszeile (unten, Footer)

- Aufbau wie in Vim/lualine: `NORMAL` → `main` → `~/mirac/portfolio`, rechts `utf-8 · de · © 2026 Mirac Sancak`.
- Segmente: `NORMAL` mit `--accent`, `--on-accent`, 700; `main` mit `#232323` und Branch-Icon als Strich-SVG.
- Pfeilform per `clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)`. Das zweite Segment bekommt zusätzlich die Einkerbung `10px 50%`.

### Buttons

- Beschriftung ohne Klammern, nur der nackte Label-Text.
- **Solid:** Hintergrund `--accent`, Text `--on-accent`, 700, Hover `filter: brightness(1.15)`.
- **Ghost:** Rahmen `--border-control`, Hover-Hintergrund `#161616` und Rahmen `#555555`.
- Beide: `min-height: 44px`, `padding: 0 18px`, Radius 10px, 14px.

### Logo-Banner (Profil, links)

- „MIRAC" als Pixelraster aus `mirac-github.svg`, gezeichnet als `<rect>` auf einem 720 × 192 Raster (`shape-rendering: crispEdges`), `role="img"` mit `aria-label="MIRAC"`.
- Die Füllung kommt aus CSS (`fill: var(--accent)`), damit das Logo dem Umschalten Dunkel/Hell folgt und nicht der Betriebssystem-Einstellung. Die Helligkeitsstufen der Zellen (Deckkraft 0,6–1) bleiben erhalten.
- Breite `min(60cqi, 72vh, 720px)`, Höhe automatisch.

### Profil-Aufbau (Haupt-Pane)

- Reihenfolge: Logo-Banner → Headline → Subline (sans, `--text-muted`) → Link-Buttons → Trennlinie (`--border-subtle`) → Fakten-Grid.
- Fakten-Grid zweispaltig (einspaltig unter 440px Containerbreite): je Fakt Label (12px, `--text-dim`), Wert (16px, 500, `--text`), optional Sub (sans, 14px, `--text-muted`).
- Die Sidebar behält die Kopfzeile `mirac@esslingen` (Name/Host fett, `@` in `--text-dim`) und die Statuszeile.

### Headline (Profil)

- Die H1 schreibt sich Zeichen für Zeichen ein (Fade über `opacity` und leichten `blur`), bleibt kurz stehen und blendet sich rückwärts wieder aus – in Schleife.
- Jedes Zeichen behält seinen Platz, es ändert sich nur die Deckkraft. Dadurch springt nichts, und der Satz bleibt für Screenreader vollständig (`aria-label` am `<h1>`, die sichtbaren Zeichen `aria-hidden`).
- Bei `prefers-reduced-motion` und im og-Bild (`?og`) steht der fertige Satz still.

### Cursor

- **Genau einer**, an der Schreibkante der Headline: Block `0.6em × 1.1em` in `--accent`, `margin-left: 0.25em`.
- Blinken: `1.1s steps(1, end) infinite`. Bei `prefers-reduced-motion` aus.

### Projekt-Explorer

- **Liste links:** echte `<button>`s mit `aria-pressed`, Raster `16px | 1fr | auto` (Marker | Name + Typ | Sprache). Die aktive Zeile hat den Marker `▸` in `--accent-text`, Hintergrund `--accent-selected`, Radius 8px, Mindesthöhe 56px. Unten die Zeile `klicken zum öffnen` und rechts die Position `1/4`.
- **Vorschau rechts:** Pfad `~/projects/<name>` in `--text-dim`, darunter Titel, eine Status-Pill (nur bei „in arbeit“), Beschreibung, Schlüssel-Wert-Raster `92px | 1fr`, die Mini-Grafik des Projekts und ein Link-Button.
- **Mini-Grafiken,** jeweils in einer Box mit `--bg-inset`:
  - VentoryGo: Rechnung mit Positionen, Platzhaltern `░░░,░░ €`, Summe in Akzent und `✓ PDF erzeugt`
  - mysh: Flamegraph aus Balken mit abgestufter Akzent-Deckkraft, Beschriftung `stack ↑ · zeit →`
  - Vlanscape: Switch mit 24 Ports in den Farben vlan 10/20/30, darunter ein Patchpanel und eine Legende
  - Kairo: Tagesplan mit einem Fokusblock in Akzent, darunter der Puffer `[██████░░░░░░░░░░] 2 tage`

### Stack (Fenster) – Verzeichnis-Metapher mit drei Ebenen

- Ebene 0 **Verzeichnisse:** Sidebar-Liste (eine Zeile pro Ordner, `name/` + Dateizahl) trägt den Cursor; `j`/`k` iteriert nur die Verzeichnisse (an den Enden Wechsel ins Nachbarfenster), das Haupt-Pane zeigt dazu `ls ~/stack/<ordner>`.
- Ebene 1 **Dateien:** `→`/`l`/`Enter` oder Sidebar-Klick öffnen den Ordner; `j`/`k` iteriert jetzt nur die Dateien dieses Ordners (Enden stoppen), die Cursor-Zeile ist markiert.
- Ebene 2 **Detail:** `→`/`l`/`Enter` bzw. Klick auf eine Listing-Zeile = `cd` in die Datei. Breadcrumb `$ cd <file> · ~/stack/…` + Button `cd ..`, tmux-Tab wird zu `3:stack/<file>`, Pane-Titel zum vollen Pfad. `j`/`k` blättern live durch die Dateien des Ordners.
- Zurück eine Ebene: `←`/`h`/`Esc` (bzw. Button `cd ..`): Detail → Listing → Verzeichnisse.
- Listing-Zeilen: Name (mono, fett), Beschreibung (sans, muted), rechts `# projektname` oder `↵`; Cursor-Zeile in `--accent-selected`. Unter jeder Ansicht steht eine Hinweiszeile mit den Keys der Ebene.
- Die Detailansicht ist ein Platzhalter-Slot (gestrichelter Rahmen, `--bg-inset`, Radius 12px, Label `detail-ansicht`); interim zeigt er Text + ASCII-Grafik, später füllt Mirac ihn selbst.

### README (Über mich)

- Überschriften: `## ` in `#5A5A5A` (`aria-hidden`), der Text in `--accent-text`, 17px, 700.
- Listen mit `- ` in `--accent-text` als Aufzählungszeichen.

## Effekte

- **Phosphor-Glow** nur auf Akzent-Schrift, nie auf Fließtext: `text-shadow: 0 0 14px rgba(139, 92, 246, 0.5)`.
- **Scanlines** (optional) als Overlay über der ganzen Seite mit `pointer-events: none`:
  `repeating-linear-gradient(180deg, rgba(255,255,255,.022) 0 1px, transparent 1px 3px)`.
- Übergänge kurz halten (0.15–0.2s) und nur Farbe und Rahmen animieren.

## Responsive

- Die Panes liegen in einem `flex-wrap`-Container mit diesen Basisbreiten:
  - Profil und Kontakt: 100 %
  - Projekte: 380px
  - Vorschau: 520px, `flex-grow: 1.6`
  - Stack: 300px
  - README: 480px, `flex-grow: 2`
- Unter etwa 900px stapelt sich alles von selbst. tmux-Leiste und Statuszeile umbrechen, statt horizontal zu scrollen.
- Das Banner skaliert über `vw` und schneidet notfalls ab.

## Barrierefreiheit

- Lesetext braucht mindestens 4.5:1. Deshalb ist `--text-dim` das Minimum (5,5:1 auf der Seitenfläche in beiden Modi), `--text-deco` und `--text-hash` sind nur für Deko erlaubt.
- Deko-Zeichen (`├──`, `##`, `[ ]`, `▸`) sind `aria-hidden`.
- Fokus: `outline: 2px solid var(--accent-text); outline-offset: 2px`.
- Interaktives sind echte `<button>`- und `<a>`-Elemente, keine klickbaren `<div>`s.

## Nicht machen

- Echte Shell-Befehle zum Eintippen oder Prompts als Navigation. Einzige Ausnahme: die Headline schreibt sich ein und aus (siehe oben).
- Grün, Catppuccin-Pastell, eine zweite Akzentfarbe
- Glow-Wolken hinter dem Hero oder Verlaufsflächen als Hintergrund (das sah nach KI-Template aus)
- Inter oder System-Sans, Emojis, eckige 0px-Rahmen
- Skill-Balken, Prozentangaben oder erfundene Zahlen
- Projekttexte, die mehr behaupten, als das Projekt tatsächlich kann