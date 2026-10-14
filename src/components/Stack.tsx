import { Pane } from './Pane';
import { SelectList } from './SelectList';
import { content } from '../content';
import git from '../data/git.json';

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

const numbers = new Intl.NumberFormat('de-DE');
const totals = git.languages.reduce(
  (sum, language) => ({ files: sum.files + language.files, lines: sum.lines + language.lines }),
  { files: 0, lines: 0 },
);

// lines as a block bar, the largest language fills BAR_WIDTH cells
const BAR_WIDTH = 12;
const maxLines = Math.max(...git.languages.map(({ lines }) => lines));
const bar = (lines: number) => '█'.repeat(Math.max(1, Math.round((lines / maxLines) * BAR_WIDTH)));

// measured by scripts/git-stats.mjs over all local repos, like tokei
function LinesOfCode({ highlight }: { highlight: string[] }) {
  return (
    <figure className="loc">
      <figcaption className="block-label"># zeilen code in {git.repoCount} repos</figcaption>
      <table>
        <thead>
          <tr>
            <th>sprache</th>
            <th>dateien</th>
            <th>zeilen</th>
            <th>repos</th>
            <th aria-hidden="true" />
          </tr>
        </thead>
        <tbody>
          {git.languages.map((language) => (
            <tr key={language.name} className={highlight.includes(language.name) ? 'highlight' : ''}>
              <td>{language.name}</td>
              <td>{numbers.format(language.files)}</td>
              <td>{numbers.format(language.lines)}</td>
              <td>{language.repos}</td>
              <td className="loc-bar" aria-hidden="true">
                {bar(language.lines)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>gesamt</td>
            <td>{numbers.format(totals.files)}</td>
            <td>{numbers.format(totals.lines)}</td>
            <td />
            <td />
          </tr>
        </tfoot>
      </table>
      <p className="loc-note">nicht-leere zeilen, stand {git.generated}</p>
    </figure>
  );
}

export function StackMain({ index }: { index: number }) {
  return (
    <div className="stack-main">
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
      <LinesOfCode highlight={stack.groups[index].files} />
    </div>
  );
}
