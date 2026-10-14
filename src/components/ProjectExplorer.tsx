import { useCallback, useState } from 'react';
import { Pane } from './Pane';
import { content } from '../content';
import type { Project } from '../content';

const { projects } = content;

function ProjectList({
  items,
  activeIndex,
  onSelect,
}: {
  items: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        onSelect(Math.min(activeIndex + 1, items.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        onSelect(Math.max(activeIndex - 1, 0));
      }
    },
    [activeIndex, items.length, onSelect],
  );

  const position = projects.positionLabel
    .replace('{current}', String(activeIndex + 1))
    .replace('{total}', String(items.length));

  return (
    <div
      className="project-list"
      role="tablist"
      aria-label="Projektliste"
      onKeyDown={handleKeyDown}
    >
      {items.map((project, index) => (
        <button
          key={project.id}
          className={`project-row ${index === activeIndex ? 'active' : ''}`}
          role="tab"
          aria-selected={index === activeIndex}
          aria-controls={`preview-${project.id}`}
          tabIndex={index === activeIndex ? 0 : -1}
          onClick={() => onSelect(index)}
          type="button"
        >
          <span className="row-marker" aria-hidden="true">▸</span>
          <span className="row-info">
            <span className="row-name">{project.name}</span>
            <span className="row-type">{project.type}</span>
          </span>
          <span className="row-lang">{project.lang}</span>
        </button>
      ))}
      <div className="list-footer">
        <span>{projects.listHint}</span>
        <span className="list-position" aria-live="polite">{position}</span>
      </div>
    </div>
  );
}

function ProjectDetail({ project, isActive }: { project: Project; isActive: boolean }) {
  const hasVisual = project.visual.src !== 'TODO';

  return (
    <article
      className={`project-detail ${isActive ? 'active' : ''}`}
      id={`preview-${project.id}`}
      role="tabpanel"
      tabIndex={0}
      hidden={!isActive}
    >
      <div className="detail-path">{project.path}</div>
      <h3 className="detail-title">{project.title}</h3>
      <p className="detail-desc">{project.desc}</p>
      <dl className="detail-meta">
        {Object.entries(project.meta).map(([key, value]) => (
          <div className="kv-row" key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
        <div className="kv-row">
          <dt>status</dt>
          <dd>{project.status}</dd>
        </div>
      </dl>
      <div className="detail-visual">
        {hasVisual ? (
          <img
            src={project.visual.src}
            alt={project.visual.alt}
            width={640}
            height={360}
            loading="lazy"
          />
        ) : (
          <div className="visual-placeholder">{projects.noVisualLabel}</div>
        )}
      </div>
      <a
        className="btn btn-solid detail-link"
        href={projects.repoHref.startsWith('TODO') ? undefined : projects.repoHref}
        target={projects.repoHref.startsWith('TODO') ? undefined : '_blank'}
        rel={projects.repoHref.startsWith('TODO') ? undefined : 'noopener noreferrer'}
      >
        <span aria-hidden="true">[</span> {projects.repoLabel} <span aria-hidden="true">]</span>
      </a>
    </article>
  );
}

export function ProjectExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Pane
      id="projekte"
      number={1}
      title={projects.title}
      count={projects.items.length}
      focused
      className="projects-pane"
    >
      <div className="projects-layout">
        <ProjectList
          items={projects.items}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
        <div className="projects-preview">
          {projects.items.map((project, index) => (
            <ProjectDetail
              key={project.id}
              project={project}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </Pane>
  );
}
