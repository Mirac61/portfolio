import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

mkdirSync('/Users/mirac/code/personal/Webseiten/Portfolio/public/media', { recursive: true });

const browser = await chromium.launch();

async function capture(theme) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:8742', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // set theme
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('kairo-theme', t);
  }, theme);
  await page.waitForTimeout(400);

  // navigate to calendar
  const nav = page.locator('nav, [class*="sidebar"], [class*="nav"]').first();
  const kalender = page.getByText(/Kalender|Calendar/i).first();
  if (await kalender.isVisible().catch(() => false)) await kalender.click();
  await page.waitForTimeout(600);

  await page.screenshot({
    path: `/Users/mirac/code/personal/Webseiten/Portfolio/public/media/kairo-${theme}.webp`,
    type: 'webp',
    quality: 90,
  });
  console.log(`wrote kairo-${theme}.webp`);
  await context.close();
}

await capture('dark');
await capture('light');
await browser.close();
