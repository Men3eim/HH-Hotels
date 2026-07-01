# H&H Hotels

Static multi-page website for the H&H Hotels UK hospitality portfolio.

## Preview

```bash
npm run build
npm start
```

Then open `http://localhost:4174/`

## Structure

- `index.html` - homepage (generated)
- `hotels/` - listing and hotel detail pages (generated)
- `about/`, `careers/`, `contact/` - supporting pages (generated)
- `data/hotels.js` - single source of truth for hotel content
- `scripts/build-site.js` - static site generator
- `scripts/build-check.js` - post-build validation
- `assets/js/site.js` - header, filters, hero carousel, sticky booking CTA
- `styles.css` - shared visual design and responsive layout

## Editing content

1. Update `data/hotels.js`
2. Run `npm run build`

## Contact

- Email: `Info@hh-hotels.com`
- Phone: `020 8152 9133`
