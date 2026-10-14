export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';

// the inline script in index.html sets data-theme before first paint
export function initialTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage blocked: the choice just lasts for this visit
  }
}

export function nextTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}
