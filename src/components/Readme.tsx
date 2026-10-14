import { useEffect } from 'react';
import { Pane } from './Pane';
import { SelectList } from './SelectList';
import { content, links, readmeHeadings as headings } from '../content';

const { readme } = content;

const sectionId = (index: number) => `readme-${index}`;

export function ReadmeSide({
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
    <Pane id="readme" title={readme.title} focused={focused} onActivate={onActivate}>
      <SelectList
        label="Readme-Abschnitte"
        index={index}
        onSelect={onSelect}
        items={headings.map((heading) => ({ key: heading, name: heading }))}
      />
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

export function ReadmeMain({ index }: { index: number }) {
  const last = readme.sections.length;
  // the selected heading scrolls its section into view
  useEffect(() => {
    document.getElementById(sectionId(index))?.scrollIntoView({ block: 'start' });
  }, [index]);
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
