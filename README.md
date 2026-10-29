# BuildNext Community — Website

Premium, responsive, single-page website for **BuildNext Community**, a student-led
technology and innovation community at Chandigarh University, Uttar Pradesh, Unnao, India.

No build step. No backend. No dependencies to install. Open `index.html` in a browser,
or publish the whole folder as a static site.

## Files

- `index.html` — all sections: Hero, About, Programs, Learning Journey, Events,
  Projects, Community, Collaborate With Us (Partners), Team, FAQ, Contact, Footer
- `styles.css` — light navy / electric violet / cyan design system, responsive,
  accessible focus states, reduced-motion support
- `script.js` — mobile nav, active-section highlighting, project filters,
  project learning-goal panels, FAQ accordion, event-interest pre-fill,
  contact-form validation and local draft preparation
- `favicon.svg`, `robots.txt`, `sitemap.xml` — SEO / sharing basics

## Honesty rules built into this site

This site deliberately does **not** invent facts:

- **No awards, statistics, counters or testimonials.** None are claimed anywhere.
- **Events are sample formats only.** Every event card is marked “Coming Soon”
  with no confirmed date. Add a date, venue and registration link only when confirmed.
- **Projects are illustrative demo concepts.** Every project card is labelled
  “Illustrative demo project” and is not presented as a community achievement.
- **Partners:** no logos or endorsements are shown. The Partners section is a
  “Collaborate With Us” invitation. Add a partner only after it is confirmed
  and approved, with a name/link supplied by the partner.
- **Team:** placeholder names/roles with initials only — no invented
  biographies or photographs. Replace only with approved information.
- **Contact form does not send messages.** No backend is connected. The form
  validates input and prepares a draft in the browser, with a clear on-page
  notice. Connect a backend/email service before presenting it as live.

## Before publishing — edit these placeholders

Search the source for `EDIT:` and `to be added`:

1. **Contact email** (`index.html`, EDIT: CONTACT) — add the official email.
2. **Social links** (`index.html`, EDIT: SOCIAL) — replace each placeholder
   button with a real `<a href="…">` link once the official profile is confirmed.
3. **Team** (`index.html`, EDIT: TEAM) — replace placeholder names/roles with
   approved details; add a photo only with that person's permission.
4. **Events** — when an event is confirmed, replace its “Coming Soon” pill with
   the date/venue and a registration link.
5. **Live URL** — update `robots.txt` / `sitemap.xml` if the site is published
   at a different address than `https://buildnextcommunity.in`.

## Publish free (any one)

1. **Netlify Drop** — go to app.netlify.com/drop and drag this folder in.
   You get a live URL in about 30 seconds.
2. **GitHub Pages** — push this folder to a repository → Settings → Pages →
   Deploy from branch (main / root).
3. **Vercel** — import the repository/folder at vercel.com/new
   (framework preset: Other / static).

The official BuildNext site already lives at https://buildnextcommunity.in.
This folder is a standalone front-end build — do not overwrite the live
platform with it without the community team's approval.

## Accessibility & quality notes

- Semantic landmarks, skip link, labelled form fields, visible focus states,
  keyboard-friendly accordion/filter controls, `aria-live` feedback.
- Colour contrast uses deep navy text on light backgrounds; cyan/violet are
  accents, not sole carriers of meaning.
- Animations are restrained and fully disabled under
  `prefers-reduced-motion`.
- Layout uses fluid grids with no fixed widths that overflow on mobile.
