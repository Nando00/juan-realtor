import {
  normalizeSmsPhone,
  SMS_CONSENT_TEXT,
  SMS_CONSENT_VERSION,
} from "@/lib/sms";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4096;
const RESPONSE_HEADERS = { "Cache-Control": "no-store" };

function getWebhookUrl(): URL | null {
  const configuredUrl = process.env.SMS_OPT_IN_WEBHOOK_URL?.trim();
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    return url.protocol === "https:" && !url.username && !url.password
      ? url
      : null;
  } catch {
    return null;
  }
}

function reply(message: string, status: number, preview = false) {
  return Response.json(
    {
      ok: status >= 200 && status < 300,
      message,
      ...(preview ? { preview } : {}),
    },
    { status, headers: RESPONSE_HEADERS },
  );
}

async function readLimitedBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return "";

  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError("Request body is too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

export async function GET() {
  return Response.json(
    { enabled: getWebhookUrl() !== null },
    { headers: RESPONSE_HEADERS },
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return reply("Please submit this form from our website.", 403);
  }

  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return reply("Please submit the text sign-up form on our website.", 415);
  }

  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return reply(
      "Your request is too large. Please shorten your details.",
      413,
    );
  }

  let data: unknown;
  try {
    data = JSON.parse(await readLimitedBody(request));
  } catch (error) {
    return error instanceof RangeError
      ? reply("Your request is too large. Please shorten your details.", 413)
      : reply("We couldn’t read your request. Please try again.", 400);
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return reply("Please complete the text sign-up form.", 400);
  }

  const fields = data as Record<string, unknown>;
  if (
    fields.name !== undefined &&
    (typeof fields.name !== "string" ||
      fields.name.trim().length > 80 ||
      /[\u0000-\u001f\u007f]/.test(fields.name))
  ) {
    return reply("Please enter a name of 80 characters or fewer.", 400);
  }

  const phone =
    typeof fields.phone === "string" ? normalizeSmsPhone(fields.phone) : null;
  if (!phone) {
    return reply("Please enter a valid 10-digit US mobile number.", 400);
  }
  if (fields.consent !== true) {
    return reply("Please check the consent box to request text updates.", 400);
  }

  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) {
    return reply(
      "Text sign-up is not connected yet. You have not been subscribed, and your details have not been sent to an SMS service.",
      503,
      true,
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const token = process.env.SMS_OPT_IN_WEBHOOK_TOKEN?.trim();
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        name: typeof fields.name === "string" ? fields.name.trim() : "",
        phone,
        consent: true,
        consentText: SMS_CONSENT_TEXT,
        consentVersion: SMS_CONSENT_VERSION,
        consentedAt: new Date().toISOString(),
        source: "website",
        channel: "sms",
        purpose: "marketing",
      }),
      signal: controller.signal,
      cache: "no-store",
      redirect: "error",
    });
    await response.body?.cancel();

    if (!response.ok) {
      return reply(
        "We couldn’t confirm your request. Please try again later.",
        502,
      );
    }

    return reply("Your request for text updates has been received.", 200);
  } catch {
    return reply(
      "We couldn’t confirm your request. Please try again later.",
      502,
    );
  } finally {
    clearTimeout(timeout);
  }
}
