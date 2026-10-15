import { useEffect, useState } from 'react';
import { Pane } from './Pane';
import { SelectList } from './SelectList';
import { content } from '../content';
import type { Project } from '../types';

function useThemeMediaSrc(project: Project): string {
  const [src, setSrc] = useState(() => mediaSrc(project));

  useEffect(() => {
    const update = () => setSrc(mediaSrc(project));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [project]);

  return src;
}

function mediaSrc(project: Project): string {
  if (!project.media) return '';
  const light = document.documentElement.dataset.theme === 'light';
  return light && project.media.srcLight ? project.media.srcLight : project.media.src;
}

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
  const src = useThemeMediaSrc(project);
  const { label, poster } = project.media;
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
      <div className="project-header">
        <h3 className="detail-title">{project.title}</h3>
        {project.status && <span className="status-pill">{project.status}</span>}
      </div>
      <div className="project-split">
        <div className="project-media-col">
          <Visual project={project} />
        </div>
        <div className="project-desc-col">
          <div className="desc-command">{'>'} cat description.md</div>
          <p className="detail-desc">{project.desc}</p>
        </div>
        <div className="project-info-col">
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
      </div>
    </article>
  );
}

// mobile: all projects stacked vertically so the user can scroll through them
export function AllProjectsMain() {
  return (
    <div className="all-projects">
      {projects.items.map((project, index) => (
        <div key={project.id}>
          <ProjectMain project={project} />
          {index < projects.items.length - 1 && <hr className="project-divider" />}
        </div>
      ))}
    </div>
  );
}
