import { chromium } from 'playwright';

const browser = await chromium.launch();

async function capture(theme) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5175', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  if (theme === 'dark') {
    await page.evaluate(() => document.documentElement.classList.add('dark'));
  } else {
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
  }
  await page.waitForTimeout(400);

  await page.screenshot({
    path: `/Users/mirac/code/personal/Webseiten/Portfolio/public/media/vlanscape-${theme}.webp`,
    type: 'webp',
    quality: 90,
  });
  console.log(`wrote vlanscape-${theme}.webp`);
  await context.close();
}

await capture('light');
await capture('dark');
await browser.close();
