import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Lanza Realty Group",
  description:
    "Website terms and SMS Messaging Terms of Service for Lanza Realty Group.",
};

export default function TermsAndConditionsPage() {
  return <LegalPage page="terms" />;
}
