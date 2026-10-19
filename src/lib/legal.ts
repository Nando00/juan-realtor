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
    title: "Privacy Policy",
    updated: "October 18, 2026",
    intro:
      "Your next move should start with clarity. This policy describes how the Lanza Enterprises LLC website collects, uses, and protects your information.",
    sections: [
      {
        heading: "SMS & Mobile Information Privacy",
        paragraphs: [
          "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
        ],
      },
      {
        heading: "How to contact us",
        paragraphs: [
          "Contact Lanza Enterprises LLC at juan@lanzacorporation.com or (832) 379-0358 for business inquiries, messaging support, or privacy questions. Our business address is 14106 Long Glen Dr, Houston, TX 77039.",
          "The LeadConnector chat widget is the only form on this website. The email and phone links open your email or calling application; using those links does not provide SMS marketing consent. This site does not provide user accounts or payment processing.",
        ],
      },
      {
        heading: "LeadConnector chat and SMS opt-in",
        paragraphs: [
          "This site embeds a LeadConnector widget for Lanza Enterprises LLC. Information you submit through the widget, such as your name, phone number, message, consent selections, and any additional fields shown in the widget, is processed by LeadConnector to handle your inquiry and requested communications. Review the consent wording displayed in the widget before submitting.",
          "The widget loads resources from LeadConnector and may process technical information, such as your IP address and browser details, and use browser storage as part of its operation. The provider manages widget submissions and consent records.",
        ],
      },
      {
        heading: "Your choices and retention",
        paragraphs: [
          "You can clear this site’s browser storage through your browser’s site-data settings. Clearing browser data does not delete messages or consent records held by LeadConnector.",
          "For questions about information submitted through the widget, email juan@lanzacorporation.com or call (832) 379-0358.",
          "For our SMS program, reply STOP to a message to withdraw consent or HELP for assistance. Withdrawing consent stops future marketing texts; a record of your consent and withdrawal may remain as needed to honor your choice and meet applicable recordkeeping obligations.",
        ],
      },
      {
        heading: "Images, fonts, and technical requests",
        paragraphs: [
          "Photographs and static assets are served by this website. Your browser requests these files from our website host, which may receive your IP address, browser information, and request details as part of delivering and securing the site.",
          "Typefaces load from Google Fonts. Your browser makes requests to Google's font services, which may receive technical information such as your IP address, browser details, and the requested resource. Google's privacy practices are described at https://policies.google.com/privacy.",
        ],
      },
      {
        heading: "Tracking and sharing",
        paragraphs: [
          "We do not sell, rent, or trade your personal information to third parties or affiliates. Embedded third-party services, including LeadConnector and Google Fonts, make technical requests necessary to provide their services.",
        ],
      },
      {
        heading: "Updates to this policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time to reflect changes in our services or applicable laws. Any updates will be posted on this page with a revised date. You can send privacy questions to juan@lanzacorporation.com or call (832) 379-0358.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updated: "October 18, 2026",
    intro:
      "These terms explain the intended use and limitations of the Lanza Enterprises LLC website (https://www.lanzacorporation.com). Please read them alongside our Privacy Policy.",
    sections: [
      {
        heading: "A place to explore",
        paragraphs: [
          "This site provides general real estate and neighborhood information for the Greater Houston area. Website content is for informational purposes only and does not constitute a binding offer to sell, lease, or finance any specific property. Confirm current property, location, and transaction information directly with Lanza Enterprises LLC before making a real estate decision.",
        ],
      },
      {
        heading: "No representation or appointment",
        paragraphs: [
          "Browsing this website, contacting us, or requesting SMS updates does not automatically create an agency, brokerage, client, or fiduciary relationship. Any formal representation requires a separate written agreement and statutory disclosures.",
          "The LeadConnector widget submits inquiry information to our team. Calling, emailing, or submitting a widget message does not itself reserve a property, guarantee an appointment time, or commit any party to a transaction.",
        ],
      },
      {
        heading: "SMS Messaging Terms of Service",
        paragraphs: [
          "1. Program Description: By opting into Lanza Enterprises LLC SMS services through our website chat widget, you consent to receive text messages regarding real estate inquiries, property updates, appointment reminders, and promotional offers from Lanza Enterprises LLC.",
          '2. Opt-Out Instructions: You can cancel the SMS service at any time. Just text "STOP" to the phone number. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending SMS messages to you again.',
          "3. Help & Support: If you are experiencing issues with the messaging program you can reply with the keyword HELP for more assistance, or you can get help directly at juan@lanzacorporation.com or (832) 379-0358.",
          "4. Carrier Liability & Rates: Carriers are not liable for delayed or undelivered messages. As always, message and data rates may apply for any messages sent to you from us and to us from you. Message frequency varies. If you have any questions about your text plan or data plan, it is best to contact your wireless provider.",
          "5. Privacy Policy: If you have any questions regarding privacy, please read our Privacy Policy at https://www.lanzacorporation.com/privacy-policy.",
          "Consent is not a condition of purchasing a property or service. Only enroll a number you own or are authorized to use. The LeadConnector chat widget is the only form on this website.",
        ],
      },
      {
        heading: "Independent professional advice",
        paragraphs: [
          "Website content is general information and is not legal, financial, mortgage, tax, or investment advice tailored to your circumstances. Consult appropriately qualified professionals before making a real estate decision. No transaction outcome, financing approval, or property value is guaranteed.",
        ],
      },
      {
        heading: "Use the site responsibly",
        paragraphs: [
          "You may use the site for lawful personal and business inquiries. Do not attempt to disrupt the site, bypass security, introduce harmful code, impersonate someone, or misuse another person’s information. Only enter contact information you are authorized to use.",
        ],
      },
      {
        heading: "Content and third-party services",
        paragraphs: [
          "The design, text, images, and materials on this site are protected by applicable intellectual property laws. Third-party services used on this site, including LeadConnector and Google Fonts, are subject to their own terms and privacy practices.",
        ],
      },
      {
        heading: "Availability and limitations",
        paragraphs: [
          'We strive to keep the website accurate and accessible, but the site is provided on an "as-is" basis without warranties of continuous availability. To the extent permitted by applicable law, Lanza Enterprises LLC is not liable for damages arising from temporary interruptions or reliance on general informational content.',
        ],
      },
      {
        heading: "Changes and contact information",
        paragraphs: [
          "We may update these Terms & Conditions as our services evolve. The date at the top of this page identifies the current version.",
          "For questions about these terms or messaging support, contact Lanza Enterprises LLC at juan@lanzacorporation.com or (832) 379-0358. Our business address is 14106 Long Glen Dr, Houston, TX 77039.",
        ],
      },
    ],
  },
};
