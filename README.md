# Mamaw's House Campaign Hub

Static public campaign hub for the Hayes family effort to preserve Mamaw's House in Morristown, Tennessee.

## Campaign

**150,000 Volunteers. $1 each. One Mamaw's House.**

Goal: **$150,000**

Official donation destination: https://gofund.me/3bb4f927d

## Public-site boundary

This repository does not process donations. Every donation action sends the visitor to the official GoFundMe. The site contains no payment fields, donor database, login, analytics SDK, advertising pixels, external JavaScript, local-storage tracking, or background API fetches.

Share actions point to the public campaign hub so supporters can pass the story forward. The campaign hub then sends donation actions to GoFundMe.

## Family-language lock

Public copy uses the Hayes family wording established for this campaign: **Mamaw**, **Papaw**, **Hayes**. Individual people in archive photographs are not named unless separately verified and approved.

## Deployment

Expected GitHub Pages URL: https://dinididit.github.io/MAMAWHOUSE/

Source: `main` branch, repository root.

Production files:
- `index.html`
- `styles.css`
- `campaign-data.js`
- `app.js`
- `assets/mamaws-house-hero.jpg`
- three Hayes family archive web-use photographs
- `.nojekyll`

## Release gate

Before calling the site live, verify the public HTTPS page, every donation button, native/fallback share paths, mobile layout, image loading, canonical/Open Graph metadata, and the no-payment/no-tracking boundary.
