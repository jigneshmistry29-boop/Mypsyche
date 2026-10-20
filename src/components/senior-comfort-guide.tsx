"use client";

import { ArrowRight, CheckCircle2, HeartHandshake, MessageCircle, Phone, Sparkles, UserCheck } from "lucide-react";
import { useState } from "react";
import QuickProposalModal from "@/components/quick-proposal-modal";

interface ComfortPillar {
  id: string;
  badge: string;
  tag: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  intent: string;
}

const comfortPillars: ComfortPillar[] = [
  {
    id: "wheelchair-mobility",
    badge: "Step-Free Journeys",
    tag: "Mobility & Ramp Assistance",
    icon: "♿",
    title: "Dedicated Wheelchair & Airport Special Handling",
    description: "Travel with absolute peace of mind. We pre-coordinate end-to-end airline assistance codes and audit every hotel for true step-free accessibility.",
    features: [
      "Airline wheelchair codes (WCHR ramp / WCHS stairs / WCHC cabin seat) pre-booked on flight tickets",
      "Priority check-in, dedicated immigration escort & electric buggy transfers inside terminals",
      "Hotels personally verified for ground-floor or wide elevator access with walk-in showers & grab bars",
      "Private chauffeurs instructed for patient, gentle driving and convenient curbside drop-offs",
    ],
    ctaText: "Plan Accessible Trip",
    intent: "Wheelchair Assistance",
  },
  {
    id: "senior-insurance",
    badge: "Healthcare Protection",
    tag: "Medical & Cashless Support",
    icon: "🛡️",
    title: "Comprehensive Senior Citizen Medical Insurance",
    description: "Robust health protection tailored for senior travellers up to 85+ years, ensuring immediate cashless medical access worldwide with zero anxiety.",
    features: [
      "Cashless hospitalization networks with leading global emergency assistance partners",
      "Coverage guidance for pre-existing medical conditions and emergency prescription refills",
      "Emergency medical evacuation and family companion travel cover included in reviewed policies",
      "24/7 Vadodara concierge desk to coordinate claim documents and hospital coordination",
    ],
    ctaText: "Ask Insurance Specialist",
    intent: "Senior Medical Insurance",
  },
  {
    id: "relaxed-pacing",
    badge: "No Rush Itineraries",
    tag: "Gentle Pacing & Rest",
    icon: "🌿",
    title: "Relaxed Pacing & Homely Dietary Comfort",
    description: "No early morning alarms, no frantic multi-city rushes. We curate leisurely schedules with multi-night stays and authentic pure vegetarian or Jain dining.",
    features: [
      "Late morning starts (10:00 AM+) and maximum 1 to 2 relaxed highlights per day",
      "Multi-night stays in each boutique hotel so seniors and children unpack once and rest comfortably",
      "Airlines pre-booked with Vegetarian Jain (VJML) or Asian Vegetarian (AVML) meal codes",
      "Handpicked accommodations near homely Indian/vegetarian dining hubs with private kitchenette options",
    ],
    ctaText: "Design Relaxed Route",
    intent: "Relaxed Pacing Itinerary",
  },
];

export default function SeniorComfortGuide() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState("Senior Comfort Guide");

  function openProposal(intent: string) {
    setSelectedIntent(intent);
    setModalOpen(true);
  }

  return (
    <>
      <section
        className="senior-comfort-section section-space"
        id="senior-comfort-guide"
        aria-labelledby="comfort-guide-title"
      >
        <div className="section-wrap">
          {/* Header */}
          <div className="comfort-header">
            <span className="eyebrow">
              <HeartHandshake size={16} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.4rem" }} />
              Multi-Generational Care
            </span>
            <h2 className="font-display" id="comfort-guide-title">
              Senior Citizen & Family Comfort Guide
            </h2>
            <p className="comfort-intro">
              Travelling with parents, grandparents, or young children requires thoughtful empathy, generous pacing, and ironclad care. Here is how our Vadodara travel desk ensures every generation travels with dignity and delight.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="comfort-cards-grid">
            {comfortPillars.map((pillar) => (
              <article key={pillar.id} className="comfort-card">
                <div className="comfort-icon-badge" style={{ background: "rgba(255, 193, 7, 0.18)" }}>
                  <span className="badge-icon" aria-hidden="true">{pillar.icon}</span>
                </div>
                <span className="comfort-card-tag">{pillar.tag}</span>
                <h3 className="font-display">{pillar.title}</h3>
                <p>{pillar.description}</p>

                <ul className="comfort-feature-list" aria-label={`Features for ${pillar.title}`}>
                  {pillar.features.map((feat, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: "auto", display: "flex", gap: "0.6rem", flexWrap: "wrap", paddingTop: "1rem" }}>
                  <button
                    type="button"
                    className="button-primary"
                    style={{ minHeight: "2.5rem", padding: "0.45rem 1rem", fontSize: "0.85rem", flex: 1 }}
                    onClick={() => openProposal(pillar.intent)}
                  >
                    {pillar.ctaText} <ArrowRight size={14} aria-hidden="true" />
                  </button>
                  <a
                    href={`https://wa.me/919667334803?text=${encodeURIComponent(`Hello YeloTrip, I would like to consult on ${pillar.title} for our family trip.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="button-outline"
                    style={{ minHeight: "2.5rem", padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
                    aria-label={`WhatsApp about ${pillar.title}`}
                  >
                    <MessageCircle size={15} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Senior Care Reassurance Banner */}
          <div
            style={{
              background: "var(--paper)",
              border: "1.5px solid var(--line)",
              borderRadius: "14px",
              padding: "1.6rem 2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              flexWrap: "wrap",
              boxShadow: "0 4px 20px rgba(19, 42, 74, 0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", maxWidth: "700px" }}>
              <div
                style={{
                  background: "var(--midnight-ocean)",
                  color: "var(--sunrise-gold)",
                  width: "2.8rem",
                  height: "2.8rem",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <UserCheck size={22} aria-hidden="true" />
              </div>
              <div>
                <strong style={{ display: "block", color: "var(--ink)", fontSize: "1.05rem", marginBottom: "0.2rem" }}>
                  Have an elder traveller with special medication or walking constraints?
                </strong>
                <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  Call our Vadodara specialists directly. We take down medication timings, dietary restrictions, and room proximity preferences before proposing a single flight or hotel.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                type="button"
                className="button-primary"
                style={{ minHeight: "2.6rem", padding: "0.5rem 1.25rem", fontSize: "0.88rem" }}
                onClick={() => openProposal("Family Consultation")}
              >
                <Sparkles size={15} aria-hidden="true" /> Request Senior Consultation
              </button>
              <a
                className="button-outline"
                style={{ minHeight: "2.6rem", padding: "0.5rem 1.15rem", fontSize: "0.88rem" }}
                href="tel:+919667334803"
              >
                <Phone size={15} aria-hidden="true" /> +91 96673 34803
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuickProposalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        sourceContext={selectedIntent}
      />
    </>
  );
}
