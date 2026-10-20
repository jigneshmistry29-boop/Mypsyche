"use client";

import { ArrowRight, Check, CircleCheck, HeartHandshake, LoaderCircle, MessageCircle, Phone, Sparkles, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAttribution } from "@/lib/attribution";
import { generateClientRefId } from "@/lib/utils";

interface QuickProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  sourceContext?: string;
}

export default function QuickProposalModal({
  isOpen,
  onClose,
  defaultDestination = "",
  sourceContext = "Direct",
}: QuickProposalModalProps) {
  const [destination, setDestination] = useState(defaultDestination);
  const [travellers, setTravellers] = useState("Family");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [mobilityNotes, setMobilityNotes] = useState("");
  const [whatsappConsent, setWhatsappConsent] = useState(true);
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim() || !mobile.trim()) {
      setErrorMessage("Please enter your name and reachable phone number.");
      return;
    }
    if (!consent) {
      setErrorMessage("Please confirm permission for our travel specialist to contact you.");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    const attribution = getAttribution();
    if (sourceContext) {
      attribution.set("modal_source", sourceContext);
    }

    const payload = {
      kind: "trip",
      service: `Quick Proposal (${sourceContext})`,
      destination: destination.trim() || "Exploring ideas / Not decided",
      departureCity: "Vadodara",
      dateWindow: travelMonth || "Flexible / Next 3-6 months",
      duration: "Flexible",
      adults: travellers === "Solo" ? 1 : travellers === "Couple" ? 2 : 2,
      children: travellers === "Family with Kids" ? 1 : 0,
      seniors: travellers === "Senior Citizens" ? 2 : 0,
      mobilityNeeds: mobilityNotes || (travellers === "Senior Citizens" ? "Senior-friendly pace requested" : ""),
      travelStyle: "flexible" as const,
      budget: "flexible",
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, ".")}@guest.yelotrip.com`,
      whatsappConsent,
      consent: true,
    };

    try {
      const response = await fetch(`/api/send-enquiry?${attribution.toString()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message ?? "Could not send proposal request. Please call or WhatsApp us.");
      }

      setSubmittedRef(data.refId || generateClientRefId());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please connect via WhatsApp or phone.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setSubmittedRef(null);
    setName("");
    setMobile("");
    setEmail("");
    setDestination("");
    setMobilityNotes("");
    onClose();
  }

  return (
    <div
      className="quick-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-proposal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="quick-modal-panel" ref={modalRef}>
        <div className="quick-modal-header">
          <div className="quick-modal-badge">
            <Sparkles size={16} aria-hidden="true" />
            <span>Fast Proposal Desk · Vadodara</span>
          </div>
          <button
            className="quick-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close proposal form"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {submittedRef ? (
          <div className="quick-modal-success" role="status" aria-live="polite">
            <div className="success-icon-badge">
              <CircleCheck size={44} aria-hidden="true" />
            </div>
            <span className="eyebrow">Proposal Request Registered</span>
            <h2 className="font-display">Your journey outline is in motion.</h2>
            <div className="reference-pill">
              <span>Reference Number:</span>
              <strong>#{submittedRef}</strong>
            </div>
            <p className="success-copy">
              Thank you, <strong>{name}</strong>! A dedicated YeloTrip travel specialist in Vadodara has received your preferences and will prepare options tailored to your pace and priorities.
            </p>
            <div className="success-human-card">
              <HeartHandshake size={20} aria-hidden="true" />
              <span>We listen first. Nothing is auto-booked and there are never surprise charges.</span>
            </div>
            <div className="success-actions">
              <a
                className="button-primary"
                href={`https://wa.me/919667334803?text=${encodeURIComponent(
                  `Hello YeloTrip, I just requested a proposal with reference #${submittedRef} for ${destination || "a trip"}. Looking forward to discussing details!`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} aria-hidden="true" /> WhatsApp Our Travel Desk
              </a>
              <button className="button-outline" type="button" onClick={handleReset}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <form className="quick-modal-form" onSubmit={handleSubmit} noValidate>
            <div>
              <h2 className="font-display" id="quick-proposal-title">
                Get a Personalised Travel Proposal
              </h2>
              <p className="quick-modal-sub">
                Tell us where your heart wants to go. A human specialist will craft a custom itinerary for you.
              </p>
            </div>

            <div className="quick-field">
              <label htmlFor="qp-destination">
                Where are you dreaming of? <span className="optional-tag">City, country or region</span>
              </label>
              <input
                id="qp-destination"
                type="text"
                placeholder="e.g., Kerala, Kashmir, Europe, Bali, or 'Not sure yet'"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="quick-field">
              <label id="qp-travellers-label">
                <Users size={16} aria-hidden="true" /> Who is travelling?
              </label>
              <div className="traveller-chips" role="radiogroup" aria-labelledby="qp-travellers-label">
                {["Solo", "Couple", "Family with Kids", "Senior Citizens", "Corporate / Team"].map((kind) => (
                  <button
                    key={kind}
                    type="button"
                    role="radio"
                    aria-checked={travellers === kind}
                    className={`traveller-chip ${travellers === kind ? "is-selected" : ""}`}
                    onClick={() => setTravellers(kind)}
                  >
                    {travellers === kind && <Check size={14} aria-hidden="true" />}
                    <span>{kind}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="quick-row">
              <div className="quick-field">
                <label htmlFor="qp-name">Your Full Name *</label>
                <input
                  id="qp-name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="quick-field">
                <label htmlFor="qp-mobile">Mobile / WhatsApp Number *</label>
                <input
                  id="qp-mobile"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="quick-row">
              <div className="quick-field">
                <label htmlFor="qp-email">Email Address <span className="optional-tag">For written proposal</span></label>
                <input
                  id="qp-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="quick-field">
                <label htmlFor="qp-month">Tentative Month / Season <span className="optional-tag">Optional</span></label>
                <input
                  id="qp-month"
                  type="text"
                  placeholder="e.g. November, Summer break, Diwali"
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                />
              </div>
            </div>

            <div className="quick-field">
              <label htmlFor="qp-mobility">
                Accessibility, dietary or pace requirements <span className="optional-tag">Optional</span>
              </label>
              <input
                id="qp-mobility"
                type="text"
                placeholder="e.g., wheelchair assistance, pure veg/jain meals, slow pace for elders"
                value={mobilityNotes}
                onChange={(e) => setMobilityNotes(e.target.value)}
              />
            </div>

            <div className="quick-consents">
              <label className="quick-checkbox">
                <input
                  type="checkbox"
                  checked={whatsappConsent}
                  onChange={(e) => setWhatsappConsent(e.target.checked)}
                />
                <span>Share draft itinerary & options on WhatsApp (+91 96673 34803)</span>
              </label>

              <label className="quick-checkbox">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>I authorize YeloTrip travel specialists to connect with me regarding this proposal.</span>
              </label>
            </div>

            {errorMessage && (
              <p className="form-alert" role="alert">
                {errorMessage}
              </p>
            )}

            <div className="quick-modal-actions">
              <button className="button-primary" type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <LoaderCircle className="spin" size={17} aria-hidden="true" />
                    Preparing Request...
                  </>
                ) : (
                  <>
                    Get Custom Proposal <ArrowRight size={17} aria-hidden="true" />
                  </>
                )}
              </button>
              <a
                className="button-outline"
                href="tel:+919667334803"
                title="Call YeloTrip directly"
              >
                <Phone size={16} aria-hidden="true" /> Call Desk
              </a>
            </div>

            <p className="quick-footer-note">
              🔒 Respecting your privacy under DPDP Act 2023. No spam, no automated booking. Vadodara, Gujarat.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
