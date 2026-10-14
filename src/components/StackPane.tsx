import { Pane } from './Pane';
import { content } from '../content';

const { stack } = content;

function countSummary() {
  const directories = stack.tree.filter((item) => item.folder).length;
  const files = stack.tree.filter((item) => !item.folder && item.label !== '').length;
  return `${directories} verzeichnisse, ${files} dateien`;
}

export function StackPane({ focused = false }: { focused?: boolean }) {
  return (
    <Pane id="stack" number={2} title={stack.title} focused={focused} className="stack-pane">
      <div className="tree" aria-label="Technologie-Stack">
        {stack.tree.map((line, index) => (
          <div className="tree-line" key={index}>
            <span aria-hidden="true">{line.prefix}</span>
            {line.folder ? (
              <span className="tree-folder">{line.label}</span>
            ) : (
              <span className="tree-file">{line.label}</span>
            )}
          </div>
        ))}
        <div className="tree-summary">{countSummary()}</div>
      </div>
    </Pane>
  );
}
