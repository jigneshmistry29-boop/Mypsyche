"use client";

import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { callbackInquirySchema, type CallbackFormValues } from "@/lib/inquiries";
import { getAttribution } from "@/lib/attribution";
import { generateClientRefId } from "@/lib/utils";

const defaults: CallbackFormValues = {
  kind: "callback",
  name: "",
  mobile: "",
  email: "",
  preferredTime: "",
  consent: false,
};

export default function CallbackInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CallbackFormValues>({ defaultValues: defaults, mode: "onBlur" });

  async function submitCallback(data: CallbackFormValues) {
    const result = callbackInquirySchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string")
          setError(field as keyof CallbackFormValues, {
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
        <CircleCheck size={34} aria-hidden="true" />
        <span className="eyebrow">Callback Scheduled</span>
        <h2 className="font-display">We have your request.</h2>
        {submittedRef && (
          <div
            className="reference-pill"
            style={{
              margin: "0.8rem auto",
              display: "inline-flex",
              gap: "0.5rem",
              background: "var(--midnight-ocean)",
              color: "var(--sunrise-gold)",
              padding: "0.4rem 0.9rem",
              borderRadius: "999px",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            <span>Reference:</span>
            <strong>#{submittedRef}</strong>
          </div>
        )}
        <p>A YeloTrip travel specialist in Vadodara will call you at your preferred time.</p>
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <a
            className="button-primary"
            style={{ fontSize: "0.85rem", minHeight: "2.6rem" }}
            href={`https://wa.me/919667334803?text=${encodeURIComponent(
              `Hi YeloTrip, I requested a callback with reference #${submittedRef}.`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Desk
          </a>
          <a
            className="button-outline"
            style={{ fontSize: "0.85rem", minHeight: "2.6rem" }}
            href="tel:+919667334803"
          >
            Call +91 96673 34803
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="corporate-form callback-form"
      id="request-callback"
      onSubmit={handleSubmit(submitCallback)}
      noValidate
    >
      <div className="corporate-form-heading">
        <span className="eyebrow">Request a callback</span>
        <h2 className="font-display">We’ll call when it suits you.</h2>
        <p>Leave a number and a preferred time; our travel desk will follow up.</p>
      </div>
      <div className="field-shell">
        <label htmlFor="callback-name">Your name</label>
        <input
          id="callback-name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && <span className="field-error">Enter your name.</span>}
      </div>
      <div className="field-shell">
        <label htmlFor="callback-mobile">Mobile / WhatsApp</label>
        <input
          id="callback-mobile"
          type="tel"
          autoComplete="tel"
          placeholder="+91"
          aria-invalid={!!errors.mobile}
          {...register("mobile")}
        />
        {errors.mobile && <span className="field-error">Enter a reachable phone number.</span>}
      </div>
      <div className="field-shell">
        <label htmlFor="callback-email">
          Email <span className="optional-label">Optional</span>
        </label>
        <input
          id="callback-email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && <span className="field-error">Enter a valid email address.</span>}
      </div>
      <div className="field-shell">
        <label htmlFor="callback-time">
          Preferred callback time <span className="optional-label">Optional</span>
        </label>
        <select id="callback-time" {...register("preferredTime")}>
          <option value="">Any time during business hours</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
        </select>
      </div>
      <label className="consent-field">
        <input
          type="checkbox"
          aria-invalid={!!errors.consent}
          {...register("consent", { setValueAs: (value) => value === true })}
        />
        <span>I authorize YeloTrip to contact me about my request.</span>
      </label>
      {errors.consent && <span className="field-error">Your consent is required.</span>}
      {serverError && (
        <p className="form-alert" role="alert">
          {serverError}
        </p>
      )}
      <button className="button-primary" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <LoaderCircle className="spin" size={16} /> Sending
          </>
        ) : (
          <>
            Request a callback <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
