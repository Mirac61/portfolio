import { Pane } from './Pane';
import { content } from '../content';

const { readme } = content;

export function ReadmePane({ focused = false }: { focused?: boolean }) {
  return (
    <Pane id="readme" number={3} title={readme.title} focused={focused} className="readme-pane">
      <div className="readme-content">
        <p className="readme-lead">{readme.lead}</p>
        {readme.sections.map((section) => (
          <section key={section.heading}>
            <h3>
              <span aria-hidden="true">## </span>
              {section.heading}
            </h3>
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
      </div>
    </Pane>
  );
}
