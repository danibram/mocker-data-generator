---
'mocker-data-generator': major
---

Modernize to a dual ESM + CommonJS, zero-runtime-dependency package (v4).

- **Dual ESM + CJS** output that runs natively in Node `>=20` and in the browser.
  Both `import mocker from 'mocker-data-generator'` and
  `require('mocker-data-generator')` work, resolved via conditional `exports`.
- Added an `exports` map with per-condition types, plus `unpkg`/`jsdelivr` fields
  pointing to a minified, self-contained ESM browser bundle (`esbuild`).
- Bumped all dependencies to their latest versions (faker 10, TypeScript 6,
  ava 8, typedoc 0.28, …).
- Replaced the dead/deprecated toolchain: tslint + prettier → Biome,
  standard-version + conventional-github-releaser → changesets, nyc → c8,
  removed the deprecated `codecov` package.
- Removed the now-unnecessary `Array.prototype.includes` polyfill.
- Fixed `Generator.custom` to honor the documented `adapter` option (previously
  declared in the type but never invoked).
