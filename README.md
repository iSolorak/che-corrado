# Che Corrado

One-page site for chef Che Corrado and Cuina Petita. Next.js (App Router), three languages (`/en`, `/es`, `/de`), set in Libron.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy (pm2, port 9001)

pm2 must be installed once on the server: `npm install -g pm2`.

```bash
git pull
npm run deploy     # install, build, then start or reload the pm2 process
```

The app runs as the pm2 process `che-corrado` on port 9001 (set in `ecosystem.config.js`). Point your reverse proxy at `http://127.0.0.1:9001`.

```bash
npm run logs       # tail the pm2 logs (also written to logs/)
npm run stop       # remove the pm2 process
pm2 startup        # once, so pm2 restarts the app after a reboot
```

## Where things are

- `dictionaries/` — all copy, one file per language
- `lib/site.ts` — phone, email, address, Instagram handles
- `public/img/` — photos; the current ones are placeholders, credited in `public/img/CREDITS.md`
- `components/` — one file per section; shared layout in `sections.module.css`
