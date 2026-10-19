import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Lanza Enterprises LLC",
  description:
    "Website terms and SMS Messaging Terms of Service for Lanza Enterprises LLC.",
};

export default function TermsAndConditionsPage() {
  return <LegalPage page="terms" />;
}
