interface StatusLineProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function StatusLine({ theme, onToggle }: StatusLineProps) {
  return (
    <footer className="statusline" role="contentinfo">
      <div className="status-left">
        <span className="status-mode">NORMAL</span>
        <span className="status-branch">
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M3 1v4a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          main
        </span>
        <span className="status-path">~/mirac/portfolio</span>
      </div>
      <div className="status-right">
        <button
          className="theme-toggle"
          onClick={onToggle}
          aria-label={`Aktuelles Design: ${theme}. Zum ${theme === 'dark' ? 'hellen' : 'dunklen'} Modus wechseln.`}
          type="button"
        >
          <span aria-hidden="true">[</span>
          <span className="theme-label">{theme === 'dark' ? 'light' : 'dark'}</span>
          <span aria-hidden="true">]</span>
        </button>
        <span className="status-meta">utf-8 · de · © 2026 Mirac Sancak</span>
      </div>
    </footer>
  );
}
