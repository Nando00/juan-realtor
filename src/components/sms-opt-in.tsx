"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { LegalPageId } from "@/lib/legal";
import { normalizeSmsPhone, SMS_CONSENT_TEXT } from "@/lib/sms";
import { Icon } from "./icons";

type FieldErrors = { name?: string; phone?: string; consent?: string };

export function SmsOptIn({
  onOpenLegal,
}: {
  onOpenLegal: (page: LegalPageId) => void;
}) {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState("");
  const [received, setReceived] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let active = true;

    async function checkAvailability() {
      try {
        const response = await fetch("/api/sms-opt-in", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();
        if (active) setEnabled(response.ok && result.enabled === true);
      } catch {
        if (active) setEnabled(false);
      } finally {
        clearTimeout(timeout);
      }
    }

    void checkAvailability();
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const nextErrors: FieldErrors = {};
    const normalizedPhone = normalizeSmsPhone(phone);
    if (name.trim().length > 80) {
      nextErrors.name = "Please use 80 characters or fewer for your name.";
    }
    if (!normalizedPhone) {
      nextErrors.phone = "Enter a valid 10-digit US mobile number.";
    }
    if (!consent) {
      nextErrors.consent = "Check the consent box to request text updates.";
    }

    setErrors(nextErrors);
    setFeedback("");
    setReceived(false);
    if (Object.keys(nextErrors).length) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.phone) phoneRef.current?.focus();
      else consentRef.current?.focus();
      return;
    }

    if (enabled !== true) {
      setFeedback(
        "Text sign-up is not connected yet. You have not been subscribed, and your details have not been sent.",
      );
      return;
    }

    setPending(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch("/api/sms-opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalizedPhone,
          consent,
        }),
        signal: controller.signal,
      });
      const result = await response.json();

      if (!response.ok || result.ok !== true) {
        if (result.preview === true) setEnabled(false);
        setFeedback(
          typeof result.message === "string"
            ? result.message
            : "We couldn’t confirm your request. Please try again later.",
        );
        return;
      }

      setReceived(true);
      setFeedback("Thanks! Your request for text updates has been received.");
      setName("");
      setPhone("");
      setConsent(false);
    } catch {
      setFeedback(
        "We couldn’t confirm your request. Please check your connection and try again later.",
      );
    } finally {
      clearTimeout(timeout);
      setPending(false);
    }
  }

  return (
    <section
      className="sms-section"
      id="sms-updates"
      aria-labelledby="sms-heading"
    >
      <div className="container sms-grid">
        <div className="sms-copy">
          <span className="eyebrow sms-kicker">
            YOUR NEXT HOME. ONE TEXT CLOSER.
          </span>
          <h2 id="sms-heading">
            Good moves.
            <br />
            <em>Straight to your phone.</em>
          </h2>
          <p>
            Stay in the loop with home updates, local insights, and a little
            inspiration for your next chapter in Houston.
          </p>
          <span className="sms-detail">
            <Icon name="phone" size={18} /> Your city. Your next move. By text.
          </span>
        </div>

        <form
          className="sms-form"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={pending}
          aria-labelledby="sms-form-heading"
        >
          <h3 id="sms-form-heading">Let’s keep in touch.</h3>
          <p className="sms-form-intro">
            Sign up for text updates from Lanza Enterprises LLC.
          </p>
          <div className="sms-fields">
            <div>
              <label htmlFor="sms-name">
                Name <span>(optional)</span>
              </label>
              <input
                id="sms-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                maxLength={80}
                value={name}
                ref={nameRef}
                disabled={pending}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "sms-name-error" : undefined}
                onChange={(event) => {
                  setName(event.target.value);
                  setErrors((current) => ({ ...current, name: undefined }));
                  setFeedback("");
                }}
              />
              {errors.name && (
                <p className="sms-field-error" id="sms-name-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="sms-phone">
                Mobile number <span>(required)</span>
              </label>
              <input
                id="sms-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(713) 555-0123"
                maxLength={30}
                required
                value={phone}
                ref={phoneRef}
                disabled={pending}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "sms-phone-error" : undefined}
                onChange={(event) => {
                  setPhone(event.target.value);
                  setErrors((current) => ({ ...current, phone: undefined }));
                  setFeedback("");
                }}
              />
              {errors.phone && (
                <p className="sms-field-error" id="sms-phone-error">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <label className="sms-consent" htmlFor="sms-consent">
            <input
              id="sms-consent"
              name="consent"
              type="checkbox"
              required
              checked={consent}
              ref={consentRef}
              disabled={pending}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={
                errors.consent ? "sms-consent-error" : undefined
              }
              onChange={(event) => {
                setConsent(event.target.checked);
                setErrors((current) => ({ ...current, consent: undefined }));
                setFeedback("");
              }}
            />
            <span>{SMS_CONSENT_TEXT}</span>
          </label>
          {errors.consent && (
            <p className="sms-field-error" id="sms-consent-error">
              {errors.consent}
            </p>
          )}

          <div className="sms-legal">
            <button type="button" onClick={() => onOpenLegal("privacy")}>
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={() => onOpenLegal("terms")}>
              Terms &amp; Conditions
            </button>
          </div>

          {enabled === false && (
            <p className="sms-preview">
              Preview only — text sign-up is not connected yet. This form does
              not currently subscribe you or send texts.
            </p>
          )}
          <button
            className="button button-red sms-submit"
            type="submit"
            disabled={pending || enabled === null}
          >
            {pending
              ? "Sending request…"
              : enabled === null
                ? "Checking availability…"
                : "Get text updates"}
            {!pending && <Icon name="arrow" size={19} />}
          </button>
          <p
            className={`sms-feedback${received ? " is-success" : ""}`}
            data-state={received ? "success" : "error"}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {feedback}
          </p>
        </form>
      </div>
    </section>
  );
}
