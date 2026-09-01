import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '../public/tiles');

function tile(seed, freq, band) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <filter id="n${seed}" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="4" seed="${seed}" result="t"/>
      <feColorMatrix type="saturate" values="0" in="t" result="g"/>
    </filter>
    <linearGradient id="b${seed}" x1="0" y1="0" x2="${band ? 0 : 1}" y2="${band ? 1 : 0}">
      <stop offset="0%" stop-color="#c8c4bc"/>
      <stop offset="50%" stop-color="#8f8a82"/>
      <stop offset="100%" stop-color="#4a4742"/>
    </linearGradient>
    <radialGradient id="r${seed}" cx="${30 + (seed % 5) * 10}%" cy="${40 + (seed % 3) * 10}%" r="75%">
      <stop offset="0%" stop-color="#d5d1c9"/>
      <stop offset="100%" stop-color="#3f3c38"/>
    </radialGradient>
  </defs>
  <rect width="200" height="200" fill="url(#${seed % 2 ? 'r' : 'b'}${seed})"/>
  <rect width="200" height="200" filter="url(#n${seed})" opacity="0.55"/>
</svg>
`;
}

function liveTile() {
  const cells = [];
  const rng = (s) => {
    let x = s;
    return () => {
      x = (x * 16807) % 2147483647;
      return x / 2147483647;
    };
  };
  const r = rng(42);
  for (let i = 0; i < 28; i++) {
    const cx = 18 + r() * 164;
    const cy = 18 + r() * 164;
    const rx = 10 + r() * 22;
    const ry = 8 + r() * 18;
    const op = 0.12 + r() * 0.28;
    const fill = r() > 0.5 ? '#cfcbc3' : '#6d6963';
    cells.push(`<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${fill}" opacity="${op.toFixed(2)}"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
  <defs>
    <filter id="nlive" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <radialGradient id="glive" cx="45%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#d8d4cc"/>
      <stop offset="100%" stop-color="#2e2c29"/>
    </radialGradient>
  </defs>
  <rect width="220" height="220" fill="url(#glive)"/>
  ${cells.join('\n  ')}
  <rect width="220" height="220" filter="url(#nlive)" opacity="0.22"/>
</svg>
`;
}

const freqs = [0.03, 0.055, 0.08, 0.12, 0.04, 0.09, 0.15, 0.025, 0.07, 0.11, 0.045, 0.13, 0.06, 0.1, 0.035, 0.085];
for (let i = 0; i < 16; i++) {
  const n = String(i + 1).padStart(2, '0');
  writeFileSync(join(dir, `tile-${n}.svg`), tile(i + 11, freqs[i], i % 3 === 0));
}
writeFileSync(join(dir, 'tile-live.svg'), liveTile());
console.log('wrote 16 tiles + tile-live.svg');
