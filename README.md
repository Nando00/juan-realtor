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
- Direct email and phone links in the contact section, footer, and contact dialog. No custom forms or local draft collection.
- A LeadConnector chat and SMS opt-in widget loaded once through the root layout using Next.js Script.
- Directly accessible Privacy Policy (`/privacy-policy`) and Terms & Conditions (`/terms-and-conditions`) with SMS privacy and messaging terms.
- Responsive styling and reduced-motion support.

## Content and production setup

This is a Houston-based website concept. The site is branded for Lanza Enterprises LLC. Supplied photographs are illustrative and have not been verified as depicting the named neighborhoods. The photo collection does not represent available inventory.

All 13 supplied JPEG photographs (`IMG_1184.JPEG` through `IMG_1196.JPEG`) are copied from the parent directory into `public/images` and used in the photo collection. Their original files remain unchanged in the parent directory. The website serves the copies locally from `/images/`.

Business contact: **juan@lanzacorporation.com** · **(832) 379-0358** · **14106 Long Glen Dr, Houston, TX 77039**. Contact actions show these direct links. The LeadConnector widget is the only form on the site; there are no separate contact, lead, appointment, or SMS opt-in forms.

Confirm permission to use the supplied imagery. Add the actual agent name, licensing and brokerage details, required disclosures, and contact information. Have `src/lib/legal.ts` reviewed and completed for the actual business, jurisdiction, hosting provider, messaging provider, and other integrations before launch. Policies describe the present implementation, not legal compliance with all jurisdictions.

Google Fonts load from an external provider; photographs are served by the website host. The site also loads the third-party LeadConnector widget, which handles chat and SMS consent submissions. Widget storage and submission handling are managed by LeadConnector. Visitors to an earlier version can clear any old site data through their browser settings.

## LeadConnector chat widget

The root layout embeds the supplied widget with these attributes:

- Script: https://widgets.leadconnectorhq.com/loader.js
- Resources: https://widgets.leadconnectorhq.com/chat-widget/loader.js
- Widget ID: `6ad594834e3a6a8f9590529e`
- Source: `WEB_USER`
- Loading strategy: `afterInteractive`

The previous custom SMS form and webhook endpoint have been removed so the LeadConnector widget is the only SMS consent collection interface. No webhook environment variables are needed for this integration. The old contact-draft dialog and local draft-saving code have also been removed. Calling or emailing does not collect SMS marketing consent.

Widget appearance, fields, consent wording, policy links, allowed domains, messaging delivery, and STOP/HELP handling are managed in the LeadConnector account. The supplied setup screenshot shows an age-gated setting enabled; this integration preserves the supplied configuration. Confirm the widget settings match the business’s intended program. Installing the script does not verify SMS delivery or campaign approval.

## Commands

```sh
npm run dev        # Development server
npm run typecheck  # TypeScript check
npm run build      # Production compilation and route generation
npm start          # Serve production build
```
