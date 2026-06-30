# H&H Hotels

Static multi-page website for the H&H Hotels UK hospitality portfolio.

## Preview

Run a local static server from this folder:

```bash
python3 -m http.server 4174
```

Then open:

```text
http://localhost:4174/index.html
```

## Structure

- `index.html` - homepage with portfolio, about and careers sections.
- `hotels/*.html` - one dedicated page for each hotel.
- `data.js` - editable hotel names, descriptions, image lists and Booking.com links.
- `styles.css` - shared visual design and responsive layout.
- `app.js` - homepage rendering and animations.
- `hotel.js` - hotel detail page rendering and galleries.

## Careers Contact

- Email: `hr@hh-hotels.co.uk`
- Phone: `02081529133`

## Notes

Booking.com blocked programmatic access with a verification page during development, so the descriptions are concise, editable summaries written for the site while the Booking.com links use the URLs provided.
