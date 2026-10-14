import type { ReactNode } from 'react';

interface PaneProps {
  id?: string;
  number: number;
  title: string;
  count?: number;
  focused?: boolean;
  children: ReactNode;
  className?: string;
}

export function Pane({ id, number, title, count, focused = false, children, className = '' }: PaneProps) {
  return (
    <section
      id={id}
      className={`pane ${focused ? 'focused' : ''} ${className}`.trim()}
      aria-labelledby={`pane-title-${number}`}
    >
      <h2 className="pane-title" id={`pane-title-${number}`}>
        <span className="pane-number" aria-hidden="true">[{number}]</span>{' '}
        {title}
        {count !== undefined && <span className="pane-count" aria-hidden="true"> ({count})</span>}
      </h2>
      {children}
    </section>
  );
}
