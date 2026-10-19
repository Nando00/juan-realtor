import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Lanza Enterprises LLC",
  description:
    "Privacy practices and SMS mobile information privacy for Lanza Enterprises LLC.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage page="privacy" />;
}
