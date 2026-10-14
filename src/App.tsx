import { useCallback, useEffect, useRef, useState } from 'react';
import { TmuxBar } from './components/TmuxBar';
import { StatusLine } from './components/StatusLine';
import { ProfileMain, ProfileSide } from './components/Profile';
import { ProjectMain, ProjectsSide } from './components/Projects';
import { StackMain, StackSide } from './components/Stack';
import { ReadmeMain, ReadmeSide } from './components/Readme';
import { Pane } from './components/Pane';
import { applyTheme, initialTheme, nextTheme, type Theme } from './theme';
import { content, readmeHeadings } from './content';

const { profile, projects, stack, readme } = content;
// window ids are fixed because each one maps to a view below, the labels come from content.ts
const TABS = [
  { id: 'profil', label: profile.title },
  { id: 'projekte', label: projects.title },
  { id: 'stack', label: stack.title },
  { id: 'readme', label: readme.title },
];
const WINDOWS = TABS.map((tab) => tab.id);
// rows per window: the cursor walks through all of them in this order, across the panes;
// the stack window walks its directories on level 0, files and detail stay inside
const ROWS: Record<string, number> = {
  profil: 1,
  projekte: projects.items.length,
  stack: stack.groups.length,
  readme: readmeHeadings.length,
};
const NAV_KEYS: Record<string, number> = { j: 1, ArrowDown: 1, k: -1, ArrowUp: -1 };
const DEEPER_KEYS = ['Enter', 'ArrowRight', 'l'];
const BACK_KEYS = ['Escape', 'ArrowLeft', 'h'];

// the URL hash is the active tmux window, so tabs are plain links and back works
function windowFromHash(): string {
  const id = window.location.hash.slice(1);
  return WINDOWS.includes(id) ? id : WINDOWS[0];
}

function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [active, setActive] = useState(windowFromHash);
  // the selected row per window, kept while another window is open;
  // for the stack window this is the directory cursor (level 0)
  const [selection, setSelection] = useState<Record<string, number>>({ profil: 0, projekte: 0, stack: 0, readme: 0 });
  // stack like a file manager: 0 = directories, 1 = ls listing, 2 = cd'd into a file
  const [stackLevel, setStackLevel] = useState(0);
  // cursor inside the current directory's files (levels 1 and 2)
  const [stackFile, setStackFile] = useState(0);

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

  const select = useCallback(
    (id: string, index: number) => {
      setSelection((current) => ({ ...current, [id]: index }));
      // a new directory starts fresh: listing level, cursor on its first file
      if (id === 'stack') {
        setStackLevel(0);
        setStackFile(0);
      }
      openWindow(id);
    },
    [openWindow],
  );

  // one cursor over every row of every pane: past the last row of a pane it
  // continues in the next one, before the first row it goes back to the previous
  const move = useCallback(
    (step: number) => {
      let pane = WINDOWS.indexOf(active);
      let index = selection[active] + step;
      if (index < 0) {
        if (pane === 0) return;
        pane -= 1;
        index = ROWS[WINDOWS[pane]] - 1;
      } else if (index >= ROWS[active]) {
        if (pane === WINDOWS.length - 1) return;
        pane += 1;
        index = 0;
      }
      select(WINDOWS[pane], index);
    },
    [active, selection, select],
  );

  // the wheel handler lives once, but always calls the current move
  const moveRef = useRef(move);
  useEffect(() => {
    moveRef.current = move;
  }, [move]);

  // the mouse wheel walks the same cursor as j/k: over the side column one notch
  // steps to the next/previous row, across panes. Only in the two-column desktop
  // layout, where the side column is the navigator; elsewhere the page scrolls.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px) and (min-height: 560px)');
    let acc = 0;
    let last = 0;
    const onWheel = (event: WheelEvent) => {
      if (!desktop.matches || event.ctrlKey) return;
      if (!(event.target as HTMLElement | null)?.closest('.side')) return;
      // horizontal pans keep their default behaviour
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      acc += event.deltaY;
      // one step per notch, but trackpads fire many small events: accumulate
      // until a threshold and throttle, so a swipe does not race through the list
      const now = performance.now();
      if (Math.abs(acc) < 50 || now - last < 200) return;
      last = now;
      acc = 0;
      document.documentElement.dataset.nav = 'keys';
      moveRef.current(event.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // keep the cursor's pane visible in the side column, whoever stepped it
  useEffect(() => {
    if (!window.matchMedia('(min-width: 900px) and (min-height: 560px)').matches) return;
    document.querySelector<HTMLElement>('.side .pane.focused')?.scrollIntoView({ block: 'nearest' });
  }, [active, selection]);

  const stackGroup = stack.groups[selection.stack];

  // keybindings like a TUI: 1-4 switch windows, j/k or the arrows move the cursor, t flips the theme;
  // in the stack window j/k iterate the current level, →/enter go deeper, ←/esc back out
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const number = Number(event.key);
      if (number >= 1 && number <= WINDOWS.length) {
        openWindow(WINDOWS[number - 1]);
      } else if (active === 'stack' && event.key in NAV_KEYS) {
        event.preventDefault();
        // hover styles pause until the mouse moves, so only the cursor is highlighted
        document.documentElement.dataset.nav = 'keys';
        if (stackLevel === 0) {
          move(NAV_KEYS[event.key]);
        } else {
          // files and detail stay inside the directory: the cursor stops at its ends
          const step = NAV_KEYS[event.key];
          setStackFile((current) => Math.min(stackGroup.files.length - 1, Math.max(0, current + step)));
        }
      } else if (active === 'stack' && DEEPER_KEYS.includes(event.key)) {
        // enter/→/l: directories → listing → detail
        event.preventDefault();
        setStackLevel((level) => Math.min(2, level + 1));
      } else if (active === 'stack' && BACK_KEYS.includes(event.key)) {
        // esc/←/h: one level back out
        event.preventDefault();
        setStackLevel((level) => Math.max(0, level - 1));
      } else if (event.key === 't') {
        setTheme(nextTheme);
      } else if (event.key in NAV_KEYS) {
        event.preventDefault();
        document.documentElement.dataset.nav = 'keys';
        move(NAV_KEYS[event.key]);
      }
    };
    const onPointerMove = () => delete document.documentElement.dataset.nav;
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointermove', onPointerMove);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [move, openWindow, active, selection.stack, stackLevel, stackGroup.files.length]);

  // keyboard focus follows the cursor, so the focus ring never sits on a different row
  useEffect(() => {
    if (!document.activeElement?.closest('.side')) return;
    const target =
      document.querySelector<HTMLElement>('.side .pane.focused .select-row.active') ??
      document.querySelector<HTMLElement>('.side .pane.focused .pane-title button');
    target?.focus({ preventScroll: true });
  }, [active, selection]);

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

  const project = projects.items[selection.projekte];
  const stackFileIndex = Math.min(stackFile, stackGroup.files.length - 1);
  const stackFileName = stackGroup.files[stackFileIndex];
  const stackDetail = stackLevel === 2;
  const stackPath = stackDetail ? `~/stack/${stackGroup.folder}/${stackFileName}` : `~/stack/${stackGroup.folder}`;
  // like a shell session: the tab carries the current path while cd'd in
  const tabs = TABS.map((tab) =>
    tab.id === 'stack' && stackDetail ? { ...tab, label: `${stack.title}/${stackFileName}` } : tab,
  );
  const main = {
    profil: { path: '~/mirac', view: <ProfileMain /> },
    projekte: { path: `~/projects/${project.id}`, view: <ProjectMain project={project} /> },
    stack: {
      path: stackPath,
      view: (
        <StackMain
          group={stackGroup}
          level={stackLevel}
          fileIndex={stackFileIndex}
          onOpenFile={(index) => {
            setStackFile(index);
            setStackLevel(2);
          }}
          onBack={() => setStackLevel(1)}
        />
      ),
    },
    readme: { path: '~/mirac/README.md', view: <ReadmeMain index={selection.readme} /> },
  }[active] ?? { path: '~/mirac', view: <ProfileMain /> };

  return (
    <>
      <TmuxBar tabs={tabs} activeTab={active} onOpen={openWindow} />
      <main className="workspace">
        <div className="side">
          <ProfileSide focused={active === 'profil'} onActivate={() => openWindow('profil')} />
          <ProjectsSide
            focused={active === 'projekte'}
            onActivate={() => openWindow('projekte')}
            index={selection.projekte}
            onSelect={(index) => select('projekte', index)}
          />
          <StackSide
            focused={active === 'stack'}
            onActivate={() => openWindow('stack')}
            index={selection.stack}
            onSelect={(index) => {
              // clicking a directory opens it: straight to its file listing
              select('stack', index);
              setStackLevel(1);
            }}
          />
          <ReadmeSide
            focused={active === 'readme'}
            onActivate={() => openWindow('readme')}
            index={selection.readme}
            onSelect={(index) => select('readme', index)}
          />
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
