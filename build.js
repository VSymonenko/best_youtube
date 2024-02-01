import * as esbuild from 'esbuild';

import { promises as fs } from 'fs';

const OUT_DIR = './dist';
const PUBLIC_DIR = './public';

try {
  await esbuild.build({
    outdir: OUT_DIR,
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}

await fs.cp(PUBLIC_DIR, OUT_DIR, { recursive: true });
