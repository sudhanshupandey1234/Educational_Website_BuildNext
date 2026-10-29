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

## Before publishing — edit these placeholders (one place)

All editable contact/team details live in **`SITE_CONFIG` at the top of
`script.js`**. Fill in only verified information; leave a field empty
(`""`) and the site keeps its clearly labelled placeholder instead of
inventing a detail.

1. **Team** — `SITE_CONFIG.team` has one entry per team card (slots 1–6):
   `{ name, role, bio, initials }`. Add a person's name/role only when
   they have provided and approved it; add a bio only with their
   approval. No photographs are used — initials circles only. Until a
   name is entered, that card stays a labelled "Placeholder" card.
2. **Official email** — `SITE_CONFIG.officialEmail`. Until set, the
   contact section shows "Official email — to be added".
3. **Social links** — `SITE_CONFIG.social` (`instagram`, `linkedin`,
   `github`, `youtube`). A filled URL becomes a real link that opens in
   a new tab; an empty one stays a labelled placeholder button that
   explains the link has not been added yet.
4. **Community joining link** — `SITE_CONFIG.joinUrl`. Until set, the
   Community section shows a "to be added" note and the working
   fallback is the contact form ("Join BuildNext Community").
5. **Events** — when an event is confirmed, replace its “Coming Soon” pill with
   the date/venue and a registration link.
6. **Live URL** — `robots.txt` / `sitemap.xml` point at the GitHub Pages
   URL `https://sudhanshupandey1234.github.io/Educational_Website_BuildNext/`.
   Update them only if the site moves to a different address.

## What was checked (improvement pass, 2026-10-29)

- Every navigation link, CTA, program card button, project filter,
  FAQ item, event-interest button and the back-to-top button was
  exercised in a real browser engine (headless Chromium interaction
  test) and, after publishing, in a live-browser check of the
  GitHub Pages URL. The contact form was tested empty (errors shown,
  first invalid field focused), valid (draft prepared, copy button
  offered), and the draft-copy path includes a fallback for browsers
  without the Clipboard API. The form states on the page that it does
  not send messages until a backend/email integration is configured.
- No dead `href="#"` links; the only external link is the verified
  official site `https://buildnextcommunity.in` (HTTP 200).
- Screenshots at 360 / 390 / 768 / 1280 px widths: no horizontal
  overflow. Keyboard: Tab reaches every control, Escape closes the
  mobile menu, focus states are visible, and smooth scrolling is
  disabled under `prefers-reduced-motion`.
- Page weight is ~83 KB total (no images, no framework); the only
  third-party request is Google Fonts with `display=swap` and system
  fallbacks.

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
