# Lanza Enterprises LLC

A single-page, Houston-based real estate website built with Next.js App Router, React, and TypeScript. Warm ivory, red, and charcoal styling, responsive layouts, and locally served photography.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. To validate a production build, run `npm run build`; then run `npm start` to serve it.

## Features

- A photo collection accessible from the hero, using all 13 supplied photographs.
- A streamlined page without property listings, fictional prices, search, sale/rental controls, or saved homes.
- Houston Heights, Montrose, Memorial, and Oak Forest neighborhood content.
- Houston-focused introduction, agent information, and process sections.
- Mobile navigation and keyboard-accessible dialogs.
- Contact inquiry draft saved locally, with download and deletion controls.
- A LeadConnector chat and SMS opt-in widget loaded once through the root layout using Next.js Script.
- Privacy Policy and Terms & Conditions in dialogs, keeping the experience on one page.
- Responsive styling and reduced-motion support.

## Content and production setup

This is a Houston-based website concept. The site is branded for Lanza Enterprises LLC. Supplied photographs are illustrative and have not been verified as depicting the named neighborhoods. The photo collection does not represent available inventory.

All 13 supplied JPEG photographs (`IMG_1184.JPEG` through `IMG_1196.JPEG`) are copied from the parent directory into `public/images` and used in the photo collection. Their original files remain unchanged in the parent directory. The website serves the copies locally from `/images/`.

The contact-draft dialog does **not send** inquiries. It saves a draft in browser local storage and lets the visitor download it. To use this for a live business, connect a contact backend or CRM and replace the preview messaging with the real delivery outcome.

Confirm permission to use the supplied imagery. Add the actual agent name, licensing and brokerage details, required disclosures, and contact information. Have `src/lib/legal.ts` reviewed and completed for the actual business, jurisdiction, hosting provider, messaging provider, and other integrations before launch. Policies describe the present implementation, not legal compliance with all jurisdictions.

Google Fonts load from an external provider; photographs are served by the website host. The site also loads the third-party LeadConnector widget, which handles chat and SMS consent submissions. Inquiry drafts use `lanza-contact-draft` and remain in the visitor's browser. Widget storage and submission handling are managed by LeadConnector. Visitors to an earlier version can clear any old site data through their browser settings.

## LeadConnector chat widget

The root layout embeds the supplied widget with these attributes:

- Script: https://widgets.leadconnectorhq.com/loader.js
- Resources: https://widgets.leadconnectorhq.com/chat-widget/loader.js
- Widget ID: `6ad594834e3a6a8f9590529e`
- Source: `WEB_USER`
- Loading strategy: `afterInteractive`

The previous custom SMS form and webhook endpoint have been removed so the LeadConnector widget is the only SMS consent collection interface. No webhook environment variables are needed for this integration. The contact-draft dialog collects no phone number or SMS consent and remains local to the browser.

Widget appearance, fields, consent wording, policy links, allowed domains, messaging delivery, and STOP/HELP handling are managed in the LeadConnector account. The supplied setup screenshot shows an age-gated setting enabled; this integration preserves the supplied configuration. Confirm the widget settings match the business’s intended program. Installing the script does not verify SMS delivery or campaign approval.

## Commands

```sh
npm run dev        # Development server
npm run typecheck  # TypeScript check
npm run build      # Production compilation and route generation
npm start          # Serve production build
```
