# davidgorman.dev

Personal portfolio site. Plain HTML, CSS and JavaScript with no build step and no third-party requests.
Pushing changes under `site/` to `main` deploys to the web server automatically (see `.github/workflows/deploy.yaml`).

## Structure

```
site/                     everything in here is deployed
  index.html              Home
  projects/               Projects index + one folder per project
  writeups/               Write-ups index (add one folder per write-up)
  now/                    Now page
  about/                  About page
  404.html
  assets/css/style.css    all styling (colours and fonts are variables at the top)
  assets/js/main.js       click-to-reveal email + footer year
  assets/fonts/           IBM Plex Sans / Mono, self-hosted (SIL OFL 1.1)
templates/                page templates, NOT deployed
  project.html
  writeup.html
```

## Adding content

- **New write-up:** copy `templates/writeup.html` to `site/writeups/<slug>/index.html`, fill it in, then add a row
  to `site/writeups/index.html` and the "Latest write-ups" list on `site/index.html`
  (an example row is in an HTML comment in both files).
- **New project:** copy `templates/project.html` to `site/projects/<slug>/index.html` and add a row to
  `site/projects/index.html` (and the Home page if it's a featured one).
- **Placeholders** are in `[square brackets]`. Find any left before pushing:
  `grep -rn '\[' site --include=*.html`
- **LinkedIn:** replace `YOUR-HANDLE` in every page: `grep -rl YOUR-HANDLE site`

The header and footer are repeated on every page. If you change one, change them all.

## Contact email

The address is never written in the HTML. `main.js` puts it together only when a visitor clicks
"Show email address", which keeps it away from most scrapers. Don't add it to page text, titles or meta tags.

## Preview locally

```
cd site && python3 -m http.server 8000
```

Then open http://localhost:8000 (paths are root-relative, so opening the files directly won't load the styles).

## Recommended security headers (web server config)

The site loads nothing from other domains and has no inline scripts, so a strict policy works:

```
Content-Security-Policy: default-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Keep it that way: no inline `style="..."` attributes, `<style>` blocks or `<script>` blocks in the HTML. Put styling in `style.css` and scripts in `assets/js/`, or the CSP will block them.
