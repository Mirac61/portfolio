# ASCII-Art im Stack

Das `stack`-Fenster zeigt nach dem `cd` in einen Eintrag oben ein ASCII-Logo und darunter den Text aus `content.ts` (`desc`, `did`, `likes`). Das Logo wird per CSS im Lila des Profil-Banners eingefärbt und folgt dem Theme.

## Dateien

Jedes Logo liegt als Textdatei in `src/images/<name>_logo.txt`. Sonderzeichen im Namen werden zu `_`, also `spring boot` → `spring_boot_logo.txt`, `c++` → `c__logo.txt`, `ci/cd` → `ci_cd_logo.txt`. Fehlt die Datei, bleibt die Fläche einfach leer.

| Eintrag | Quelle |
|---|---|
| go | von Hand, `go_logo.txt` |
| java, kotlin, c++, gin, spring boot, postgresql, sqlite, keycloak, docker, ci/cd (GitHub Actions), neovim, tmux, ghostty | Logo aus [simple-icons](https://simpleicons.org) (CC0), mit `scripts/ascii-logos.mjs` umgewandelt |
| yazi | kein Logo in simple-icons, Schriftzug in JetBrains Mono, ebenfalls aus dem Skript |

## Neu erzeugen

```bash
pnpm logos
# falls Playwrights eigener Browser fehlt:
CHROMIUM_PATH=/pfad/zu/chrome pnpm logos
```

Das Skript überschreibt alle Logos außer `go_logo.txt`. Breite (`cols`) und Zeichenrampe (` .:-=`, wie beim Go-Logo) stehen oben im Skript. Eine Datei lässt sich danach auch von Hand nachbessern. Dann den Eintrag aus `logos` im Skript nehmen, damit sie beim nächsten Lauf nicht überschrieben wird.
