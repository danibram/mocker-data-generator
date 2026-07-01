import { copyFile } from 'node:fs/promises'
import { build } from 'esbuild'

// The ESM build (build/index.js + per-file output & .d.ts) is produced by tsc.
// From that already-compiled, dependency-free ESM entry we derive:
//   1. a CommonJS entry (build/index.cjs) for `require()` consumers, and
//   2. a minified, self-contained ESM browser bundle for CDN / <script type=module>.
// Bundling from the compiled output (not src) sidesteps .js->.ts resolution, and
// leaving the CJS build un-minified keeps the identifiers that direct `eval` relies on.

// 1. CommonJS entry
await build({
    entryPoints: ['build/index.js'],
    bundle: true,
    format: 'cjs',
    platform: 'node',
    target: ['es2020'],
    sourcemap: true,
    outfile: 'build/index.cjs'
})
// Reuse the ESM declarations for the `require` condition.
await copyFile('build/index.d.ts', 'build/index.d.cts')
console.log('✔ commonjs entry  → build/index.cjs (+ build/index.d.cts)')

// 2. Minified browser bundle
await build({
    entryPoints: ['build/index.js'],
    bundle: true,
    format: 'esm',
    minify: true,
    target: ['es2020'],
    sourcemap: true,
    outfile: 'build/browser/mocker-data-generator.min.js'
})
console.log('✔ browser bundle  → build/browser/mocker-data-generator.min.js')
