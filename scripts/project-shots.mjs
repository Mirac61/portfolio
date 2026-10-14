import { chromium } from 'playwright';

const outDir = process.argv[2] ?? 'shots';
const ids = ['ventorygo', 'mysh', 'vlanscape', 'kairo'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });

for (const id of ids) {
  await page.click(`button[role="option"]:has-text("${id}")`);
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outDir}/project-${id}.png`, fullPage: true });
}

await browser.close();
console.log(`wrote ${ids.length} project shots to ${outDir}`);
