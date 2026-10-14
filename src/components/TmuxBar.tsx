import { content } from '../content';

export function TmuxBar({
  tabs,
  activeTab,
  onOpen,
}: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onOpen: (id: string) => void;
}) {
  return (
    <header className="tmux-bar">
      <div className="tmux-left">
        <span className="session-block">{content.session}</span>
        <nav className="tmux-tabs" aria-label="Hauptnavigation">
          {tabs.map(({ id, label }, index) => (
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
              {index + 1}:{label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
