import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';

const output = readFileSync('/tmp/yawntest_output.txt', 'utf-8')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/✓/g, '<span class="ok">✓</span>')
  .replace(/✗/g, '<span class="err">✗</span>');

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1280px;
  height: 720px;
  background: #0b0b0d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "JetBrains Mono", "SF Mono", Menlo, monospace;
}
.window {
  width: 1040px;
  height: 620px;
  background: #131316;
  border-radius: 12px;
  border: 1px solid #27272a;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.55);
}
.titlebar {
  height: 34px;
  background: #1c1c1f;
  border-bottom: 1px solid #27272a;
  display: flex;
  align-items: center;
  padding: 0 14px;
  gap: 8px;
}
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot.r { background: #ff5f57; }
.dot.y { background: #febc2e; }
.dot.g { background: #28c840; }
.title { flex: 1; text-align: center; color: #a1a1aa; font-size: 13px; }
.content {
  padding: 22px 26px;
  color: #e4e4e7;
  font-size: 15px;
  line-height: 1.7;
  white-space: pre;
}
.ok { color: #4ade80; }
.err { color: #f87171; }
.cmd { color: #a78bfa; }
</style>
</head>
<body>
<div class="window">
  <div class="titlebar">
    <div class="dot r"></div>
    <div class="dot y"></div>
    <div class="dot g"></div>
    <div class="title">mirac@macbook: ~/yawntest</div>
  </div>
  <div class="content"><span class="cmd">$ ./yawntest run _example/</span>\n${output}</div>
</div>
</body>
</html>`;

const htmlPath = '/tmp/yawntest-shot.html';
writeFileSync(htmlPath, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
await page.screenshot({ path: '/Users/mirac/code/personal/Webseiten/Portfolio/public/media/yawntest.webp', type: 'webp', quality: 90 });
await browser.close();
console.log('wrote public/media/yawntest.webp');
