export type LegalPageId = "privacy" | "terms";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalDocument = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export const legalContent: Record<LegalPageId, LegalDocument> = {
  privacy: {
    title: "Privacy policy",
    updated: "October 18, 2026",
    intro:
      "Your next move should start with clarity. This policy describes how the Lanza Enterprises LLC website concept handles information in its current form.",
    sections: [
      {
        heading: "What stays in your browser",
        paragraphs: [
          "If you save a contact draft, the details you enter are stored in local storage on that browser and device so you can return to your draft later. The embedded LeadConnector chat and SMS opt-in widget is separate from these local drafts.",
          "Saving a contact draft does not send a message to Lanza Enterprises LLC, request a callback, or book an appointment. The separate LeadConnector widget can submit information to our messaging provider. This site does not provide user accounts or payment processing. Please do not enter sensitive financial, identity, or other confidential information.",
        ],
      },
      {
        heading: "LeadConnector chat and SMS opt-in",
        paragraphs: [
          "This site embeds a LeadConnector widget for Lanza Enterprises LLC. Information you submit through the widget, such as your name, phone number, message, consent selections, and any additional fields shown in the widget, is processed by LeadConnector to handle your inquiry and requested communications. Review the consent wording displayed in the widget before submitting.",
          "The widget loads resources from LeadConnector and may process technical information, such as your IP address and browser details, and use browser storage as part of its operation. The provider manages widget submissions and consent records; these are not stored as local contact drafts by this application.",
        ],
      },
      {
        heading: "Your choices and retention",
        paragraphs: [
          "Browser storage can remain until you remove it or your browser clears it. You can delete a contact draft using its controls, or clear this site’s stored information through your browser’s site-data settings. Clearing site data affects only that browser; it does not remove copies you downloaded or information submitted to a connected SMS service.",
          "Local storage is not a private account or a secure document vault. Anyone with access to your browser profile may be able to see information saved there. Storage restrictions or private browsing may prevent the save features from working.",
          "For an active SMS program, reply STOP to a message to withdraw consent or HELP for assistance. Withdrawing consent stops future marketing texts; a record of your consent and withdrawal may remain as needed to honor your choice and meet applicable recordkeeping obligations. LeadConnector account settings and the business’s messaging practices determine retention and support handling; clearing this site’s browser data does not delete records held by the messaging provider.",
        ],
      },
      {
        heading: "Images, fonts, and technical requests",
        paragraphs: [
          "Photographs are served by this website. Your browser requests these files from the website host, which may receive your IP address, browser information, and request details as part of delivering the site.",
          "Typefaces load from Google Fonts. Your browser makes requests to Google's font services, which may receive technical information such as your IP address, browser details, and the requested resource. Google's privacy practices are described at https://policies.google.com/privacy.",
          "A service that hosts this website may also process technical request information to deliver and protect the site. Its specific logging and retention practices depend on the deployment and must be reflected in this policy before a public business launch.",
        ],
      },
      {
        heading: "Tracking and sharing",
        paragraphs: [
          "The site code does not add separate analytics or advertising trackers. Embedded third-party services, including LeadConnector and Google Fonts, make their own technical requests and may process information to provide their services. Saving a local contact draft does not submit it to LeadConnector.",
          "Mobile numbers, SMS opt-in information, and consent records are not sold or shared with third parties for their own marketing or promotional purposes. We may share this information with service providers solely to operate the requested messaging program on our behalf, including maintaining consent and opt-out records.",
        ],
      },
      {
        heading: "About this notice",
        paragraphs: [
          "Lanza Enterprises LLC is presented here as a website concept with illustrative content. This notice describes the current implementation and is not a statement of compliance with every privacy law. Before using the site for an operating business, the operator must identify the business and privacy contact, confirm hosting and messaging practices, and update the notice for actual services and integrations.",
          "Changes to these practices should be reflected here with a revised date and any additional notice required by applicable law. No working privacy-request channel is connected in this concept.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & conditions",
    updated: "October 18, 2026",
    intro:
      "These terms explain the intended use and limitations of the Lanza Enterprises LLC website concept. Please read them alongside the privacy policy.",
    sections: [
      {
        heading: "A place to explore",
        paragraphs: [
          "This site is an informational real estate website concept featuring Houston neighborhood information and illustrative photography. It does not present property inventory, make an offer to sell or lease, or represent that a pictured home is available.",
          "Photographs are a visual collection and have not been verified as depicting the named neighborhoods. Neighborhood descriptions are general introductions. Confirm current property, location, and transaction information with the relevant parties before making a real estate decision.",
        ],
      },
      {
        heading: "No representation or appointment",
        paragraphs: [
          "Browsing, preparing a contact draft, or requesting SMS updates does not create an agency, brokerage, client, fiduciary, or other professional relationship. Any such relationship requires the appropriate separate agreement and disclosures.",
          "The contact-draft dialog saves a draft in your browser only. The separate LeadConnector widget submits information to the messaging provider. Neither preparing a draft nor submitting a widget message reserves a home, schedules a tour, or commits anyone to a transaction.",
        ],
      },
      {
        heading: "Optional SMS updates",
        paragraphs: [
          "Selecting the SMS consent checkbox and submitting the LeadConnector widget authorizes Lanza Enterprises LLC to send recurring automated marketing texts about Houston real estate, neighborhood updates, and real estate services to the mobile number you provide. Consent is not a condition of purchasing a property or service. Only enroll a number you own or are authorized to use.",
          "Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for assistance. You may receive a final confirmation after opting out. Delivery depends on your carrier and network and is not guaranteed.",
          "Chat and SMS opt-in are provided through the embedded LeadConnector widget. Its availability, submission handling, and messaging behavior depend on the provider and the business’s account configuration. SMS information is handled as described in the privacy policy.",
        ],
      },
      {
        heading: "Independent professional advice",
        paragraphs: [
          "The content is general information, not legal, financial, mortgage, tax, or other advice tailored to your circumstances. Consult appropriately qualified professionals before making a real estate decision. No transaction outcome, return, financing approval, or property value is guaranteed.",
        ],
      },
      {
        heading: "Use the site responsibly",
        paragraphs: [
          "You may use the site for lawful personal exploration. Do not attempt to disrupt the site, bypass security, introduce harmful code, impersonate someone, misuse another person’s information, or use its content to misrepresent an actual property or business relationship.",
          "Only enter information you are entitled to use. This concept is not intended to receive confidential documents or sensitive personal information.",
        ],
      },
      {
        heading: "Content and third-party services",
        paragraphs: [
          "The design, text, images, and other materials may be protected by intellectual property rights belonging to their respective owners or licensors. Access to this site does not transfer those rights. Any reuse must be permitted by the applicable license or rights holder.",
          "Third-party links and services, including LeadConnector and Google Fonts, are subject to their own terms and privacy practices. Their inclusion does not establish an endorsement or guarantee their availability or accuracy.",
        ],
      },
      {
        heading: "Availability and limitations",
        paragraphs: [
          "The site is provided as an illustrative concept and may contain errors, interruptions, or incomplete information. Saved information may be lost when browser storage is cleared or unavailable. The site is not promised to be continuously available or suitable for a particular purpose.",
          "To the extent permitted by applicable law, the operator is not responsible for loss resulting from reliance on sample content or interruption of this demonstration. Nothing in these terms excludes rights, remedies, or liability that cannot lawfully be excluded or limited.",
        ],
      },
      {
        heading: "Changes and business launch",
        paragraphs: [
          "The site and these terms may be updated as features change. The date above identifies the current version. Material changes should be communicated as required by applicable law.",
          "Before this concept is used for an operating business, these terms must be reviewed and updated with the actual operator, contact details, services, applicable disclosures, and terms appropriate to that business and its location.",
        ],
      },
    ],
  },
};
