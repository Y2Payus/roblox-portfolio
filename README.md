# Roblox Developer Portfolio

Interactive 3D portfolio (HTML, CSS, JavaScript, Three.js, GSAP). No build step.

- `index.html`: main page (hero, about, skills, contact). "View My Work" leads to the Roblox page.
- `roblox.html`: all your Roblox projects with filter tabs.

## Customize

1. `index.html` and `roblox.html`: replace `YourName`, bio, skills, and contact details.
2. `js/projects.js`: edit the `projects` list at the top (title, description, category, tags, play link, code link).
3. Put screenshots in `images/` and reference them as `images/name.png`. For Tools, add the real logo (e.g. `images/figma.png`) and set `image` on that card; it replaces the placeholder icon.
4. Contact form: create a free form at formspree.io and replace `YOUR_FORM_ID` in `index.html`.
5. Colors: change the variables at the top of `css/style.css`.

## Preview locally

Open `index.html` in your browser, or run `npx serve .`

## Deploy

Push to GitHub, then import the repo in Vercel. Framework preset: **Other**. Leave build command and output directory empty.
