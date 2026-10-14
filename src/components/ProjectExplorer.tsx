import { useState } from 'react';
import { Pane } from './Pane';
import { projects } from '../data/projects';
import type { Project } from '../types';

const ports = [
  'vlan10', 'vlan10', 'vlan20', 'vlan10',
  'vlan30', 'vlan20', 'vlan10', 'vlan30',
  'vlan20', 'vlan10', 'vlan30', 'vlan20',
  'vlan10', 'vlan20', 'vlan10', 'vlan30',
  'vlan20', 'vlan10', 'vlan30', 'vlan20',
  'vlan10', 'vlan30', 'vlan20', 'vlan10',
];

function MiniGraphic({ project }: { project: Project }) {
  if (project.id === 'ventorygo') {
    return (
      <div className="mini-graphic inset-box">
        <div className="invoice-line"><span className="inv-desc">artikel a</span><span className="inv-amount">░░░,░░ €</span></div>
        <div className="invoice-line"><span className="inv-desc">artikel b</span><span className="inv-amount">░░░,░░ €</span></div>
        <div className="invoice-line"><span className="inv-desc">artikel c</span><span className="inv-amount">░░░,░░ €</span></div>
        <div className="invoice-sum"><span>summe</span><span>8B5CF6 €</span></div>
        <div className="invoice-check">✓ PDF erzeugt</div>
      </div>
    );
  }

  if (project.id === 'mysh') {
    return (
      <div className="mini-graphic inset-box">
        <div className="flamegraph">
          <div className="flame-bar" style={{ '--w': '100%', '--a': 1.0 } as React.CSSProperties} />
          <div className="flame-bar" style={{ '--w': '72%', '--a': 0.85 } as React.CSSProperties} />
          <div className="flame-bar" style={{ '--w': '55%', '--a': 0.70 } as React.CSSProperties} />
          <div className="flame-bar" style={{ '--w': '38%', '--a': 0.55 } as React.CSSProperties} />
          <div className="flame-bar" style={{ '--w': '21%', '--a': 0.40 } as React.CSSProperties} />
        </div>
        <div className="flame-label">stack ↑ · zeit →</div>
      </div>
    );
  }

  if (project.id === 'vlanscape') {
    return (
      <div className="mini-graphic inset-box">
        <div className="switch-grid" aria-hidden="true">
          {ports.map((vlan, i) => (
            <span key={i} className={`port ${vlan}`} />
          ))}
        </div>
        <div className="patch-panel" aria-hidden="true" />
        <div className="vlan-legend">
          <span><span className="dot vlan10" aria-hidden="true" /> vlan 10</span>
          <span><span className="dot vlan20" aria-hidden="true" /> vlan 20</span>
          <span><span className="dot vlan30" aria-hidden="true" /> vlan 30</span>
        </div>
      </div>
    );
  }

  if (project.id === 'kairo') {
    return (
      <div className="mini-graphic inset-box">
        <div className="day-plan">
          <div className="day-block focus">deep work</div>
          <div className="day-block">emails</div>
          <div className="day-block">review</div>
        </div>
        <div className="buffer-bar" aria-hidden="true">
          <span className="buffer-fill" style={{ '--p': '37.5%' } as React.CSSProperties} />
          <span className="buffer-text">[██████░░░░░░░░░░] 2 tage</span>
        </div>
      </div>
    );
  }

  return null;
}

export function ProjectExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Pane id="projekte" number={2} title="projekte" count={projects.length} focused className="projekte-pane">
      <div className="explorer">
        <div className="explorer-list" role="tablist" aria-label="Projektliste">
          {projects.map((project, index) => (
            <button
              key={project.id}
              className={`project-row ${index === activeIndex ? 'active' : ''}`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={`preview-${project.id}`}
              onClick={() => setActiveIndex(index)}
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
            <span>klicken zum öffnen</span>
            <span className="list-position" aria-live="polite">
              <span className="pos-current">{activeIndex + 1}</span>/<span className="pos-total">{projects.length}</span>
            </span>
          </div>
        </div>

        <div className="explorer-preview">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`preview-panel ${index === activeIndex ? 'active' : ''}`}
              id={`preview-${project.id}`}
              role="tabpanel"
              tabIndex={0}
              hidden={index !== activeIndex}
            >
              <div className="preview-path">{project.path}</div>
              <h3 className="preview-title">{project.title}</h3>
              {project.status === 'in arbeit' && <span className="status-pill">in arbeit</span>}
              <p className="preview-desc">{project.desc}</p>
              <dl className="preview-meta">
                {Object.entries(project.meta).map(([key, value]) => (
                  <div className="kv-row" key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <MiniGraphic project={project} />
              <a
                className="btn btn-solid preview-link"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true">[</span> repo ansehen <span aria-hidden="true">]</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </Pane>
  );
}
