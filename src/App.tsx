import { useCallback, useEffect, useState } from 'react';
import { TmuxBar } from './components/TmuxBar';
import { StatusLine } from './components/StatusLine';
import { ProfileMain, ProfileSide } from './components/Profile';
import { ProjectMain, ProjectsSide } from './components/Projects';
import { StackMain, StackSide } from './components/Stack';
import { ReadmeMain, ReadmeSide } from './components/Readme';
import { Pane } from './components/Pane';
import { applyTheme, initialTheme, nextTheme, type Theme } from './theme';
import { content } from './content';

const WINDOWS = content.statusBar.tabs.map((tab) => tab.id);
const { projects, stack } = content;

// the URL hash is the active tmux window, so tabs are plain links and back works
function windowFromHash(): string {
  const id = window.location.hash.slice(1);
  return WINDOWS.includes(id) ? id : WINDOWS[0];
}

const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max);

function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [active, setActive] = useState(windowFromHash);
  const [projectIndex, setProjectIndex] = useState(0);
  const [stackIndex, setStackIndex] = useState(0);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // pushState instead of a plain anchor jump: the browser would scroll the side column to the pane
  const openWindow = useCallback((id: string) => {
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    setActive(id);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sync = () => setActive(windowFromHash());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  // keybindings like a TUI: 0-3 switch windows, j/k move the selection, t flips the theme
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (/^\d$/.test(event.key) && Number(event.key) < WINDOWS.length) {
        openWindow(WINDOWS[Number(event.key)]);
      } else if (event.key === 't') {
        setTheme(nextTheme);
      } else if (event.key === 'j' || event.key === 'k') {
        const step = event.key === 'j' ? 1 : -1;
        if (active === 'projekte') setProjectIndex((index) => clamp(index + step, projects.items.length - 1));
        if (active === 'stack') setStackIndex((index) => clamp(index + step, stack.groups.length - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, openWindow]);

  if (new URLSearchParams(window.location.search).has('og')) {
    return (
      <main className="og-frame">
        <Pane title="~/mirac" className="main-pane">
          <div className="main-scroll">
            <ProfileMain />
          </div>
        </Pane>
      </main>
    );
  }

  const project = projects.items[projectIndex];
  const main = {
    profil: { path: '~/mirac', view: <ProfileMain /> },
    projekte: { path: project.path, view: <ProjectMain project={project} /> },
    stack: { path: `~/stack/${stack.groups[stackIndex].folder}`, view: <StackMain index={stackIndex} /> },
    readme: { path: '~/mirac/README.md', view: <ReadmeMain /> },
  }[active] ?? { path: '~/mirac', view: <ProfileMain /> };

  return (
    <>
      <TmuxBar activeTab={active} onOpen={openWindow} />
      <main className="workspace">
        <div className="side">
          <ProfileSide focused={active === 'profil'} onActivate={() => openWindow('profil')} />
          <ProjectsSide
            focused={active === 'projekte'}
            onActivate={() => openWindow('projekte')}
            index={projectIndex}
            onSelect={setProjectIndex}
          />
          <StackSide
            focused={active === 'stack'}
            onActivate={() => openWindow('stack')}
            index={stackIndex}
            onSelect={setStackIndex}
          />
          <ReadmeSide focused={active === 'readme'} onActivate={() => openWindow('readme')} />
        </div>
        <Pane title={main.path} className="main-pane">
          {/* keyed by path so every window and project starts scrolled to the top */}
          <div className="main-scroll" key={main.path}>
            {main.view}
          </div>
        </Pane>
      </main>
      <StatusLine theme={theme} onToggle={() => setTheme(nextTheme(theme))} />
    </>
  );
}

export default App;
