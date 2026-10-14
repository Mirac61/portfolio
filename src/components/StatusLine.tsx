import { content } from '../content';
import type { Theme } from '../theme';

const { footer } = content;

// mirrors the keybindings in App.tsx
const HINTS = [
  { key: '0-3', label: 'fenster' },
  { key: 'j/k', label: 'auswahl' },
  { key: 't', label: 'theme' },
];

export function StatusLine({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <footer className="statusline">
      <div className="status-left">
        <span className="status-mode">{footer.mode}</span>
        <span className="status-branch">
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M3 1v4a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          {footer.branch}
        </span>
      </div>
      <div className="status-hints" aria-hidden="true">
        {HINTS.map(({ key, label }) => (
          <span key={key}>
            <span className="hint-key">{key}</span> {label}
          </span>
        ))}
      </div>
      <div className="status-right">
        <button
          className="theme-toggle"
          onClick={onToggle}
          type="button"
          aria-label={theme === 'dark' ? 'Helles Design einschalten' : 'Dunkles Design einschalten'}
        >
          <span aria-hidden="true">[</span> {theme === 'dark' ? 'light' : 'dark'}{' '}
          <span aria-hidden="true">]</span>
        </button>
        <span className="status-meta">{footer.meta}</span>
      </div>
    </footer>
  );
}
