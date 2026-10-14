import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (root.dataset.theme === theme) return;
  const flip = () => {
    root.dataset.theme = theme;
  };
  // crossfade where supported, a plain flip for reduced motion and older browsers
  if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.startViewTransition(flip);
  } else {
    flip();
  }
}

// initial theme before React hydrates, matching the inline script in index.html
export function initialTheme(): Theme {
  return systemTheme();
}

// follow the OS colour scheme dynamically
export function useSystemTheme(): Theme {
  const [theme, setTheme] = useState<Theme>(systemTheme);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => setTheme(event.matches ? 'light' : 'dark');
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return theme;
}
