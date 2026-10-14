# DESIGN.md – Portfolio Mirac Sancak

Vorgabe für alle UI-Arbeiten an der Portfolio-Seite. Bei jeder Komponente gilt: erst hier nachschauen, dann bauen. Was hier nicht steht, wird nicht erfunden, sondern nachgefragt.

## Leitidee

- Terminal-UI im Stil von lazygit, btop und tmux: modern, abgerundet, ruhig.
- Schwarz plus **genau ein** Akzent: Lila.
- Das Terminal-Gefühl entsteht durch **Struktur** (Panes mit Titel im Rahmen, Statusleisten, Mono-Schrift, Schlüssel-Wert-Listen) und nicht durch eine nachgebaute Shell.
- Keine Befehle zum Eintippen, keine Tipp-Animationen, kein Grün.

## Farben

```css
:root {
  /* Flächen */
  --bg: #0A0A0A;            /* Seite und Hintergrund der Pane-Titel */
  --bg-bar: #0E0E0E;        /* tmux-Leiste, Statuszeile */
  --bg-inset: #0D0D0D;      /* Boxen innerhalb von Panes */
  --bg-raised: #111111;     /* Switch, Puffer-Box */
  --bg-tab-active: #1C1C1C;
  --bg-hover: #141414;

  /* Linien */
  --border: #2A2A2A;        /* Pane-Rahmen */
  --border-subtle: #1F1F1F; /* Trenner, Leisten */
  --border-hover: #3C3C3C;
  --border-control: #333333;/* Ghost-Button */

  /* Text */
  --text: #EDEDED;
  --text-muted: #9A9A9A;    /* Fließtext */
  --text-dim: #808080;      /* Labels, Metadaten – Minimum für lesbaren Text */
  --text-deco: #4A4A4A;     /* nur Deko: tree-Linien, ##, Klammern */

  /* Akzent */
  --accent: #8B5CF6;
  --accent-text: #B495F9;   /* Akzent als Schrift auf Schwarz (35 % aufgehellt) */
  --accent-soft: rgba(139, 92, 246, 0.12);
  --accent-selected: rgba(139, 92, 246, 0.14);
  --accent-border: rgba(139, 92, 246, 0.40);
  --accent-focus: rgba(139, 92, 246, 0.55);
  --accent-faint: rgba(139, 92, 246, 0.10);
  --on-accent: #0A0A0A;     /* Text auf Akzentfläche */
}
```

- Lila deckt höchstens 5–10 % der Fläche ab: Rahmentitel-Nummern, Schlüssel, Marker, Buttons, Cursor, das fokussierte Pane.
- Alternative Akzente, falls #8B5CF6 nicht passt: `#7C3AED`, `#A855F7`, `#6366F1`. Es bleibt bei einem Akzent.

## Typografie

- **Eine Schrift:** JetBrains Mono, Schnitte 400, 500 und 700. Möglichst selbst hosten (woff2), sonst Google Fonts.
- UI-Labels werden kleingeschrieben (`projekte`, `sprache`, `in arbeit`). Fließtext und Eigennamen folgen der normalen Schreibung.

| Rolle | Größe | Gewicht | Zeilenhöhe |
|---|---|---|---|
| ASCII-Banner | `clamp(8px, 2.6vw, 21px)` | 400 | 1.05 |
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
- Tabs im Format `0:profil*`, `1:projekte` … Der aktive Tab hat `--bg-tab-active` und `--text`, inaktive Tabs `--text-muted` und beim Hover `#1A1A1A`.
- Rechts der Status: `● werkstudent: offen` (Punkt in `--accent-text`) und `praxissemester: SS 2027`.

### Statuszeile (unten, Footer)

- Aufbau wie in Vim/lualine: `NORMAL` → `main` → `~/mirac/portfolio`, rechts `utf-8 · de · © 2026 Mirac Sancak`.
- Segmente: `NORMAL` mit `--accent`, `--on-accent`, 700; `main` mit `#232323` und Branch-Icon als Strich-SVG.
- Pfeilform per `clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)`. Das zweite Segment bekommt zusätzlich die Einkerbung `10px 50%`.

### Buttons

- Beschriftung `[ label ]`, die Klammern sind `aria-hidden`.
- **Solid:** Hintergrund `--accent`, Text `--on-accent`, 700, Hover `filter: brightness(1.15)`.
- **Ghost:** Rahmen `--border-control`, Hover-Hintergrund `#161616` und Rahmen `#555555`.
- Beide: `min-height: 44px`, `padding: 0 18px`, Radius 10px, 14px.

### ASCII-Banner (Profil, links)

- Schrift „ANSI Shadow“, sechs Zeilen, `white-space: pre`, `overflow: hidden`, `role="img"` mit `aria-label="MIRAC"`.
- Jede Zeile hat eine eigene Farbe, von hell nach Akzent:

```
███╗   ███╗██╗██████╗  █████╗  ██████╗     #D3C1FC
████╗ ████║██║██╔══██╗██╔══██╗██╔════╝     #C5AEFB
██╔████╔██║██║██████╔╝███████║██║          #B79AF9
██║╚██╔╝██║██║██╔══██╗██╔══██║██║          #A986F8
██║ ╚═╝ ██║██║██║  ██║██║  ██║╚██████╗     #9A71F7
╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝     #8B5CF6
```

### neofetch-Block (Profil, rechts)

- Kopfzeile `mirac@esslingen`: Name und Host in `--accent-text` (700), das `@` in `--text-dim`.
- Darunter eine Trennlinie aus `─` in `#3A3A3A`.
- Schlüssel-Wert-Raster `112px | 1fr`: Schlüssel in `--accent-text`, Werte in `--text`.
- Farbpalette mit acht Feldern à 30×16px, im Container mit Radius 8px und `overflow: hidden`.

### Cursor

- **Genau einer**, am Ende der H1: Block `0.6em × 1.05em` in `--accent` mit Glow.
- Blinken: `1.1s steps(1, end) infinite`. Bei `prefers-reduced-motion` aus.

### Projekt-Explorer

- **Liste links:** echte `<button>`s mit `aria-pressed`, Raster `16px | 1fr | auto` (Marker | Name + Typ | Sprache). Die aktive Zeile hat den Marker `▸` in `--accent-text`, Hintergrund `--accent-selected`, Radius 8px, Mindesthöhe 56px. Unten die Zeile `klicken zum öffnen` und rechts die Position `1/4`.
- **Vorschau rechts:** Pfad `~/projects/<name>` in `--text-dim`, darunter Titel, eine Status-Pill (nur bei „in arbeit“), Beschreibung, Schlüssel-Wert-Raster `92px | 1fr`, die Mini-Grafik des Projekts und ein Link-Button.
- **Mini-Grafiken,** jeweils in einer Box mit `--bg-inset`:
  - VentoryGo: Rechnung mit Positionen, Platzhaltern `░░░,░░ €`, Summe in Akzent und `✓ PDF erzeugt`
  - mysh: Flamegraph aus Balken mit abgestufter Akzent-Deckkraft, Beschriftung `stack ↑ · zeit →`
  - Vlanscape: Switch mit 24 Ports in den Farben vlan 10/20/30, darunter ein Patchpanel und eine Legende
  - Kairo: Tagesplan mit einem Fokusblock in Akzent, darunter der Puffer `[██████░░░░░░░░░░] 2 tage`

### tree (Stack)

- Linien (`├──`, `│`, `└──`) in `--text-deco` und `aria-hidden`.
- Ordner in `--accent-text` und 700, Dateien in `#D4D4D4`.
- Abschlusszeile wie beim echten `tree`: `4 verzeichnisse, 11 dateien`.

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

- Lesetext braucht mindestens 4.5:1. Deshalb ist `--text-dim` (#808080) das Minimum, und `#4A4A4A` bzw. `#5A5A5A` sind nur für Deko erlaubt.
- Deko-Zeichen (`├──`, `##`, `[ ]`, `▸`) sind `aria-hidden`.
- Fokus: `outline: 2px solid var(--accent-text); outline-offset: 2px`.
- Interaktives sind echte `<button>`- und `<a>`-Elemente, keine klickbaren `<div>`s.

## Nicht machen

- Befehle zum Eintippen, Fake-Typing, Prompts als Navigation
- Grün, Catppuccin-Pastell, eine zweite Akzentfarbe
- Glow-Wolken hinter dem Hero oder Verlaufsflächen als Hintergrund (das sah nach KI-Template aus)
- Inter oder System-Sans, Emojis, eckige 0px-Rahmen
- Skill-Balken, Prozentangaben oder erfundene Zahlen
- Projekttexte, die mehr behaupten, als das Projekt tatsächlich kann