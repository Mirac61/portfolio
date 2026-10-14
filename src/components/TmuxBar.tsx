import { content } from '../content';

const { statusBar } = content;

export function TmuxBar({ activeTab }: { activeTab: string }) {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="tmux-bar" role="banner">
      <div className="tmux-left">
        <span className="session-block">{statusBar.session}</span>
        <nav className="tmux-tabs" aria-label="Hauptnavigation">
          {statusBar.tabs.map(({ id, label }, index) => (
            <button
              key={id}
              className={`tmux-tab ${activeTab === id ? 'active' : ''}`}
              onClick={() => handleClick(id)}
              aria-current={activeTab === id ? 'page' : undefined}
              type="button"
            >
              {index}:{label}
              {activeTab === id ? '*' : ''}
            </button>
          ))}
        </nav>
      </div>
      <div className="tmux-right">
        <span className="status-hiring">
          <span className="status-dot" aria-hidden="true" /> {statusBar.hiring}
        </span>
        <span className="status-praxis">{statusBar.internship}</span>
      </div>
    </header>
  );
}
