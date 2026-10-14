import { Pane } from './Pane';
import { content, links } from '../content';

const { readme } = content;

// the side pane lists these headings, the text itself only lives in the main view
const headings = [...readme.sections.map(({ heading }) => heading), readme.linksHeading];
const sectionId = (index: number) => `readme-${index}`;

export function ReadmeSide({ focused, onActivate }: { focused: boolean; onActivate: () => void }) {
  const open = (index: number) => {
    onActivate();
    // after the window switch has rendered the main view
    setTimeout(() => document.getElementById(sectionId(index))?.scrollIntoView({ block: 'start' }));
  };
  return (
    <Pane id="readme" title={readme.title} focused={focused} onActivate={onActivate}>
      <ul className="select-list">
        {headings.map((heading, index) => (
          <li key={heading}>
            <button
              type="button"
              className="select-row"
              onClick={(event) => {
                event.stopPropagation();
                open(index);
              }}
            >
              <span className="row-marker" />
              <span className="row-name">{heading}</span>
            </button>
          </li>
        ))}
      </ul>
    </Pane>
  );
}

function Heading({ index }: { index: number }) {
  return (
    <h3>
      <span aria-hidden="true">## </span>
      {headings[index]}
    </h3>
  );
}

export function ReadmeMain() {
  const last = readme.sections.length;
  return (
    <div className="readme-content">
      {readme.sections.map((section, index) => (
        <section key={section.heading} id={sectionId(index)}>
          <Heading index={index} />
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.list && (
            <ul>
              {section.list.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">- </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <section id={sectionId(last)}>
        <Heading index={last} />
        <ul className="readme-links">
          {links.map(({ label, href }) => (
            <li key={label}>
              <span aria-hidden="true">- </span>
              <a className="readme-link" href={href} target="_blank" rel="noopener noreferrer">
                {label}: {href.replace(/^(https:\/\/|mailto:)/, '')}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
