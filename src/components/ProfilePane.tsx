import { Pane } from './Pane';

const asciiLines = [
  '███╗   ███╗██╗██████╗  █████╗  ██████╗',
  '████╗ ████║██║██╔══██╗██╔══██╗██╔════╝',
  '██╔████╔██║██║██████╔╝███████║██║     ',
  '██║╚██╔╝██║██║██╔══██╗██╔══██║██║     ',
  '██║ ╚═╝ ██║██║██║  ██║██║  ██║╚██████╗',
  '╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝',
];

const palette = ['#0A0A0A', '#8B5CF6', '#EDEDED', '#9A9A9A', '#A986F8', '#B495F9', '#D3C1FC', '#3C3C3C'];

export function ProfilePane() {
  return (
    <Pane id="profil" number={0} title="profil" className="profil-pane">
      <div className="profil-grid">
        <div className="profil-header">
          <pre className="ascii-banner" role="img" aria-label="MIRAC">
            {asciiLines.map((line, i) => (
              <span key={i} className="ascii-line" style={{ '--l': i } as React.CSSProperties}>
                {line}
              </span>
            ))}
          </pre>
          <h1 className="profil-h1">
            software engineering student<span className="cursor" aria-hidden="true" />
          </h1>
        </div>
        <div className="neofetch">
          <div className="neofetch-head">
            <span className="nf-name">mirac</span>
            <span className="nf-at" aria-hidden="true">@</span>
            <span className="nf-host">esslingen</span>
          </div>
          <div className="neofetch-sep" aria-hidden="true">
            ────────────────────────────────────────
          </div>
          <dl className="neofetch-grid">
            <div className="kv-row"><dt>name</dt><dd>Mirac Sancak</dd></div>
            <div className="kv-row"><dt>studium</dt><dd>Informatik (B.Sc.)</dd></div>
            <div className="kv-row"><dt>hochschule</dt><dd>HS Esslingen</dd></div>
            <div className="kv-row"><dt>fokus</dt><dd>Backend, Tools, Netzwerke</dd></div>
            <div className="kv-row"><dt>shell</dt><dd>zsh</dd></div>
            <div className="kv-row"><dt>uptime</dt><dd>seit 2021 in der IT</dd></div>
          </dl>
          <div className="color-palette" aria-label="Farbpalette">
            {palette.map((color) => (
              <span key={color} style={{ '--c': color } as React.CSSProperties} />
            ))}
          </div>
        </div>
      </div>
    </Pane>
  );
}
