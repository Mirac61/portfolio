import type { ReactNode } from 'react';

interface PaneProps {
  id?: string;
  title: string;
  focused?: boolean;
  onActivate?: () => void;
  children: ReactNode;
  className?: string;
}

export function Pane({
  id,
  title,
  focused = false,
  onActivate,
  children,
  className = '',
}: PaneProps) {
  return (
    <section
      id={id}
      className={`pane ${focused ? 'focused' : ''} ${className}`.trim()}
      aria-label={title}
      onClick={onActivate}
    >
      <h2 className="pane-title">
        {onActivate ? (
          <button type="button" onClick={onActivate} aria-current={focused || undefined}>
            {title}
          </button>
        ) : (
          title
        )}
      </h2>
      {children}
    </section>
  );
}
