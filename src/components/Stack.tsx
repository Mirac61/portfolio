import { Pane } from "./Pane";
import { SelectList } from "./SelectList";
import { content, usedIn } from "../content";

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

        <div className="stack-slot mt-3">
          {/* 1. ASCII-Art: Mittig ausgerichtet & etwas größer */}
          {info?.art && (
            <div className="flex justify-center my-2">
              <pre
                className="ascii-art font-mono whitespace-pre text-center bg-[image:linear-gradient(135deg,#6d28d9_0%,#8b5cf6_45%,#c4b5fd_100%)] bg-clip-text text-transparent"
                style={{ fontSize: "8.5px", lineHeight: "1.1" }}
              >
                {Array.isArray(info.art) ? info.art.join("\n") : info.art}
              </pre>
            </div>
          )}

          {/* 2. Feine Trennlinie */}
          {info?.art && (
            <div className="border-b border-neutral-200 dark:border-neutral-800/80 my-4" />
          )}

          {/* 3. Beschreibung & 'genutzt in' darunter */}
          {info ? <p className="stack-desc">{info.desc}</p> : null}
          {used.length > 0 && (
            <p className="stack-used mt-2">
              <span className="stack-used-label">genutzt in</span>{" "}
              {used.join(", ")}
            </p>
          )}
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
