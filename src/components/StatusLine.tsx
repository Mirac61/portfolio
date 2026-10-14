import { content } from '../content';

const { footer } = content;

export function StatusLine() {
  return (
    <footer className="statusline" role="contentinfo">
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
        <span className="status-path">{footer.path}</span>
      </div>
      <div className="status-right">
        <span className="status-meta">{footer.meta}</span>
      </div>
    </footer>
  );
}
