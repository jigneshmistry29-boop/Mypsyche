"use client";

import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, FileText, Heart, HelpCircle, MessageCircle, Phone, Plane, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import QuickProposalModal from "@/components/quick-proposal-modal";

interface QueryItem {
  id: string;
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  question: string;
  shortAnswer: string;
  bulletPoints: string[];
  ctaLabel: string;
  ctaIntent: string;
}

const queries: QueryItem[] = [
  {
    id: "wheelchair-mobility",
    category: "Senior & Accessibility",
    icon: Heart,
    question: "Can we request airport wheelchair assistance and step-free stays?",
    shortAnswer: "Yes, seamlessly. We coordinate airline wheelchair codes (ramp, stairs, or full cabin escort) and verify ground-floor or lift-accessible rooms.",
    bulletPoints: [
      "Wheelchair service pre-registered on flight PNR with airline special handling desk.",
      "Strict audit of hotels for walk-in showers, elevators, and low step entrances.",
      "Private chauffeurs instructed for gentle driving and convenient doorstep drops.",
    ],
    ctaLabel: "Plan Accessible Journey",
    ctaIntent: "Wheelchair Assistance",
  },
  {
    id: "senior-insurance",
    category: "Health & Protection",
    icon: ShieldCheck,
    question: "What travel insurance covers senior citizens and pre-existing ailments?",
    shortAnswer: "We review international policy terms to highlight cashless hospitalization, emergency medical evacuation, and coverage rules for senior travellers up to 85+ years.",
    bulletPoints: [
      "Assistance comparing insurers with established worldwide cashless networks.",
      "Clear advice on carrying doctor prescription letters and maintenance medicines.",
      "Direct 24/7 emergency contact support from our travel desk.",
    ],
    ctaLabel: "Ask Insurance Specialist",
    ctaIntent: "Senior Insurance",
  },
  {
    id: "veg-jain-dining",
    category: "Family & Dining",
    icon: UtensilsCrossed,
    question: "Are pure vegetarian, Jain, and homely meals possible overseas?",
    shortAnswer: "Always. We handpick stays near authentic Indian/vegetarian kitchens and register special meal codes with international airlines (VJML/AVML/FPML).",
    bulletPoints: [
      "Special airline dietary requests confirmed prior to seat selection.",
      "Shortlisted accommodations near reputable vegetarian dining hubs.",
      "Apartment and villa options with private kitchenettes for family cooking.",
    ],
    ctaLabel: "Inquire Meal-Friendly Trip",
    ctaIntent: "Vegetarian Dining",
  },
  {
    id: "visa-readiness",
    category: "Documentation",
    icon: FileText,
    question: "How does YeloTrip help with visa documents, appointments, and checklists?",
    shortAnswer: "We provide tailored consular document checklists, review application readiness, and verify that flight and stay vouchers align perfectly before submission.",
    bulletPoints: [
      "Up-to-date document checklists for Schengen, UK, US, Japan, Dubai, and Southeast Asia.",
      "Thorough review to prevent common rejections or typographical mismatches.",
      "Guidance on appointment slot booking and consular submission protocols.",
    ],
    ctaLabel: "Request Visa Checklist",
    ctaIntent: "Visa Guidance",
  },
  {
    id: "proposal-timeline",
    category: "Process & Pricing",
    icon: Sparkles,
    question: "What is your proposal turnaround time and are bookings automatic?",
    shortAnswer: "Within 4 business hours. Every proposal is crafted by a human specialist. Nothing is ever auto-booked and there are never surprise hidden fees.",
    bulletPoints: [
      "Fast 4-hour review from our Vadodara desk during business hours.",
      "Transparent breakdown of supplier rates and potential savings.",
      "Full consultation via phone or WhatsApp before you commit to anything.",
    ],
    ctaLabel: "Get 4-Hour Proposal",
    ctaIntent: "Fast Proposal",
  },
  {
    id: "relaxed-itineraries",
    category: "Pacing & Comfort",
    icon: Plane,
    question: "Can we plan a relaxed itinerary without 5:00 AM rush and exhausting days?",
    shortAnswer: "That is our specialty. We schedule late morning starts, 1–2 key highlights per day, multi-night stays, and ample time for tea and leisurely walks.",
    bulletPoints: [
      "Multi-night stays in each destination so you unpack once and feel at home.",
      "Ample buffer time between transfers and flights to eliminate travel anxiety.",
      "Personalized pacing suited to children's energy and elders' walking speed.",
    ],
    ctaLabel: "Design Relaxed Route",
    ctaIntent: "Relaxed Pacing",
  },
];

export default function InstantQueryHub() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string>("wheelchair-mobility");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("Instant Query");

  const categories = ["all", "Senior & Accessibility", "Health & Protection", "Family & Dining", "Documentation", "Process & Pricing"];

  const filteredQueries = activeTab === "all"
    ? queries
    : queries.filter((q) => q.category === activeTab);

  function triggerModal(intent: string) {
    setModalContext(intent);
    setModalOpen(true);
  }

  return (
    <>
      <section className="instant-query-section section-space" id="query-hub" aria-labelledby="query-hub-title">
        <div className="section-wrap">
          <div className="query-hub-header">
            <span className="eyebrow">At the tip of your fingers</span>
            <h2 className="font-display" id="query-hub-title">
              Every Travel Question, Answered Instantly.
            </h2>
            <p className="query-hub-subtitle">
              Planning travel should feel reassuring, never stressful. Tap any question below for immediate clarity from our Vadodara travel desk.
            </p>

            {/* Filter Pills */}
            <div className="query-category-pills" role="tablist" aria-label="Filter travel queries">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeTab === cat}
                  className={`query-pill ${activeTab === cat ? "is-active" : ""}`}
                  onClick={() => setActiveTab(cat)}
                  type="button"
                >
                  {cat === "all" ? "All Key Queries" : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="query-accordion-grid">
            {filteredQueries.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedId === item.id;

              return (
                <article
                  key={item.id}
                  className={`query-card ${isExpanded ? "is-expanded" : ""}`}
                >
                  <button
                    type="button"
                    className="query-card-trigger"
                    onClick={() => setExpandedId(isExpanded ? "" : item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`answer-${item.id}`}
                  >
                    <div className="query-trigger-lead">
                      <span className="query-icon-wrap" aria-hidden="true">
                        <Icon size={18} />
                      </span>
                      <div className="query-title-wrap">
                        <span className="query-cat-badge">{item.category}</span>
                        <h3 className="query-question-text">{item.question}</h3>
                      </div>
                    </div>
                    <span className="query-toggle-icon">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="query-answer-body" id={`answer-${item.id}`}>
                      <p className="query-short-answer">{item.shortAnswer}</p>

                      <ul className="query-points-list">
                        {item.bulletPoints.map((point, index) => (
                          <li key={index}>
                            <CheckCircle2 size={16} aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="query-card-actions">
                        <button
                          type="button"
                          className="button-primary"
                          style={{ minHeight: "2.5rem", padding: "0.4rem 0.95rem", fontSize: "0.84rem" }}
                          onClick={() => triggerModal(item.ctaIntent)}
                        >
                          {item.ctaLabel} <ArrowRight size={14} aria-hidden="true" />
                        </button>

                        <a
                          href={`https://wa.me/919667334803?text=${encodeURIComponent(`Hello YeloTrip, I have a quick question regarding ${item.question}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="button-outline"
                          style={{ minHeight: "2.5rem", padding: "0.4rem 0.95rem", fontSize: "0.84rem" }}
                        >
                          <MessageCircle size={15} aria-hidden="true" /> WhatsApp Desk
                        </a>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Quick Help Strip */}
          <div className="query-bottom-strip">
            <div className="strip-text">
              <HelpCircle size={20} aria-hidden="true" />
              <span>Have a specific destination or custom query in mind?</span>
            </div>
            <div className="strip-cta">
              <Link className="button-light" href="/plan-my-trip">
                Start Full Enquiry <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a className="button-outline" href="tel:+919667334803">
                <Phone size={15} aria-hidden="true" /> +91 96673 34803
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuickProposalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        sourceContext={modalContext}
      />
    </>
  );
}
