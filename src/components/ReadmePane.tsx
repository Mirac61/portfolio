import { Pane } from './Pane';

export function ReadmePane() {
  return (
    <Pane id="readme" number={4} title="readme" className="readme-pane">
      <div className="readme-content">
        <p className="readme-lead">
          Ich baue Software, die sich anfühlt wie ein gutes CLI-Tool: schnell, vorhersehbar und ohne Ablenkung.
        </p>

        <h3><span aria-hidden="true">## </span>über mich</h3>
        <p>
          Studiere Informatik an der Hochschule Esslingen und arbeite nebenbei in der IT. Mein Interesse gilt Backend-Systemen, Netzwerken und Entwickler-Tools. Ich mag Oberflächen, die klare Struktur zeigen, statt sie zu verstecken.
        </p>

        <h3><span aria-hidden="true">## </span>was ich suche</h3>
        <ul>
          <li><span aria-hidden="true">- </span>einen Werkstudenten-Platz im Backend oder in der Infrastruktur</li>
          <li><span aria-hidden="true">- </span>ein Praxissemester ab SS 2027</li>
          <li><span aria-hidden="true">- </span>Teams, in denen man sich Tooling selbst bauen darf</li>
        </ul>

        <h3><span aria-hidden="true">## </span>kontakt</h3>
        <p>Schreib mir eine Mail oder schau auf GitHub vorbei. Ich antworte meist innerhalb eines Tages.</p>
      </div>
    </Pane>
  );
}
