# CloudFlow

A fictional AI-powered cloud monitoring website, built as a frontend portfolio project.
Everything in it (companies, people, metrics, AI answers) is made up. There is no backend.

**Stack:** React, Vite, Tailwind CSS, React Router, Recharts, Lucide icons.

## Run it on your computer

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the link it prints (usually http://localhost:5173).

To test the production version:

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to vercel.com, choose **Add New > Project**, and import the repository.
3. Vercel detects Vite by itself. Leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**.

`vercel.json` makes direct links like `/pricing` work when someone refreshes the page.

### After your first deploy
Replace `https://cloudflow-xi.vercel.app` with your real address in:
- `index.html` (canonical and Open Graph tags)
- `src/lib/constants.js`
- `public/robots.txt`
- `public/sitemap.xml`

## Folder guide

```
src/
  components/
    ui/          Button, Card, Badge, Tabs, Segmented, Logo...
    layout/      Navbar, Footer, Layout
    shared/      Pricing cards, FAQ list, feature grid, contact form...
    home/        Sections of the home page
    dashboard/   Charts, service table, incidents, events
    advisor/     The AI Advisor chat (scripted demo)
  pages/         One file per route
  data/mock.js   All mock data in one place
  context/       Theme (dark/light) and toast notifications
  hooks/         Scroll reveal, page meta tags, chart colors
```

## Good to know
- The AI Advisor uses scripted answers in `src/data/mock.js`. No API key is used.
- Pages that do not exist in the demo (Careers, Docs, Privacy, Terms, social links) show a toast instead of a broken link.
- Dark mode is the default. The choice is saved in the browser.
- Animations switch off for people who prefer reduced motion.

## Ideas for Version 2
Real login, a database for incidents, a backend that calls an AI model, and live cloud metrics.
