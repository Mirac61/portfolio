import { Fragment, useEffect, useState } from 'react';

// The headline writes itself in, rests, then fades back out, in a loop.
// Every character keeps its place (only opacity changes), so the text below
// never jumps. With less motion or in the og capture the finished line stands still.
const TYPING = 55;
const HOLDING = 1800;
const DELETING = 32;
const PAUSING = 500;

const still =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  new URLSearchParams(window.location.search).has('og');

type Phase = 'typing' | 'holding' | 'deleting' | 'pausing';

export function Headline({ text }: { text: string }) {
  const chars = [...text];
  const [count, setCount] = useState(still ? chars.length : 0);
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    if (still) return;
    let delay: number;
    if (phase === 'typing') delay = count < chars.length ? TYPING : 0;
    else if (phase === 'holding') delay = HOLDING;
    else if (phase === 'deleting') delay = count > 0 ? DELETING : 0;
    else delay = PAUSING;

    const id = window.setTimeout(() => {
      if (phase === 'typing') {
        if (count < chars.length) setCount(count + 1);
        else setPhase('holding');
      } else if (phase === 'holding') {
        setPhase('deleting');
      } else if (phase === 'deleting') {
        if (count > 0) setCount(count - 1);
        else setPhase('pausing');
      } else {
        setPhase('typing');
      }
    }, delay);
    return () => window.clearTimeout(id);
  }, [phase, count, chars.length]);

  return (
    <h1 className="profil-h1" aria-label={text}>
      <span className="h1-line" aria-hidden="true">
        {chars.map((char, index) => (
          <Fragment key={index}>
            {index === count && <span className="cursor" />}
            <span className={`h1-ch ${index < count ? 'on' : 'off'}`}>{char}</span>
          </Fragment>
        ))}
        {count >= chars.length && <span className="cursor" />}
      </span>
    </h1>
  );
}
