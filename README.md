This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Build y despliegue

`npm run build` exporta el sitio estático a `out/` (Cloudflare Workers, ver `wrangler.toml`). Dos hooks de npm lo acompañan:

- `prebuild` (`scripts/fetch-fonts.mjs`): descarga de Fontshare las fuentes que falten en `src/fonts/`. `predev` hace lo mismo e incluye las de `/lab`. Las `.woff2` no se versionan por licencia (ver `src/fonts/LICENSE-fonts.txt`).
- `postbuild` (`scripts/flatten-prefetch.mjs`): el export de Next escribe los payloads de prefetch en carpetas (`ciclo/__next.ciclo/__PAGE__.txt`), pero el cliente los pide con nombre plano (`ciclo/__next.ciclo.__PAGE__.txt`), y sin este paso cada `Link` genera un 404 en consola. El script duplica cada payload con nombre plano. Termina con error si no encuentra ningún `__next.*/__PAGE__.txt`, para que un cambio interno de Next rompa el build en lugar de fallar en silencio. `trailingSlash: true` se probó y no lo resuelve. En Vercel el export no trae esos payloads en carpetas: ahí el script avisa, lista los archivos `__next*` que sí hay y continúa sin error, porque el aplanado es solo para Cloudflare Workers. Si los payloads ya vienen con nombre plano, tampoco hace nada.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
