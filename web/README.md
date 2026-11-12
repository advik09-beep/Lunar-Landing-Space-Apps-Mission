# Lane B — Lunar Landing Site Navigator frontend (M0)

Minimal Vite + TypeScript frontend. All site data comes from the Lane A owned `../lib/visibility.js`; no astronomical or visibility computations exist in this frontend.

## Development

Run from the repository root:

```sh
cd web
npm install
npm run dev
```

Open the URL Vite prints. To check/build:

```sh
npm run typecheck
npm run build
npm run preview
```

The output is `web/dist/`. Configure a static hosting provider with **root directory `web`**, **build command `npm run build`**, and **publish directory `dist`** (relative to that root). `vite.config.ts` uses relative asset paths so the built app can also be served from a repository subpath.

The Vite dev server explicitly allows reading the repository root because `web/src/main.ts` imports `../../lib/visibility.js`, which imports `../data/sites.js`. The production build bundles those dependencies. Do not copy or independently mirror Lane A data into `web`.

## M0 acceptance test (not automatically verified)

- [ ] `npm run typecheck` succeeds.
- [ ] `npm run build` succeeds.
- [ ] The local browser page loads **10** landing-site names from `listSites()`.
- [ ] The `MOCK` indicator is visible.
- [ ] Public deployed URL works at desktop and mobile widths.

Do not call M0 passed until a live deployment and the checks above are verified. Later 3D features are intentionally **not** included in this M0 task.
