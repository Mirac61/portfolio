import { TmuxBar } from './components/TmuxBar';
import { StatusLine } from './components/StatusLine';
import { ProfilePane } from './components/ProfilePane';

function App() {
  return (
    <>
      <TmuxBar />
      <main className="container">
        <ProfilePane />
      </main>
      <StatusLine />
    </>
  );
}

export default App;
