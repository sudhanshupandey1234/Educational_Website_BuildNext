# BuildNext Community — Website

A responsive, single-page website for **BuildNext Community**, a student-led
technology community at Chandigarh University, Uttar Pradesh, Unnao, India.

No build step. No backend. No dependencies to install. Open `index.html` in a browser,
or publish the whole folder as a static site.

Live site (GitHub Pages): https://sudhanshupandey1234.github.io/Educational_Website_BuildNext/

## Files

- `index.html` — all sections: Hero, About, Programs, Learning Journey, Events,
  Project Ideas, Community, Collaborate With Us (Partners), Team, FAQ, Contact, Footer
- `styles.css` — light navy / electric violet / cyan design system, responsive,
  accessible focus states, reduced-motion support
- `script.js` — `SITE_CONFIG` (team, email, social links, joining link), mobile nav,
  active-section highlighting, project-idea filters, learning-goal panels,
  FAQ accordion, event-interest pre-fill, contact-form validation and local
  draft preparation
- `favicon.svg`, `robots.txt`, `sitemap.xml` — SEO / sharing basics, pointing
  at the GitHub Pages URL

## How this site stays honest

- **No awards, statistics, counters or testimonials.** None are claimed anywhere.
- **Events:** every event card is marked “Coming Soon” with no confirmed date.
  Add a date, venue and registration link only when confirmed.
- **Project Ideas:** the six cards are ideas for future learning projects, not
  completed projects. The section says so in one short note.
- **Partners:** no logos or endorsements are shown. The Partners section is a
  “Collaborate With Us” invitation. Add a partner only after it is confirmed
  and approved, with a name/link supplied by the partner.
- **Team:** the eight members and roles in `SITE_CONFIG.team` are the details
  supplied by the community lead. Names and roles only — no biographies,
  photographs, social handles or achievements are invented.
- **Contact form does not send messages.** No backend is connected. The form
  validates input and prepares a draft in the browser, with a clear on-page
  notice. Connect a backend/email service before presenting it as live.

## Editing details — one place: `SITE_CONFIG` in `script.js`

Fill in only verified information. Email, social links and the joining link
are shown on the page **only when a value is set**; empty values show nothing,
so no fake address, empty icon or dead link ever appears.

1. **Team** — `SITE_CONFIG.team`, one entry per card (slots 1–8):
   `{ name, role, initials }`. Names and roles only; initials circles only.
2. **Official email** — `SITE_CONFIG.officialEmail`. Shown as a mailto link
   in the contact details only when set.
3. **Social links** — `SITE_CONFIG.social` (`instagram`, `linkedin`,
   `github`, `youtube`). A filled URL becomes a real link that opens in
   a new tab; empty entries are not shown at all.
4. **Community joining link** — `SITE_CONFIG.joinUrl`. When set, a link
   appears in the Community section; until then, joining goes through
   the contact form.
5. **Events** — when an event is confirmed, replace its “Coming Soon” pill with
   the date/venue and a registration link.
6. **Live URL** — `robots.txt`, `sitemap.xml` and the page canonical URL point
   at the GitHub Pages URL above. Update them only if the site moves to a
   different address, and only with confirmation.

## Checks run before publishing (final pass, 2026-10-29)

- Headless Chromium interaction test, 26 checks at 360 / 390 / 768 / 1280 px:
  navigation, all five program CTAs and subject prefill, project-idea filters
  and learning-goal panels, FAQ expand/collapse, mobile menu open/Escape-close,
  form validation (empty and valid), draft generation, copy feedback, team
  names/roles, hidden-unconfigured-fields behaviour, and no horizontal
  overflow. No console errors were recorded. In the headless shell, where
  neither clipboard method is available, the copy button correctly shows
  the honest “copy did not work” message; in a real browser the same code
  path shows “Draft copied.” (verified in the previous live-browser check).
- A filled-`SITE_CONFIG` test copy confirmed that setting an email, a social
  URL and a joining link makes exactly those items appear — and nothing else.
- No dead `href="#"` links; the only external link is the verified
  official site `https://buildnextcommunity.in` (HTTP 200).
- Keyboard: Tab reaches every control, Escape closes the mobile menu, focus
  states are visible, and smooth scrolling is disabled under
  `prefers-reduced-motion`.
- Page weight is under 100 KB total (no images, no framework); the only
  third-party request is Google Fonts with `display=swap` and system
  fallbacks. After each push, the published GitHub Pages URL is re-checked
  (HTTP 200 + new content present) before the change is reported as live.

## Accessibility & quality notes

- Semantic landmarks, skip link, labelled form fields, visible focus states,
  keyboard-friendly accordion/filter controls, `aria-live` feedback.
- Colour contrast uses deep navy text on light backgrounds; cyan/violet are
  accents, not sole carriers of meaning.
- Animations are restrained and fully disabled under
  `prefers-reduced-motion`.
- Layout uses fluid grids with no fixed widths that overflow on mobile.
