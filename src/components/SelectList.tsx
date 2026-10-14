export interface SelectItem {
  key: string;
  name: string;
  detail?: string;
  // visual indentation of the row, in steps of one list level
  indent?: number;
  kind?: 'folder' | 'file';
}

// lazygit-style list: one line per item, ▸ marks the selection; j/k and the arrows live in App.tsx
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
  return (
    <div className="select-list" role="listbox" aria-label={label}>
      {items.map((item, itemIndex) => (
        <button
          key={item.key}
          className={`select-row ${item.kind ?? ''} ${itemIndex === index ? 'active' : ''}`}
          role="option"
          aria-selected={itemIndex === index}
          tabIndex={itemIndex === index ? 0 : -1}
          onClick={() => onSelect(itemIndex)}
          type="button"
          style={{ paddingLeft: `${((item.indent ?? 0) * 12) + 8}px` }}
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
