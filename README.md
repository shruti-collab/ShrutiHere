# My Portfolio (React + Vite + Tailwind + TypeScript)

## Run
    npm install
    npm run dev       # http://localhost:5173
    npm run build     # production build in /dist

## Edit
- All text, links, roles, timeline, awards, gallery captions: `src/data.js`
- Images: `public/images/` (see `public/images/README.md` for every file and size)
- GitHub chart: set `githubUser` in `src/data.js` (loads your real contribution calendar)
- Colors / theme: variables at the top of `src/styles.css`
- Loader: `src/components/Preloader.jsx`  |  Scroll animations: `src/components/ScrollEffects.jsx`

## Structure (shadcn-style)
- `src/components/ui/` holds the reusable components: `contribution-skyline.tsx`, `polaroid-line-carousel.tsx`
- `components.json` and the `@/` import alias are set up, so `npx shadcn@latest add <component>` works.
- Keeping UI components in `components/ui` matters because shadcn's CLI and the `@/components/ui/...` imports expect that path.

## Deploy
Push to GitHub, import the repo on Vercel or Netlify (build: `npm run build`, output: `dist`).
