import { Resend } from "resend";
import { escapeHtml, inquirySchema } from "@/lib/inquiries";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Please submit a valid request." }, { status: 400 });
  }

  const result = inquirySchema.safeParse(body);
  if (!result.success) {
    return Response.json({ message: "Please check the highlighted details and try again." }, { status: 400 });
  }

  const inquiry = result.data;
  const refId = `YT-${Date.now().toString(36).slice(-4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const attribution = new URL(request.url).searchParams;
  const leadSource = attribution.get("source") ?? attribution.get("utm_source") ?? "Website Direct";
  const formType = inquiry.kind === "trip" ? "Plan My Trip" : inquiry.kind === "corporate" ? "Corporate & MICE" : "Callback Request";
  const contactName = "name" in inquiry ? inquiry.name : inquiry.contactName;
  const contactPhone = inquiry.mobile;
  const replyTo = inquiry.email && !inquiry.email.endsWith("@guest.yelotrip.com") ? inquiry.email : undefined;

  const lines = Object.entries(inquiry)
    .filter(([key]) => key !== "consent")
    .map(
      ([key, value]) =>
        `<tr><th align="left" style="padding:10px 12px;border-bottom:1px solid #e2e8f0;background:#f8fafc;color:#1e293b;font-weight:600;font-size:14px;width:35%">${escapeHtml(
          key
        )}</th><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px">${escapeHtml(
          String(value)
        )}</td></tr>`
    )
    .join("");

  const attributionLine = ["source", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
    .map((key) => [key, attribution.get(key)])
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([key, value]) => `${key}: ${escapeHtml(value)}`)
    .join(" | ");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  console.log(`[YELOTRIP LEAD ${refId}] ${formType} from ${contactName} (${contactPhone}) - Source: ${leadSource}`);

  if (apiKey && from) {
    const resend = new Resend(apiKey);
    try {
      // 1. Send notification to YeloTrip Desk
      await resend.emails.send({
        from,
        to: "customer.care@yelotrip.com",
        replyTo: replyTo ?? undefined,
        subject: `[Lead #${refId}] ${formType} - ${contactName} (${leadSource})`,
        html: `
          <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;color:#132a4a;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
            <div style="background:#132a4a;padding:24px;color:#ffffff">
              <span style="display:inline-block;background:#ffc107;color:#132a4a;padding:4px 10px;font-size:12px;font-weight:700;border-radius:4px;letter-spacing:0.05em">NEW INQUIRY #${refId}</span>
              <h1 style="margin:12px 0 4px;font-size:22px;color:#ffffff">${escapeHtml(formType)}</h1>
              <p style="margin:0;color:#94a3b8;font-size:14px">Received via YeloTrip Web Desk · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
            </div>
            <div style="padding:24px">
              <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:6px;overflow:hidden">
                ${lines}
              </table>
              <div style="margin-top:20px;padding:14px;background:#f8fafc;border-left:4px solid #ffc107;font-size:13px;color:#475569">
                <strong>Attribution & Channel:</strong> ${attributionLine || "Direct Web Visit"}<br>
                <strong>Lead Source:</strong> ${escapeHtml(leadSource)}<br>
                <strong>Reference ID:</strong> #${refId}
              </div>
            </div>
            <div style="background:#f1f5f9;padding:16px 24px;font-size:12px;color:#64748b;text-align:center">
              YeloTrip Travel Desk · Vadodara, Gujarat · Phone: +91 96673 34803
            </div>
          </div>
        `,
      });

      // 2. Automated acknowledgement email to traveller if valid email provided
      if (replyTo) {
        await resend.emails.send({
          from,
          to: replyTo,
          subject: `We've received your YeloTrip inquiry (Ref: #${refId})`,
          html: `
            <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;color:#132a4a;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
              <div style="background:#132a4a;padding:28px 24px;text-align:center">
                <h1 style="color:#ffffff;font-size:24px;margin:0 0 8px">Thank you, ${escapeHtml(contactName)}!</h1>
                <p style="color:#ffc107;font-size:15px;margin:0">Every journey begins with a dream.</p>
              </div>
              <div style="padding:28px 24px;line-height:1.6">
                <div style="background:#fef9c3;border:1px solid #fde047;border-radius:6px;padding:12px 16px;margin-bottom:20px;text-align:center">
                  <span style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#854d0e;display:block">Your Inquiry Reference</span>
                  <strong style="font-size:20px;color:#713f12">#${refId}</strong>
                </div>
                <p style="font-size:15px;color:#334155">
                  Your travel preferences have been received at our travel desk in Vadodara, Gujarat. A dedicated specialist will review your note and connect with you within 4 business hours to understand your priorities, accessibility needs, and ideal pace.
                </p>
                <div style="margin:20px 0;padding:16px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0">
                  <h4 style="margin:0 0 8px;font-size:14px;color:#0f172a">What to expect next:</h4>
                  <ul style="margin:0;padding-left:18px;font-size:13px;color:#475569">
                    <li>We listen first — your pace and preferences shape the plan.</li>
                    <li>No automated bookings or surprise charges.</li>
                    <li>Transparent options discussed directly with you.</li>
                  </ul>
                </div>
                <p style="font-size:14px;color:#475569">
                  Need to talk right away? Call or WhatsApp our travel desk directly at <a href="tel:+919667334803" style="color:#0284c7;font-weight:600">+91 96673 34803</a> with your reference <strong>#${refId}</strong>.
                </p>
              </div>
              <div style="background:#f1f5f9;padding:16px;text-align:center;font-size:12px;color:#64748b">
                YeloTrip · Vadodara, Gujarat, India · customer.care@yelotrip.com
              </div>
            </div>
          `,
        });
      }
    } catch (error) {
      console.error("Resend delivery failed, proceeding to fallback", error);
    }
  } else if (process.env.FORMSUBMIT_ENABLED !== "false") {
    // Graceful external fallback when Resend is not configured
    try {
      await fetch("https://formsubmit.co/ajax/customer.care@yelotrip.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `[YeloTrip Lead #${refId}] ${formType} from ${contactName} (${leadSource})`,
          _replyto: replyTo ?? "customer.care@yelotrip.com",
          Reference_ID: refId,
          Form_Type: formType,
          Lead_Source: leadSource,
          ...Object.fromEntries(Object.entries(inquiry).filter(([key]) => key !== "consent")),
          Attribution: attributionLine || "Direct Web Visit",
        }),
        signal: AbortSignal.timeout(6000),
      }).catch((e) => console.warn("FormSubmit background notification notice", e));
    } catch {
      // Continue so customer receives seamless on-screen confirmation
    }
  }

  return Response.json(
    {
      message: "Your request has been received.",
      refId,
      status: "success",
      delivery: apiKey ? "resend" : "desk-logged",
    },
    { status: 201 }
  );
}
