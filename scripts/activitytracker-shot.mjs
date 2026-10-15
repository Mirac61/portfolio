import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

function render(theme) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#121212' : '#ffffff';
  const surface = isDark ? '#1e1e1e' : '#f3f4f6';
  const surface2 = isDark ? '#2c2c2c' : '#ffffff';
  const text = isDark ? '#e5e7eb' : '#111827';
  const textMuted = isDark ? '#9ca3af' : '#6b7280';
  const accent = isDark ? '#60a5fa' : '#2563eb';
  const accent2 = isDark ? '#34d399' : '#059669';
  const accent3 = isDark ? '#fbbf24' : '#d97706';
  const border = isDark ? '#374151' : '#e5e7eb';

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1280px;
  height: 720px;
  background: ${bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Geist Variable", "Inter", system-ui, sans-serif;
}
.phone {
  width: 420px;
  height: 760px;
  background: ${surface};
  border-radius: 32px;
  border: 12px solid ${isDark ? '#0f0f0f' : '#e5e7eb'};
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0,0,0,${isDark ? 0.5 : 0.12});
  display: flex;
  flex-direction: column;
}
.statusbar {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  color: ${text};
  font-size: 12px;
  font-weight: 600;
}
.appbar {
  padding: 18px 22px;
  color: ${text};
}
.appbar h1 { font-size: 24px; font-weight: 700; }
.appbar p { font-size: 13px; color: ${textMuted}; margin-top: 2px; }
.chart {
  margin: 0 22px 20px;
  padding: 18px;
  background: ${surface2};
  border-radius: 18px;
  border: 1px solid ${border};
}
.chart-title { font-size: 13px; color: ${textMuted}; margin-bottom: 14px; }
.bars { display: flex; align-items: flex-end; justify-content: space-between; height: 140px; gap: 10px; }
.bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.bar {
  width: 100%;
  border-radius: 8px 8px 4px 4px;
  min-height: 18px;
  background: ${accent};
}
.bar.b2 { background: ${accent2}; }
.bar.b3 { background: ${accent3}; }
.bar-label { font-size: 11px; color: ${textMuted}; }
.summary {
  margin: 0 22px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.card {
  background: ${surface2};
  border: 1px solid ${border};
  border-radius: 16px;
  padding: 16px;
}
.card-value { font-size: 26px; font-weight: 700; color: ${text}; }
.card-label { font-size: 12px; color: ${textMuted}; margin-top: 4px; }
.list {
  flex: 1;
  margin: 0 22px 22px;
  background: ${surface2};
  border: 1px solid ${border};
  border-radius: 16px;
  overflow: hidden;
}
.list-header {
  padding: 14px 18px;
  font-size: 13px;
  font-weight: 600;
  color: ${text};
  border-bottom: 1px solid ${border};
}
.item {
  padding: 14px 18px;
  border-bottom: 1px solid ${border};
  display: flex;
  align-items: center;
  gap: 12px;
}
.item:last-child { border-bottom: none; }
.dot { width: 10px; height: 10px; border-radius: 50%; background: ${accent}; flex-shrink: 0; }
.dot.d2 { background: ${accent2}; }
.dot.d3 { background: ${accent3}; }
.item-text { flex: 1; }
.item-title { font-size: 14px; color: ${text}; font-weight: 500; }
.item-meta { font-size: 12px; color: ${textMuted}; margin-top: 1px; }
.item-time { font-size: 13px; color: ${text}; font-weight: 600; }
</style>
</head>
<body>
<div class="phone">
  <div class="statusbar">
    <span>9:41</span>
    <span>••• 📶 🔋</span>
  </div>
  <div class="appbar">
    <h1>Activity Tracker</h1>
    <p>Offline-first · WorkManager · Spring Boot</p>
  </div>
  <div class="chart">
    <div class="chart-title">Aktivitäten diese Woche</div>
    <div class="bars">
      <div class="bar-wrap"><div class="bar" style="height:45%"></div><div class="bar-label">Mo</div></div>
      <div class="bar-wrap"><div class="bar b2" style="height:70%"></div><div class="bar-label">Di</div></div>
      <div class="bar-wrap"><div class="bar b3" style="height:55%"></div><div class="bar-label">Mi</div></div>
      <div class="bar-wrap"><div class="bar" style="height:85%"></div><div class="bar-label">Do</div></div>
      <div class="bar-wrap"><div class="bar b2" style="height:60%"></div><div class="bar-label">Fr</div></div>
      <div class="bar-wrap"><div class="bar" style="height:35%"></div><div class="bar-label">Sa</div></div>
      <div class="bar-wrap"><div class="bar b3" style="height:40%"></div><div class="bar-label">So</div></div>
    </div>
  </div>
  <div class="summary">
    <div class="card"><div class="card-value">12.4 km</div><div class="card-label">Distanz gesamt</div></div>
    <div class="card"><div class="card-value">4h 20m</div><div class="card-label">Aktive Zeit</div></div>
  </div>
  <div class="list">
    <div class="list-header">Letzte Aktivitäten</div>
    <div class="item">
      <div class="dot"></div>
      <div class="item-text"><div class="item-title">Laufen</div><div class="item-meta">Heute · 6.2 km · 42 min</div></div>
      <div class="item-time">Synced</div>
    </div>
    <div class="item">
      <div class="dot d2"></div>
      <div class="item-text"><div class="item-title">Radfahren</div><div class="item-meta">Gestern · 18.5 km · 55 min</div></div>
      <div class="item-time">Synced</div>
    </div>
    <div class="item">
      <div class="dot d3"></div>
      <div class="item-text"><div class="item-title">Krafttraining</div><div class="item-meta">Vorgestern · 62 min</div></div>
      <div class="item-time">Pending</div>
    </div>
  </div>
</div>
</body>
</html>`;
  return html;
}

const browser = await chromium.launch();

for (const theme of ['dark', 'light']) {
  const htmlPath = `/tmp/activitytracker-${theme}.html`;
  writeFileSync(htmlPath, render(theme));
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
  await page.screenshot({
    path: `/Users/mirac/code/personal/Webseiten/Portfolio/public/media/activitytracker-${theme}.webp`,
    type: 'webp',
    quality: 90,
  });
  console.log(`wrote activitytracker-${theme}.webp`);
  await page.close();
}

await browser.close();
