import { Pane } from './Pane';
import { SelectList } from './SelectList';
import { content } from '../content';
import type { Project } from '../types';

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
          name: project.id,
          detail: project.type,
        }))}
      />
    </Pane>
  );
}

// a still poster instead of the loop for people who asked for less motion
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Visual({ project }: { project: Project }) {
  if (!project.media) return null;
  const { src, label, poster } = project.media;
  const alt = `${label} von ${project.title}`;
  return (
    <a className="media" href={src} target="_blank" rel="noopener noreferrer">
      <span className="media-bar">{src.split('/').pop()}</span>
      {src.endsWith('.mp4') ? (
        <video src={src} poster={poster} aria-label={alt} muted loop playsInline autoPlay={!reducedMotion} preload="metadata" />
      ) : (
        <img src={src} alt={alt} loading="lazy" />
      )}
    </a>
  );
}

export function ProjectMain({ project }: { project: Project }) {
  return (
    <article className="project-main">
      <div className="project-text">
        <h3 className="detail-title">{project.title}</h3>
        {project.status && <span className="status-pill">{project.status}</span>}
        <p className="detail-desc">{project.desc}</p>
        <dl className="detail-meta">
          {Object.entries(project.meta).map(([key, value]) => (
            <div className="kv-row" key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {project.repoUrl && (
          <div className="actions">
            <a className="btn btn-solid" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              {projects.repoLabel}
            </a>
          </div>
        )}
      </div>
      <Visual project={project} />
    </article>
  );
}
