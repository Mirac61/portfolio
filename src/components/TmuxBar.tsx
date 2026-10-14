import { useEffect, useState } from 'react';
import { content } from '../content';

const { statusBar } = content;

export function TmuxBar() {
  const [active, setActive] = useState<string>(statusBar.tabs[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );

    statusBar.tabs.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
    }
  };

  return (
    <header className="tmux-bar" role="banner">
      <div className="tmux-left">
        <span className="session-block">{statusBar.session}</span>
        <nav className="tmux-tabs" aria-label="Hauptnavigation">
          {statusBar.tabs.map(({ id, label }, index) => (
            <button
              key={id}
              className={`tmux-tab ${active === id ? 'active' : ''}`}
              onClick={() => handleClick(id)}
              aria-current={active === id ? 'page' : undefined}
              type="button"
            >
              {index}:{label}{active === id ? '*' : ''}
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
