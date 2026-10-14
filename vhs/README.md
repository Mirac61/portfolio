# VHS-Tapes

Terminal-Aufzeichnungen für die Projekt-Visuals, erzeugt mit
[charmbracelet/vhs](https://github.com/charmbracelet/vhs).

## Ausführen

Voraussetzung: `vhs` installiert (`brew install vhs` oder `go install github.com/charmbracelet/vhs@latest`)
und die jeweiligen Projekt-Repos lokal lauffähig.

```bash
# mysh: Shell-Session mit Profiling
cd <pfad-zum-mysh-repo> && vhs build && cd -
vhs vhs/mysh.tape

# VentoryGo: Server starten, dann Tape gegen laufende API
cd <pfad-zum-ventorygo-repo> && go run . &   # bzw. laut README des Repos
vhs vhs/ventorygo.tape
```

Die Tapes schreiben nach `public/vhs/*.webm`. Danach in `src/content.ts` bei
`projects.items[].visual.src` den Wert `TODO` durch `/vhs/mysh.webm` bzw.
`/vhs/ventorygo.webm` ersetzen.

## Anpassen

- Theme-Farben entsprechen den Design-Tokens (`#0a0a0a`, `#ededed`, `#8b5cf6`, …).
- Befehle in den Tapes sind Platzhalter für die echte CLI/API – vor dem Aufnehmen
  an die tatsächlichen Kommandos der Repos anpassen.
