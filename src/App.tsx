import { useEffect, useState } from 'react';
import { TmuxBar } from './components/TmuxBar';
import { StatusLine } from './components/StatusLine';
import { ProfilePane } from './components/ProfilePane';
import { ProjectExplorer } from './components/ProjectExplorer';
import { StackPane } from './components/StackPane';
import { ReadmePane } from './components/ReadmePane';
import { applyTheme, initialTheme, nextTheme, type Theme } from './theme';
import { content } from './content';

const PANE_IDS = content.statusBar.tabs.map((tab) => tab.id);

function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [activePane, setActivePane] = useState(PANE_IDS[0]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // the pane crossing the viewport middle owns the accent border and the tab
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActivePane(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    PANE_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  if (new URLSearchParams(window.location.search).has('og')) {
    return (
      <main className="og-frame">
        <ProfilePane focused />
      </main>
    );
  }

  return (
    <>
      <TmuxBar activeTab={activePane} />
      <main className="container">
        <ProfilePane focused={activePane === 'profil'} />
        <ProjectExplorer focused={activePane === 'projekte'} />
        <div className="bottom-row">
          <StackPane focused={activePane === 'stack'} />
          <ReadmePane focused={activePane === 'readme'} />
        </div>
      </main>
      <StatusLine theme={theme} onToggle={() => setTheme(nextTheme(theme))} />
    </>
  );
}

export default App;
