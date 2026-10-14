import { Pane } from './Pane';

export function KontaktPane() {
  return (
    <Pane number={1} title="kontakt" className="kontakt-pane">
      <div className="kontakt-display" aria-label="E-Mail-Adresse">
        <span>mirac.sancak@example.de</span>
      </div>
      <div className="kontakt-actions">
        <a className="btn btn-solid" href="mailto:mirac.sancak@example.de">
          <span aria-hidden="true">[</span> mail schreiben <span aria-hidden="true">]</span>
        </a>
        <a className="btn btn-ghost" href="https://github.com" target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">[</span> github <span aria-hidden="true">]</span>
        </a>
        <a className="btn btn-ghost" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">[</span> linkedin <span aria-hidden="true">]</span>
        </a>
      </div>
    </Pane>
  );
}
