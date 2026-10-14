import { TmuxBar } from './components/TmuxBar';
import { StatusLine } from './components/StatusLine';
import { ProfilePane } from './components/ProfilePane';
import { ProjectExplorer } from './components/ProjectExplorer';

function App() {
  return (
    <>
      <TmuxBar />
      <main className="container">
        <ProfilePane />
        <ProjectExplorer />
      </main>
      <StatusLine />
    </>
  );
}

export default App;
