import { chromium } from 'playwright';

const browser = await chromium.launch();

for (const [name, viewport] of [
  ['shots/s5-light-desktop.png', { width: 1440, height: 900 }],
  ['shots/s5-light-mobile.png', { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport });
  await page.addInitScript(() => window.localStorage.setItem('portfolio-theme', 'light'));
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
  await page.screenshot({ path: name, fullPage: true });
  await page.close();
}

await browser.close();
console.log('wrote light mode shots');
