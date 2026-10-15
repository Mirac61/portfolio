import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

// turns the simple-icons logos into ascii art in the style of src/images/go_logo.txt
// usage: node scripts/ascii-logos.mjs   (writes src/images/<name>_logo.txt, go stays hand-made)
// CHROMIUM_PATH=/path/to/chrome overrides playwright's bundled browser
const iconDir = 'node_modules/simple-icons/icons/';

// stack entry -> simple-icons slug; entries without a logo are rendered as a wordmark
const logos = {
  java: 'openjdk',
  kotlin: 'kotlin',
  'c++': 'cplusplus',
  gin: 'gin',
  'spring boot': 'springboot',
  postgresql: 'postgresql',
  sqlite: 'sqlite',
  keycloak: 'keycloak',
  docker: 'docker',
  'ci/cd': 'githubactions',
  neovim: 'neovim',
  tmux: 'tmux',
  ghostty: 'ghostty',
  yazi: null,
};

// columns of the result; a mono cell is ~0.6em wide and 1.1em tall (line-height of the art)
const cols = 44;
const cellAspect = 0.6 / 1.1;
// light -> dense, same characters as the go logo
const ramp = [' ', '.', ':', '-', '='];

const font = readFileSync('public/fonts/JetBrainsMono-Bold.woff2').toString('base64');

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage();

for (const [name, slug] of Object.entries(logos)) {
  const svg = slug ? readFileSync(`${iconDir}${slug}.svg`, 'utf8') : null;
  const rows = await page.evaluate(
    async ({ svg, word, font, cols, cellAspect, ramp }) => {
      // 8x8 samples per cell, coverage decides the character
      const sub = 8;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      let lines;
      if (svg) {
        const img = new Image();
        img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
        await img.decode();
        // simple-icons are 24x24, square: rows follow from the cell aspect
        const lineCount = Math.round(cols * cellAspect);
        canvas.width = cols * sub;
        canvas.height = lineCount * sub;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        lines = lineCount;
      } else {
        // wordmark in the portfolio's own bold mono font
        const face = new FontFace('Wordmark', `url(data:font/woff2;base64,${font})`);
        document.fonts.add(await face.load());
        const lineCount = 14;
        canvas.width = Math.round(cols * 1.3) * sub;
        canvas.height = lineCount * sub;
        ctx.font = `700 ${canvas.height * 1.05}px Wordmark`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        // a cell is taller than wide: stretch y so the letters keep their shape
        const scale = Math.min(1, canvas.width / (ctx.measureText(word).width * 1.05));
        ctx.setTransform(scale, 0, 0, scale / cellAspect / 1.6, canvas.width / 2, canvas.height / 2);
        ctx.fillText(word, 0, 0);
        lines = lineCount;
      }
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const out = [];
      const width = canvas.width / sub;
      for (let y = 0; y < lines; y++) {
        let line = '';
        for (let x = 0; x < width; x++) {
          let sum = 0;
          for (let sy = 0; sy < sub; sy++) {
            for (let sx = 0; sx < sub; sx++) {
              sum += data[((y * sub + sy) * canvas.width + x * sub + sx) * 4 + 3];
            }
          }
          const coverage = sum / (sub * sub * 255);
          line += ramp[Math.min(ramp.length - 1, Math.round(coverage * (ramp.length - 1) + 0.15))];
        }
        out.push(line.replace(/\s+$/, ''));
      }
      return out;
    },
    { svg, word: name, font, cols, cellAspect, ramp },
  );

  // drop empty rows at top and bottom, and the common left indent
  while (rows.length && !rows[0].trim()) rows.shift();
  while (rows.length && !rows.at(-1).trim()) rows.pop();
  const indent = Math.min(...rows.filter((row) => row.trim()).map((row) => row.match(/^ */)[0].length));
  const art = rows.map((row) => row.slice(indent)).join('\n');

  const file = `src/images/${name.replace(/[^a-z0-9]+/g, '_')}_logo.txt`;
  writeFileSync(file, `${art}\n`);
  console.log(`${file}\n${art}\n`);
}

await browser.close();
