import { TmuxBar } from './components/TmuxBar';
import { StatusLine } from './components/StatusLine';
import { ProfilePane } from './components/ProfilePane';
import { KontaktPane } from './components/KontaktPane';
import { ProjectExplorer } from './components/ProjectExplorer';
import { StackPane } from './components/StackPane';
import { ReadmePane } from './components/ReadmePane';
import { useTheme } from './hooks/useTheme';

function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <TmuxBar />
      <main className="container">
        <ProfilePane />
        <KontaktPane />
        <ProjectExplorer />
        <StackPane />
        <ReadmePane />
      </main>
      <StatusLine theme={theme} onToggle={toggleTheme} />
    </>
  );
}

export default App;
