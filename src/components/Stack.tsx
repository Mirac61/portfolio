import { Pane } from "./Pane";
import { SelectList } from "./SelectList";
import { content, stackArt, usedIn } from "../content";

const { stack } = content;

export interface StackGroup {
  folder: string;
  files: string[];
}

// sidebar = the directories; the cursor lives here on level 0
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
  const items = stack.groups.map((group) => ({
    key: group.folder,
    name: `${group.folder}/`,
    detail: String(group.files.length),
    kind: "folder" as const,
  }));

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
        items={items}
      />
    </Pane>
  );
}

// main pane: level 0/1 = ls listing of the cursor directory, level 2 = detail of the cursor file
export function StackMain({
  group,
  level,
  fileIndex,
  onOpenFile,
  onBack,
}: {
  group: StackGroup;
  level: number;
  fileIndex: number;
  onOpenFile: (index: number) => void;
  onBack: () => void;
}) {
  const file = group.files[fileIndex];

  if (level === 2) {
    const info = stack.info[file];
    const used = usedIn(file);
    const art = stackArt(file);
    return (
      <div className="stack-cd">
        <div className="cd-head">
          <span className="cd-crumb">
            <span className="cd-prompt">$</span> cd {file} · ~/stack/
            {group.folder}/{file}
          </span>
          <button className="cd-back" type="button" onClick={onBack}>
            cd ..
          </button>
        </div>

        <div className="stack-slot">
          {art && (
            <pre className="stack-art" aria-hidden="true">
              {art.join("\n")}
            </pre>
          )}

          <div className="stack-text">
            <h2 className="stack-name">{file}</h2>
            {info?.desc && <p className="stack-desc">{info.desc}</p>}
            {info?.did && (
              <section className="stack-note">
                <h3 className="stack-note-head"># was ich damit gemacht habe</h3>
                <p className="stack-desc">{info.did}</p>
              </section>
            )}
            {info?.likes && (
              <section className="stack-note">
                <h3 className="stack-note-head"># was ich daran mag</h3>
                <p className="stack-desc">{info.likes}</p>
              </section>
            )}
            {used.length > 0 && (
              <p className="stack-used">
                <span className="stack-used-label">genutzt in</span>{" "}
                {used.join(", ")}
              </p>
            )}
          </div>
        </div>

        <p className="cd-hint">
          ←, esc oder cd .. eine ebene raus · j/k blättert durch die dateien
        </p>
      </div>
    );
  }

  const hint =
    level === 0
      ? "j/k = verzeichnisse · → oder enter = ordner öffnen · klick auf eine datei = detail"
      : "j/k = dateien · → oder enter = cd · ← zurück zu den verzeichnissen";

  return (
    <div className="stack-ls">
      <p className="cd-prompt-line">
        <span className="cd-prompt">$ </span>ls ~/stack/{group.folder}
      </p>
      <p className="ls-comment"># {stack.info[group.folder]?.desc}</p>
      <div
        className="ls-list"
        role="listbox"
        aria-label={`Dateien in ${group.folder}/`}
      >
        {group.files.map((name, index) => {
          const projects = usedIn(name);
          const on = level === 1 && index === fileIndex;
          return (
            <button
              key={name}
              type="button"
              role="option"
              aria-selected={on}
              className={`ls-row ${on ? "on" : ""}`}
              onClick={() => onOpenFile(index)}
            >
              <span className="ls-name">{name}</span>
              <span className="ls-desc">{stack.info[name]?.desc}</span>
              <span className="ls-tags">
                {projects.length > 0 ? `# ${projects.join(", ")}` : "↵"}
              </span>
            </button>
          );
        })}
      </div>
      <p className="cd-hint">{hint}</p>
    </div>
  );
}
