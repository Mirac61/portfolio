import { TmuxBar } from './components/TmuxBar';
import { StatusLine } from './components/StatusLine';
import { ProfilePane } from './components/ProfilePane';
import { ProjectExplorer } from './components/ProjectExplorer';
import { StackPane } from './components/StackPane';
import { ReadmePane } from './components/ReadmePane';

function App() {
  return (
    <>
      <TmuxBar />
      <main className="container">
        <ProfilePane />
        <ProjectExplorer />
        <div className="bottom-row">
          <StackPane />
          <ReadmePane />
        </div>
      </main>
      <StatusLine />
    </>
  );
}

export default App;
