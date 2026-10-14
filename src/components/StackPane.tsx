import { Pane } from './Pane';

const tree = [
  { prefix: '.', folder: false },
  { prefix: '├── ', label: 'sprachen', folder: true },
  { prefix: '│   ├── ', label: 'go', folder: false },
  { prefix: '│   ├── ', label: 'python', folder: false },
  { prefix: '│   ├── ', label: 'typescript', folder: false },
  { prefix: '│   └── ', label: 'c', folder: false },
  { prefix: '├── ', label: 'backend', folder: true },
  { prefix: '│   ├── ', label: 'postgresql', folder: false },
  { prefix: '│   ├── ', label: 'redis', folder: false },
  { prefix: '│   └── ', label: 'docker', folder: false },
  { prefix: '├── ', label: 'tools', folder: true },
  { prefix: '│   ├── ', label: 'neovim', folder: false },
  { prefix: '│   ├── ', label: 'tmux', folder: false },
  { prefix: '│   ├── ', label: 'lazygit', folder: false },
  { prefix: '│   └── ', label: 'btop', folder: false },
  { prefix: '└── ', label: 'lernen', folder: true },
  { prefix: '    └── ', label: 'kubernetes', folder: false },
];

export function StackPane() {
  return (
    <Pane id="stack" number={3} title="stack" className="stack-pane">
      <div className="tree inset-box" role="tree" aria-label="Technologie-Stack">
        {tree.map((line, i) => (
          <div key={i} className="tree-line" role="treeitem">
            <span aria-hidden="true">{line.prefix}</span>
            {line.folder ? (
              <span className="tree-folder">{line.label}</span>
            ) : (
              line.label
            )}
          </div>
        ))}
        <div className="tree-summary">4 verzeichnisse, 11 dateien</div>
      </div>
    </Pane>
  );
}
