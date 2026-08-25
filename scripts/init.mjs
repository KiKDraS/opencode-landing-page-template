import { readFile, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';
import readline from 'node:readline/promises';

const PKG_PATH = 'package.json';
const TEMPLATE_NAME = 'opencode-landing-page-template';

try {
  const pkg = JSON.parse(await readFile(PKG_PATH, 'utf8'));

  // Already initialized, CI, or non-interactive stdin: exit silently, no prompt.
  if (pkg.name !== TEMPLATE_NAME || process.env.CI || !process.stdin.isTTY) {
    process.exit(0);
  }

  const fallback = basename(process.cwd());
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let input;
  try {
    input = await rl.question(`Project name [${fallback}]: `);
  } finally {
    rl.close();
  }

  const clean = (s) =>
    s
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-._]/g, '')
      .replace(/^[._]+/, ''); // strip leading ./_ — "../.." breaks node_modules resolution
  const sanitized = clean(input.trim() || fallback) || clean(fallback) || TEMPLATE_NAME;

  // Mutate in place: preserves existing key order.
  pkg.name = sanitized;
  pkg.version = '0.1.0';

  await writeFile(PKG_PATH, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`package.json → ${sanitized} v0.1.0`);
} catch (err) {
  if (err.name === 'AbortError' || /Ctrl\+D|canceled/i.test(err.message)) {
    console.log('init: cancelled');
    process.exit(0);
  }
  console.error(`init: failed to read/parse ${PKG_PATH}: ${err.message}`);
  process.exit(1);
}