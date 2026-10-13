export const SMS_CONSENT_VERSION = "2026-10-13";

export const SMS_CONSENT_TEXT =
  "I agree to receive recurring automated marketing text messages from Lanza Enterprises LLC about homes, real estate updates, and services at the number provided. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.";

/** Accept common US phone formatting and return the international +1 format. */
export function normalizeSmsPhone(value: string): string | null {
  if (value.length > 30 || !/^\+?[\d\s().-]+$/.test(value.trim())) {
    return null;
  }

  const digits = value.replace(/\D/g, "");
  if (
    value.trim().startsWith("+") &&
    !(digits.length === 11 && digits[0] === "1")
  ) {
    return null;
  }
  const national =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  return /^[2-9]\d{2}[2-9]\d{6}$/.test(national) ? `+1${national}` : null;
}
