# Portfolio

Next.js (App Router) + TypeScript. No UI or styling dependencies.

```bash
npm install
npm run dev
```

## Add your details

Edit `app/profile.ts`. The page is the `<Portfolio />` component in
`components/Portfolio.tsx`, which takes everything as props
(see `types/portfolio.ts` for the shape). You can also use it directly:

```tsx
<Portfolio name="..." role="..." experience={[...]} />
```

Only `name` and `role` are required. A section with no data is hidden.

## Notes

- Experience entries are linked into a SHA-256 hash chain at render time
  (`lib/chain.ts`). Change an entry and its hash, and every newer hash, changes.
- `lib/chain.ts` uses `node:crypto`, so `Portfolio` must stay a server component.
- Colors live in the `:root` variables at the top of `app/globals.css`.
  Light and dark follow the visitor's system setting.
