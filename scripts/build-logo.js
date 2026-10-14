import fs from 'node:fs';
import path from 'node:path';

const SOURCE = path.resolve('scripts/logo-source.svg');
const OUTPUT = path.resolve('public/logo.svg');

// gradient stops follow our tokens: light -> --accent -> dark
const STOPS = [
  { t: 0, rgb: [0xc4, 0xb5, 0xfd] },
  { t: 0.55, rgb: [0x8b, 0x5c, 0xf6] },
  { t: 1, rgb: [0x5b, 0x21, 0xb6] },
];
const PANE_BG = [0x11, 0x11, 0x11];
const VIEW_HEIGHT = 192;

function gradientAt(t) {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (t <= b.t) {
      const local = (t - a.t) / (b.t - a.t);
      return a.rgb.map((channel, index) => channel + (b.rgb[index] - channel) * local);
    }
  }
  return STOPS[STOPS.length - 1].rgb;
}

function toHex(rgb) {
  return `#${rgb.map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`;
}

const source = fs.readFileSync(SOURCE, 'utf8');
const rectPattern = /<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" opacity="([\d.]+)"\/>/g;

const rects = [];
let match;
while ((match = rectPattern.exec(source)) !== null) {
  const [, x, y, width, height, opacityRaw] = match;
  const centerY = Number(y) + Number(height) / 2;
  const gradient = gradientAt(centerY / VIEW_HEIGHT);
  const opacity = Number(opacityRaw);
  // bake opacity into a solid color against the pane background:
  // overlapping translucent rects would otherwise show seams
  const solid = gradient.map((channel, index) => PANE_BG[index] * (1 - opacity) + channel * opacity);
  rects.push(`    <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${toHex(solid)}"/>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 192" width="720" height="192" role="img" aria-label="Mirac">
  <g shape-rendering="crispEdges">
${rects.join('\n')}
  </g>
</svg>
`;

fs.writeFileSync(OUTPUT, svg);
console.log(`Wrote ${OUTPUT} with ${rects.length} rects`);
