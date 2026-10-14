import { chromium } from 'playwright';

const selector = process.argv[2] ?? '#readme';
const out = process.argv[3] ?? 'shots/peek.png';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
await page.locator(selector).scrollIntoViewIfNeeded();
await page.waitForTimeout(200);
await page.screenshot({ path: out });
await browser.close();
console.log(`wrote ${out}`);
