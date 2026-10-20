"use client";

import { ArrowLeft, ArrowRight, Check, CircleCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { getAttribution } from "@/lib/attribution";
import { tripInquirySchema, type TripFormValues } from "@/lib/inquiries";
import { generateClientRefId } from "@/lib/utils";

const steps = [
  { title: "The destination", fields: ["destination", "departureCity"] },
  { title: "When to go", fields: ["dateWindow", "duration"] },
  { title: "Your travellers", fields: ["adults", "children", "seniors", "mobilityNeeds"] },
  { title: "Your travel style", fields: ["travelStyle", "budget"] },
  { title: "A way to reach you", fields: ["name", "mobile", "email", "whatsappConsent", "consent"] },
] satisfies { title: string; fields: FieldPath<TripFormValues>[] }[];

const stepSchemas = [
  tripInquirySchema.pick({ destination: true, departureCity: true }),
  tripInquirySchema.pick({ dateWindow: true, duration: true }),
  tripInquirySchema.pick({ adults: true, children: true, seniors: true, mobilityNeeds: true }),
  tripInquirySchema.pick({ travelStyle: true, budget: true }),
  tripInquirySchema.pick({ name: true, mobile: true, email: true, whatsappConsent: true, consent: true }),
];

const defaults: TripFormValues = {
  kind: "trip",
  service: "",
  destination: "",
  departureCity: "Vadodara",
  dateWindow: "",
  duration: "",
  adults: 1,
  children: 0,
  seniors: 0,
  mobilityNeeds: "",
  travelStyle: "flexible",
  budget: "flexible",
  name: "",
  mobile: "",
  email: "",
  whatsappConsent: false,
  consent: false,
};

export default function TripInquiryForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState<string>("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TripFormValues>({
    defaultValues: {
      ...defaults,
      service: searchParams.get("service") ?? defaults.service,
      destination: searchParams.get("destination") ?? defaults.destination,
      departureCity: searchParams.get("departureCity") ?? defaults.departureCity,
    },
    mode: "onBlur",
  });

  async function goNext() {
    clearErrors(steps[step].fields);
    const parsed = stepSchemas[step].safeParse(getValues());
    if (parsed.success) {
      setStep((current) => Math.min(current + 1, steps.length - 1));
      return;
    }
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string")
        setError(field as FieldPath<TripFormValues>, {
          type: "validate",
          message: issue.message,
        });
    });
  }

  async function submitTrip(data: TripFormValues) {
    const result = tripInquirySchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string")
          setError(field as FieldPath<TripFormValues>, {
            type: "validate",
            message: issue.message,
          });
      });
      return;
    }

    setSubmitting(true);
    setServerError("");
    const attribution = getAttribution();

    try {
      const response = await fetch(`/api/send-enquiry?${attribution.toString()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const payload = (await response.json()) as { message?: string; refId?: string };
      if (!response.ok) throw new Error(payload.message ?? "We could not send your request.");
      setSubmittedRef(payload.refId ?? generateClientRefId());
      setSubmittedName(data.name);
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
        <CircleCheck size={38} aria-hidden="true" />
        <span className="eyebrow">Inquiry Logged Successfully</span>
        <h2 className="font-display">Your journey outline is in motion.</h2>
        {submittedRef && (
          <div
            className="reference-pill"
            style={{
              margin: "1rem auto",
              display: "inline-flex",
              gap: "0.5rem",
              background: "var(--midnight-ocean)",
              color: "var(--sunrise-gold)",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontWeight: 700,
              fontSize: "0.95rem",
            }}
          >
            <span>Booking & Proposal Reference:</span>
            <strong>#{submittedRef}</strong>
          </div>
        )}
        <p>
          Thank you, <strong>{submittedName}</strong>! Your travel preferences have been securely logged with our Vadodara desk. A dedicated specialist will review your request and reach out within 4 business hours to discuss personalized options.
        </p>
        <div
          className="success-contact"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
            marginTop: "1.25rem",
          }}
        >
          <a
            className="button-primary"
            style={{ fontSize: "0.85rem", minHeight: "2.75rem" }}
            href={`https://wa.me/919667334803?text=${encodeURIComponent(
              `Hello YeloTrip desk, I submitted trip inquiry #${submittedRef} on your website. I'd love to chat about options!`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
          <a
            className="button-outline"
            style={{ fontSize: "0.85rem", minHeight: "2.75rem" }}
            href="tel:+919667334803"
          >
            Call +91 96673 34803
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="inquiry-form" id="plan-form" onSubmit={handleSubmit(submitTrip)} noValidate>
      <input type="hidden" {...register("service")} />
      <div className="form-progress" aria-label={`Step ${step + 1} of ${steps.length}`}>
        {steps.map((item, index) => (
          <div className={`progress-step${index <= step ? " is-active" : ""}`} key={item.title}>
            <span>{index < step ? <Check size={13} aria-hidden="true" /> : index + 1}</span>
            <small>{item.title}</small>
          </div>
        ))}
      </div>
      <fieldset className="form-step" key={step}>
        <legend className="font-display">{steps[step].title}</legend>
        {step === 0 && (
          <>
            <div className="field-shell">
              <label htmlFor="destination">Where are you dreaming of?</label>
              <input
                id="destination"
                autoComplete="off"
                placeholder="A place, region, or ‘not sure yet’"
                aria-invalid={!!errors.destination}
                aria-describedby={errors.destination ? "destination-error" : undefined}
                {...register("destination")}
              />
              {errors.destination && (
                <span className="field-error" id="destination-error">
                  Please share a destination idea, even if it’s broad.
                </span>
              )}
            </div>
            <div className="field-shell">
              <label htmlFor="departureCity">Departure city</label>
              <input
                id="departureCity"
                autoComplete="address-level2"
                aria-invalid={!!errors.departureCity}
                aria-describedby={errors.departureCity ? "departure-error" : undefined}
                {...register("departureCity")}
              />
              {errors.departureCity && (
                <span className="field-error" id="departure-error">
                  Enter the city you expect to leave from.
                </span>
              )}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className="field-shell">
              <label htmlFor="dateWindow">When are you thinking of travelling?</label>
              <input
                id="dateWindow"
                placeholder="Exact dates, month, or season"
                aria-invalid={!!errors.dateWindow}
                aria-describedby={errors.dateWindow ? "dates-error" : undefined}
                {...register("dateWindow")}
              />
              {errors.dateWindow && (
                <span className="field-error" id="dates-error">
                  Share a tentative month, season or date range.
                </span>
              )}
            </div>
            <div className="field-shell">
              <label htmlFor="duration">How long would you like to go?</label>
              <input
                id="duration"
                placeholder="For example, around 8 days"
                aria-invalid={!!errors.duration}
                aria-describedby={errors.duration ? "duration-error" : undefined}
                {...register("duration")}
              />
              {errors.duration && (
                <span className="field-error" id="duration-error">
                  Tell us your approximate trip duration.
                </span>
              )}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p className="form-hint">A rough count is perfect. We’ll confirm details together.</p>
            <div className="number-fields">
              <div className="field-shell">
                <label htmlFor="adults">Adults</label>
                <input
                  id="adults"
                  type="number"
                  min="1"
                  max="30"
                  aria-invalid={!!errors.adults}
                  {...register("adults", { valueAsNumber: true })}
                />
              </div>
              <div className="field-shell">
                <label htmlFor="children">Children</label>
                <input
                  id="children"
                  type="number"
                  min="0"
                  max="30"
                  aria-invalid={!!errors.children}
                  {...register("children", { valueAsNumber: true })}
                />
              </div>
              <div className="field-shell">
                <label htmlFor="seniors">Senior travellers</label>
                <input
                  id="seniors"
                  type="number"
                  min="0"
                  max="30"
                  aria-invalid={!!errors.seniors}
                  {...register("seniors", { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="field-shell">
              <label htmlFor="mobilityNeeds">
                Mobility, access or care needs <span className="optional-label">Optional</span>
              </label>
              <textarea
                id="mobilityNeeds"
                rows={3}
                placeholder="Wheelchair access, a gentler pace, dietary needs…"
                {...register("mobilityNeeds")}
              />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="field-shell">
              <label htmlFor="travelStyle">What kind of comfort feels right?</label>
              <select id="travelStyle" {...register("travelStyle")}>
                <option value="comfort">Comfortable and considered</option>
                <option value="premium">Premium experiences</option>
                <option value="luxury">Luxury, with every detail in mind</option>
                <option value="flexible">I’m open to suggestions</option>
              </select>
            </div>
            <div className="field-shell">
              <label htmlFor="budget">
                Budget range per traveller <span className="optional-label">Optional</span>
              </label>
              <select id="budget" {...register("budget")}>
                <option value="flexible">I’d like to discuss what’s possible</option>
                <option value="under-50000">Under ₹50,000</option>
                <option value="50000-150000">₹50,000–₹1,50,000</option>
                <option value="150000-300000">₹1,50,000–₹3,00,000</option>
                <option value="300000-plus">₹3,00,000+</option>
              </select>
              <span className="field-note">
                A guide only. Your specialist will discuss tailored options; this is not a quote.
              </span>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <div className="field-shell">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && <span className="field-error">Please enter your name.</span>}
            </div>
            <div className="contact-fields">
              <div className="field-shell">
                <label htmlFor="mobile">Mobile / WhatsApp</label>
                <input
                  id="mobile"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91"
                  aria-invalid={!!errors.mobile}
                  {...register("mobile")}
                />
                {errors.mobile && <span className="field-error">Enter a reachable phone number.</span>}
              </div>
              <div className="field-shell">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && <span className="field-error">Enter a valid email address.</span>}
              </div>
            </div>
            <label className="consent-field">
              <input type="checkbox" {...register("whatsappConsent")} />
              <span>
                I agree to receive trip-related follow-up by WhatsApp. This is optional and can be withdrawn at any time.
              </span>
            </label>
            <label className="consent-field">
              <input
                type="checkbox"
                aria-invalid={!!errors.consent}
                {...register("consent", { setValueAs: (value) => value === true })}
              />
              <span>
                I authorize YeloTrip travel specialists to contact me regarding this customised proposal. I can withdraw this consent by contacting YeloTrip.
              </span>
            </label>
            {errors.consent && (
              <span className="field-error">Your consent is required to submit this enquiry.</span>
            )}
          </>
        )}
      </fieldset>

      {serverError && (
        <p className="form-alert" role="alert">
          {serverError}
        </p>
      )}
      <div className="form-navigation">
        {step > 0 ? (
          <button
            className="button-outline"
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
          >
            <ArrowLeft size={16} aria-hidden="true" /> Previous
          </button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <button className="button-primary" type="button" onClick={goNext}>
            Continue <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <button className="button-primary" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <LoaderCircle className="spin" size={16} aria-hidden="true" /> Sending
              </>
            ) : (
              <>
                Send my enquiry <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        )}
      </div>
      <p className="form-privacy">
        Your details are used only to respond to this request. Read our <a href="/privacy">privacy policy</a>.
      </p>
    </form>
  );
}
