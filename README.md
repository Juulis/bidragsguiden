# BidragsGuiden

En smart plattform som samlar alla offentliga bidrag, stöd och ersättningar i Sverige på ett ställe.

## Live

När GitHub Pages är aktiverat:  
**https://juulis.github.io/bidragsguiden**

## Kom igång lokalt

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000)

## Tester

```bash
npm test          # watch-läge
npm run test:run  # en gång
```

## Branch-strategi

- `main` – produktion (deployas till GitHub Pages)
- `develop` – integrationsbranch
- Feature-branches → PR mot `develop` eller `main`

Alla PR:s kör automatiskt tester + build via GitHub Actions.

## Deploy

Sidan deployas automatiskt till GitHub Pages vid varje push till `main`.

### Aktivera Pages (en gång)
1. Gå till repo → **Settings** → **Pages**
2. Under **Source** välj **GitHub Actions**

## Tech stack

- Next.js 15 (static export)
- React 19
- TypeScript
- Tailwind CSS
- Vitest + Testing Library