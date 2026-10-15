import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

// every view × theme × device, for the review pass after each design change
const outDir = process.argv[2] ?? 'shots/review';
const base = process.env.URL ?? 'http://localhost:5173';
const views = [
  ['hero', 'profil', 0],
  ['ventorygo', 'projekte', 0],
  ['mysh', 'projekte', 1],
  ['vlanscape', 'projekte', 2],
  ['kairo', 'projekte', 3],
  ['activitytracker', 'projekte', 4],
  ['yawntest', 'projekte', 5],
  ['stack', 'stack', 0],
  ['readme', 'readme', 0],
];
const devices = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
for (const theme of ['dark', 'light']) {
  for (const [device, options] of Object.entries(devices)) {
    // reduced motion: the mysh video shows its poster, the cursor stops blinking
    const context = await browser.newContext({ ...options, reducedMotion: 'reduce' });
    await context.addInitScript((value) => localStorage.setItem('portfolio-theme', value), theme);
    const page = await context.newPage();
    for (const [name, window, steps] of views) {
      // the query forces a full load, a hash-only goto would keep the previous selection
      await page.goto(`${base}/?view=${name}#${window}`, { waitUntil: 'networkidle' });
      for (let step = 0; step < steps; step++) await page.keyboard.press('j');
      await page.waitForTimeout(250);
      await page.screenshot({ path: `${outDir}/${name}-${theme}-${device}.png`, fullPage: device === 'mobile' });
    }
    await context.close();
  }
}
await browser.close();
console.log(`wrote ${views.length * 4} shots to ${outDir}`);
