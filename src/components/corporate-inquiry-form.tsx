"use client";

import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { corporateInquirySchema, type CorporateFormValues } from "@/lib/inquiries";
import { getAttribution } from "@/lib/attribution";
import { generateClientRefId } from "@/lib/utils";

const defaultValues: CorporateFormValues = {
  kind: "corporate",
  companyName: "",
  gstin: "",
  contactName: "",
  email: "",
  designation: "",
  mobile: "",
  eventType: "offsite",
  delegates: "",
  budget: "",
  timeline: "",
  details: "",
  consent: false,
};

export default function CorporateInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CorporateFormValues>({ defaultValues, mode: "onBlur" });

  async function submitCorporate(data: CorporateFormValues) {
    const result = corporateInquirySchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string")
          setError(field as keyof CorporateFormValues, {
            type: "validate",
            message: issue.message,
          });
      });
      return;
    }
    setSubmitting(true);
    setServerError("");
    try {
      const attribution = getAttribution();
      const response = await fetch(`/api/send-enquiry?${attribution.toString()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const payload = (await response.json()) as { message?: string; refId?: string };
      if (!response.ok) throw new Error(payload.message ?? "We could not send your request.");
      setSubmittedRef(payload.refId ?? generateClientRefId());
      setSubmitted(true);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "We could not send your request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CircleCheck size={36} aria-hidden="true" />
        <span className="eyebrow">Corporate Lead Logged</span>
        <h2 className="font-display">Your team gathering is in capable hands.</h2>
        {submittedRef && (
          <div
            className="reference-pill"
            style={{
              margin: "0.8rem auto",
              display: "inline-flex",
              gap: "0.5rem",
              background: "var(--midnight-ocean)",
              color: "var(--sunrise-gold)",
              padding: "0.45rem 1rem",
              borderRadius: "999px",
              fontWeight: 700,
              fontSize: "0.92rem",
            }}
          >
            <span>Corporate Reference:</span>
            <strong>#{submittedRef}</strong>
          </div>
        )}
        <p>
          Your corporate enquiry has reached our Vadodara desk. An executive travel specialist will review your brief and follow up with a tailored framework.
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <a
            className="button-primary"
            style={{ fontSize: "0.85rem", minHeight: "2.65rem" }}
            href={`https://wa.me/919667334803?text=${encodeURIComponent(
              `Hello YeloTrip team, I submitted corporate inquiry #${submittedRef}.`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Corporate Desk
          </a>
          <a
            className="button-outline"
            style={{ fontSize: "0.85rem", minHeight: "2.65rem" }}
            href="tel:+919667334803"
          >
            Call +91 96673 34803
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="corporate-form" onSubmit={handleSubmit(submitCorporate)} noValidate>
      <div className="corporate-form-heading">
        <span className="eyebrow">Corporate & MICE Enquiries</span>
        <h2 className="font-display">Thoughtful coordination for teams on the move.</h2>
        <p>
          Tell us about the offsite, retreat, or meeting you are shaping. A specialist will follow up with tailored options.
        </p>
      </div>

      <div className="field-shell">
        <label htmlFor="company-name">Company or organisation name</label>
        <input
          id="company-name"
          autoComplete="organization"
          aria-invalid={!!errors.companyName}
          {...register("companyName")}
        />
        {errors.companyName && <span className="field-error">Enter your organisation name.</span>}
      </div>

      <div className="corporate-row">
        <div className="field-shell">
          <label htmlFor="contact-name">Contact person</label>
          <input
            id="contact-name"
            autoComplete="name"
            aria-invalid={!!errors.contactName}
            {...register("contactName")}
          />
          {errors.contactName && <span className="field-error">Enter the primary contact name.</span>}
        </div>
        <div className="field-shell">
          <label htmlFor="contact-designation">Designation</label>
          <input
            id="contact-designation"
            autoComplete="organization-title"
            aria-invalid={!!errors.designation}
            {...register("designation")}
          />
          {errors.designation && <span className="field-error">Enter your role or designation.</span>}
        </div>
      </div>

      <div className="corporate-row">
        <div className="field-shell">
          <label htmlFor="corporate-email">Official email address</label>
          <input
            id="corporate-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <span className="field-error">Enter a valid work email address.</span>}
        </div>
        <div className="field-shell">
          <label htmlFor="corporate-mobile">Mobile / WhatsApp number</label>
          <input
            id="corporate-mobile"
            type="tel"
            autoComplete="tel"
            placeholder="+91"
            aria-invalid={!!errors.mobile}
            {...register("mobile")}
          />
          {errors.mobile && <span className="field-error">Enter a reachable phone number.</span>}
        </div>
      </div>

      <div className="corporate-row">
        <div className="field-shell">
          <label htmlFor="event-type">Type of gathering</label>
          <select id="event-type" {...register("eventType")}>
            <option value="offsite">Team offsite</option>
            <option value="retreat">Executive retreat</option>
            <option value="conference">Conference / summit</option>
            <option value="exhibition">Exhibition visit</option>
            <option value="incentive">Incentive travel</option>
            <option value="other">Other corporate event</option>
          </select>
        </div>
        <div className="field-shell">
          <label htmlFor="delegates">Approximate delegates</label>
          <input
            id="delegates"
            placeholder="e.g. 25–30 travellers"
            aria-invalid={!!errors.delegates}
            {...register("delegates")}
          />
          {errors.delegates && <span className="field-error">Indicate the group size.</span>}
        </div>
      </div>

      <div className="corporate-row">
        <div className="field-shell">
          <label htmlFor="timeline">Tentative travel window</label>
          <input
            id="timeline"
            placeholder="e.g. Mid-November 2026, Q1 next year"
            aria-invalid={!!errors.timeline}
            {...register("timeline")}
          />
          {errors.timeline && <span className="field-error">Provide your timeline or dates.</span>}
        </div>
        <div className="field-shell">
          <label htmlFor="corporate-budget">
            Indicative budget <span className="optional-label">Optional</span>
          </label>
          <input
            id="corporate-budget"
            placeholder="Per delegate or overall allocation"
            {...register("budget")}
          />
        </div>
      </div>

      <div className="field-shell">
        <label htmlFor="event-details">
          Key objectives, destination ideas or specific requirements{" "}
          <span className="optional-label">Optional</span>
        </label>
        <textarea
          id="event-details"
          rows={3}
          placeholder="Conference facilities, team dinners, flight booking needs, specific locations…"
          {...register("details")}
        />
      </div>

      <label className="consent-field">
        <input
          type="checkbox"
          aria-invalid={!!errors.consent}
          {...register("consent", { setValueAs: (value) => value === true })}
        />
        <span>
          I authorize YeloTrip to contact me regarding this corporate travel enquiry.
        </span>
      </label>
      {errors.consent && (
        <span className="field-error">Your authorization is required to submit.</span>
      )}

      {serverError && (
        <p className="form-alert" role="alert">
          {serverError}
        </p>
      )}

      <button className="button-primary" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <LoaderCircle className="spin" size={16} aria-hidden="true" /> Sending
          </>
        ) : (
          <>
            Send corporate enquiry <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
