import { Pane } from './Pane';
import { SelectList } from './SelectList';
import { content, isPending } from '../content';
import type { Project } from '../content';
import git from '../data/git.json';

const { projects } = content;

export function ProjectsSide({
  focused,
  onActivate,
  index,
  onSelect,
}: {
  focused: boolean;
  onActivate: () => void;
  index: number;
  onSelect: (index: number) => void;
}) {
  return (
    <Pane
      id="projekte"
     
      title={projects.title}
      focused={focused}
      onActivate={onActivate}
    >
      <SelectList
        label="Projektliste"
        index={index}
        onSelect={onSelect}
        items={projects.items.map((project) => ({
          key: project.id,
          name: project.name,
          detail: project.type,
        }))}
      />
    </Pane>
  );
}

// a still poster instead of the loop for people who asked for less motion
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Visual({ project }: { project: Project }) {
  const { href, label, poster } = project.media;
  if (isPending(href)) return null;
  const alt = `${label} von ${project.title}`;
  return (
    <a className="media" href={href} target="_blank" rel="noopener noreferrer">
      <span className="media-bar">{href.split('/').pop()}</span>
      {href.endsWith('.mp4') ? (
        <video src={href} poster={poster} aria-label={alt} muted loop playsInline autoPlay={!reducedMotion} preload="metadata" />
      ) : (
        <img src={href} alt={alt} loading="lazy" />
      )}
    </a>
  );
}

const monthYear = (date: string) => `${date.slice(5, 7)}/${date.slice(0, 4)}`;

export function ProjectMain({ project }: { project: Project }) {
  const history = git.projects[project.id as keyof typeof git.projects];
  return (
    <article className="project-main">
      <div className="project-text">
        <h3 className="detail-title">{project.title}</h3>
        {project.status === 'in arbeit' && <span className="status-pill">in arbeit</span>}
        <p className="detail-desc">{project.desc}</p>
        <dl className="detail-meta">
          {Object.entries(project.meta).map(([key, value]) => (
            <div className="kv-row" key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          {history && (
            <>
              <div className="kv-row">
                <dt>commits</dt>
                <dd>
                  {history.commits}, {monthYear(history.first)} bis {monthYear(history.last)}
                </dd>
              </div>
              {history.contributors > 1 && (
                <div className="kv-row">
                  <dt>team</dt>
                  <dd>{history.contributors} personen</dd>
                </div>
              )}
            </>
          )}
        </dl>
        {history && (
          <figure className="git-log">
            <figcaption className="block-label"># git log</figcaption>
            <ol>
              {history.log.map(({ hash, date, subject }) => (
                <li key={hash}>
                  <span className="log-hash">{hash}</span>
                  <span className="log-date">{date}</span>
                  <span className="log-subject">{subject}</span>
                </li>
              ))}
            </ol>
          </figure>
        )}
        {!isPending(project.repoUrl) && (
          <div className="actions">
            <a className="btn btn-solid" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">[</span> {projects.repoLabel} <span aria-hidden="true">]</span>
            </a>
          </div>
        )}
      </div>
      <Visual project={project} />
    </article>
  );
}
