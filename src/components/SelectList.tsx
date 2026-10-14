import { useRef } from 'react';
import type { KeyboardEvent } from 'react';

export interface SelectItem {
  key: string;
  name: string;
  detail?: string;
}

// lazygit-style list: one line per item, ▸ marks the selection, arrows move it
export function SelectList({
  label,
  items,
  index,
  onSelect,
}: {
  label: string;
  items: SelectItem[];
  index: number;
  onSelect: (index: number) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const last = items.length - 1;

  const handleKeyDown = (event: KeyboardEvent) => {
    const next = {
      ArrowDown: Math.min(index + 1, last),
      ArrowUp: Math.max(index - 1, 0),
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onSelect(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')[next]?.focus();
  };

  return (
    <div className="select-list" role="listbox" aria-label={label} ref={listRef} onKeyDown={handleKeyDown}>
      {items.map((item, itemIndex) => (
        <button
          key={item.key}
          className={`select-row ${itemIndex === index ? 'active' : ''}`}
          role="option"
          aria-selected={itemIndex === index}
          tabIndex={itemIndex === index ? 0 : -1}
          onClick={() => onSelect(itemIndex)}
          type="button"
        >
          <span className="row-marker" aria-hidden="true">
            ▸
          </span>
          <span className="row-name">
            {item.name}
            {item.detail && <span className="row-detail"> {item.detail}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
