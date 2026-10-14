import { useEffect, useState } from 'react';

const tabs = [
  { id: 'profil', label: '0:profil' },
  { id: 'projekte', label: '1:projekte' },
  { id: 'stack', label: '2:stack' },
  { id: 'readme', label: '3:readme' },
] as const;

export function TmuxBar() {
  const [active, setActive] = useState('profil');

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

    tabs.forEach(({ id }) => {
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
        <span className="session-block">mirac</span>
        <nav className="tmux-tabs" aria-label="Hauptnavigation">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              className={`tmux-tab ${active === id ? 'active' : ''}`}
              onClick={() => handleClick(id)}
              aria-current={active === id ? 'page' : undefined}
              type="button"
            >
              {label}{active === id ? '*' : ''}
            </button>
          ))}
        </nav>
      </div>
      <div className="tmux-right">
        <span className="status-hiring">
          <span className="status-dot" aria-hidden="true" /> werkstudent: offen
        </span>
        <span className="status-praxis">praxissemester: SS 2027</span>
      </div>
    </header>
  );
}
