import { Pane } from './Pane';
import { SelectList } from './SelectList';
import { content } from '../content';

const { stack, projects } = content;

const fileCount = stack.groups.reduce((sum, group) => sum + group.files.length, 0);

// projects whose meta lists this technology, e.g. "go" -> ventorygo, kairo
function usedIn(file: string): string[] {
  return projects.items
    .filter((project) =>
      Object.values(project.meta).some((value) =>
        value
          .toLowerCase()
          .split(', ')
          .includes(file),
      ),
    )
    .map((project) => project.id);
}

export function StackSide({
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
      id="stack"
      title={stack.title}
      focused={focused}
      onActivate={onActivate}
    >
      <SelectList
        label="Stack-Verzeichnisse"
        index={index}
        onSelect={onSelect}
        items={stack.groups.map(({ folder }) => ({
          key: folder,
          name: `${folder}/`,
        }))}
      />
    </Pane>
  );
}

export function StackMain({ index }: { index: number }) {
  return (
    <div className="tree">
        <div className="tree-root" aria-hidden="true">
          .
        </div>
        {stack.groups.map(({ folder, files }, groupIndex) => {
          const lastGroup = groupIndex === stack.groups.length - 1;
          return (
            <ul key={folder} className={`tree-group ${groupIndex === index ? 'selected' : ''}`} aria-label={folder}>
              <li>
                <span className="tree-deco" aria-hidden="true">
                  {lastGroup ? '└── ' : '├── '}
                </span>
                <span className="tree-folder">{folder}</span>
              </li>
              {files.map((file, fileIndex) => {
                const projectsUsing = usedIn(file);
                return (
                  <li key={file}>
                    <span className="tree-deco" aria-hidden="true">
                      {lastGroup ? '    ' : '│   '}
                      {fileIndex === files.length - 1 ? '└── ' : '├── '}
                    </span>
                    <span className="tree-file">{file}</span>
                    {projectsUsing.length > 0 && <span className="tree-used">{`  # ${projectsUsing.join(', ')}`}</span>}
                  </li>
                );
              })}
            </ul>
          );
        })}
        <div className="tree-summary">
          {stack.groups.length} verzeichnisse, {fileCount} dateien
        </div>
    </div>
  );
}
