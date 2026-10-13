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
- An SMS opt-in form at the end of the page, with a separate, initially unchecked consent checkbox and server-side submission endpoint.
- Privacy Policy and Terms & Conditions in dialogs, keeping the experience on one page.
- Responsive styling and reduced-motion support.

## Content and production setup

This is a Houston-based website concept. The site is branded for Lanza Enterprises LLC. Supplied photographs are illustrative and have not been verified as depicting the named neighborhoods. The photo collection does not represent available inventory.

All 13 supplied JPEG photographs (`IMG_1184.JPEG` through `IMG_1196.JPEG`) are copied from the parent directory into `public/images` and used in the photo collection. Their original files remain unchanged in the parent directory. The website serves the copies locally from `/images/`.

Contact inquiries are **not sent**. The contact form saves a draft in browser local storage and lets the visitor download it. To use this for a live business, connect a contact backend or CRM and replace the preview messaging with the real delivery outcome.

Confirm permission to use the supplied imagery. Add the actual agent name, licensing and brokerage details, required disclosures, and contact information. Have `src/lib/legal.ts` reviewed and completed for the actual business, jurisdiction, hosting provider, messaging provider, and other integrations before launch. Policies describe the present implementation, not legal compliance with all jurisdictions.

Google Fonts load from an external provider; photographs are served by the website host. No analytics or marketing trackers are installed. Inquiry drafts use `lanza-contact-draft` and remain in the visitor's browser. SMS submissions do not use local storage. Visitors to an earlier version can clear any old site data through their browser settings.

## SMS opt-in setup

SMS sign-up is disabled by default. The form clearly displays its preview state; entering information does not create a subscription. `GET /api/sms-opt-in` reports whether a valid integration is configured. Without one, a valid submission to `POST /api/sms-opt-in` returns HTTP 503 and does not claim success.

Configure these **server-only** environment variables in `.env.local` for local development, or in your hosting environment:

```dotenv
SMS_OPT_IN_WEBHOOK_URL=https://your-service.example/sms-opt-in
SMS_OPT_IN_WEBHOOK_TOKEN=your-private-bearer-token
```

`SMS_OPT_IN_WEBHOOK_URL` must be the HTTPS endpoint of a service you control or have selected to manage this program. The token is optional and, when set, is sent as a Bearer authorization header. Do not prefix these variables with `NEXT_PUBLIC_` or commit live credentials. Restart the server after changing environment variables.

The API validates the submitted mobile number and affirmative consent, then forwards an optional name, normalized phone number, consent wording and version, server-generated submission time, source, channel, and purpose to the configured webhook. The application does not log personal information or keep a database of SMS subscriptions. A successful webhook response is the integration's acknowledgment; the route does not itself send texts.

Before enabling sign-up, the receiving service must durably retain the consent record, manage enrollment, and honor unsubscribe requests. Connect the actual messaging provider, configure STOP and HELP handling and a real support contact, complete any required sender or campaign registration, and confirm retention and deletion practices. Do not enable the form against a webhook that merely discards submissions. The form alone does not verify ownership of a number or establish that a number can receive SMS; add provider verification or confirmation where appropriate.

The contact-draft form and SMS form are independent. Saving a contact draft never authorizes SMS marketing. The SMS checkbox starts unchecked, and the disclosed program covers recurring automated Lanza Enterprises LLC marketing texts. Message frequency varies, message and data rates may apply, and consent is not a condition of purchase. Mobile opt-in information must not be sold or shared for third parties' own marketing.

Implementation references: [Twilio Messaging Policy](https://www.twilio.com/en-us/legal/messaging-policy) and [Twilio Messaging Campaign Terms](https://www.twilio.com/en-us/legal/messaging-campaign-terms). No Twilio integration is installed by default, and these references are not a compliance certification.

## Commands

```sh
npm run dev        # Development server
npm run typecheck  # TypeScript check
npm run build      # Production compilation and route generation
npm start          # Serve production build
```
