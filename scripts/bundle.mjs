import { build } from 'esbuild'

// Bundle the already-compiled ESM output (build/index.js) into a single
// minified, dependency-free ESM file usable directly in the browser via a
// bundler or `<script type="module">` / CDN (unpkg, jsdelivr).
await build({
    entryPoints: ['build/index.js'],
    bundle: true,
    format: 'esm',
    minify: true,
    target: ['es2020'],
    sourcemap: true,
    outfile: 'build/browser/mocker-data-generator.min.js'
})

console.log('✔ browser bundle → build/browser/mocker-data-generator.min.js')
