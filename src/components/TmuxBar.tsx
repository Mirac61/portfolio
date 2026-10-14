import { content } from '../content';

const { statusBar } = content;

export function TmuxBar({ activeTab, onOpen }: { activeTab: string; onOpen: (id: string) => void }) {
  return (
    <header className="tmux-bar">
      <div className="tmux-left">
        <span className="session-block">{statusBar.session}</span>
        <nav className="tmux-tabs" aria-label="Hauptnavigation">
          {statusBar.tabs.map(({ id, label }, index) => (
            <a
              key={id}
              href={`#${id}`}
              className={`tmux-tab ${activeTab === id ? 'active' : ''}`}
              aria-current={activeTab === id ? 'location' : undefined}
              onClick={(event) => {
                event.preventDefault();
                onOpen(id);
              }}
            >
              {index}:{label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
