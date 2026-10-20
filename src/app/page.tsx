import type { Metadata } from "next";
import { ArrowRight, Compass, HeartHandshake, MapPin, MessageCircle, Phone, Plane, ShieldCheck, Sparkles, Star, Users, Utensils } from "lucide-react";
import Link from "next/link";
import HomeHero from "@/components/home-hero";
import SeniorComfortGuide from "@/components/senior-comfort-guide";
import InstantQueryHub from "@/components/instant-query-hub";
import CallbackInquiryForm from "@/components/callback-inquiry-form";
import FAQSection from "@/components/faq-section";

export const metadata: Metadata = {
  title: "YeloTrip | Every journey begins with a dream",
  description:
    "Thoughtful, personalised travel planning and facilitation from real specialists in Vadodara, Gujarat. Universally accessible itineraries for children, families, and senior citizens.",
  openGraph: {
    title: "YeloTrip | Personalised Travel Planning & Family Comfort",
    description: "Multi-generational travel planning with wheelchair assistance, senior medical cover, and relaxed pacing from Vadodara.",
  },
};

const curatedJourneys = [
  {
    title: "Slow-Paced Pilgrimage & Heritage",
    badge: "Senior Favoured",
    tagline: "Curated for spiritual peace and zero walking strain",
    description: "Door-to-door private AC chauffeurs, verified ground-floor rooms near sanctums, and pre-booked wheelchair or battery-cart arrangements.",
    destinations: ["Varanasi & Ayodhya", "Rameshwaram & Madurai", "Tirupati VIP Darshan", "Dwarka & Somnath"],
    icon: Compass,
    color: "#ffc107",
  },
  {
    title: "Cherished Multi-Gen Family Holidays",
    badge: "All Generations",
    tagline: "Unpack once, relax together, bond effortlessly",
    description: "Private heritage villas, apartments with private kitchenettes for home cooking, and balanced pacing accommodating children and grandparents alike.",
    destinations: ["Kerala Backwaters & Hills", "Royal Rajasthan Havelis", "Scenic Swiss Alpine Rail", "Bali Private Pool Villas"],
    icon: Users,
    color: "#00a8a8",
  },
  {
    title: "Kid-Friendly World Explorations",
    badge: "Family with Children",
    tagline: "Safe, cheerful discoveries with built-in rest stops",
    description: "Stroller-friendly theme parks, airline bassinet coordination, wildlife encounters with vetted naturalists, and flexible afternoon downtime.",
    destinations: ["Singapore & Sentosa", "Dubai & Desert Wonders", "Japan Golden Route", "London & Harry Potter Magic"],
    icon: Sparkles,
    color: "#f97316",
  },
  {
    title: "Cruise & Luxury Scenic Rail",
    badge: "Zero Travel Fatigue",
    tagline: "Floating boutique hotels with 24/7 on-board medical staff",
    description: "Glide between iconic global ports without packing and unpacking each morning. Elevators, gourmet vegetarian dining, and gentle shore excursions.",
    destinations: ["Mediterranean Explorer", "Singapore & Southeast Asia", "Alaskan Glaciers", "European River Cruising"],
    icon: Plane,
    color: "#38bdf8",
  },
];

const trustPillars = [
  {
    icon: HeartHandshake,
    title: "A Human Travel Desk in Vadodara",
    desc: "Speak with passionate travel specialists who genuinely listen to your family’s habits, medical requirements, and dietary preferences before suggesting an outline.",
  },
  {
    icon: ShieldCheck,
    title: "DPDP Act 2023 Compliant",
    desc: "Your family's contact details and passport information are handled with statutory legal protection under Indian data fiduciary rules. Never shared or sold.",
  },
  {
    icon: Utensils,
    title: "Homely Veg & Jain Meal Assurance",
    desc: "We verify airline meal codes and handpick accommodations near authentic vegetarian kitchens so your loved ones always eat comfortably.",
  },
  {
    icon: Phone,
    title: "24/7 Support While You Travel",
    desc: "Flight delay or hotel check-in question? A real person from our Vadodara team stays directly reachable via WhatsApp and phone throughout your trip.",
  },
];

const homeFaqs = [
  {
    question: "How does YeloTrip ensure comfortable travel for senior citizens?",
    answer: "We incorporate dedicated airport wheelchair assistance codes (WCHR/WCHS/WCHC) on your flight PNRs, inspect hotel rooms for step-free access, elevators, and walk-in showers, and design relaxed itineraries with late starts (10:00 AM+) and multi-night stays so elders never feel rushed.",
  },
  {
    question: "Can we request pure vegetarian, Jain, or specific dietary dining overseas?",
    answer: "Absolutely. We register international airline dietary codes (such as VJML for Vegetarian Jain Meal and AVML for Asian Vegetarian) and shortlist accommodations situated near reputable Indian and vegetarian dining establishments or villas equipped with kitchenettes.",
  },
  {
    question: "Does YeloTrip automatically charge or confirm bookings from this website?",
    answer: "No. YeloTrip operates strictly as an expert travel planning and facilitation consultancy based in Vadodara, Gujarat. Every itinerary is discussed with you beforehand. We never execute automated bookings or surprise debit authorizations.",
  },
  {
    question: "What is your proposal turnaround time?",
    answer: "Our team typically delivers a personalised trip framework within 4 business hours from our Vadodara travel desk. You can review supplier details, flight options, and transparent pricing with no pressure or obligations.",
  },
  {
    question: "How do you assist with travel insurance for travellers over 70 years?",
    answer: "We help you compare international policies featuring extensive cashless hospitalization networks worldwide, emergency medical evacuation coverage, and clear underwriting rules for senior citizens up to 85+ years.",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="homepage-main">
      {/* 1. Hero Section */}
      <HomeHero />

      {/* 2. Prominent Senior Citizen & Family Comfort Guide */}
      <SeniorComfortGuide />

      {/* 3. Instant Query Hub (Every Query At The Tip Of Your Fingers) */}
      <InstantQueryHub />

      {/* 4. Curated Multi-Generational Journeys */}
      <section className="section-space" style={{ background: "var(--canvas)" }} aria-labelledby="curated-journeys-title">
        <div className="section-wrap">
          <div style={{ maxWidth: "780px", marginBottom: "3rem" }}>
            <span className="eyebrow">
              <MapPin size={16} aria-hidden="true" style={{ display: "inline", marginRight: "0.4rem" }} />
              Thoughtfully Paced Routes
            </span>
            <h2 className="font-display" id="curated-journeys-title" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", margin: "0.5rem 0 0.85rem" }}>
              Journeys Crafted for Every Stage of Life
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: "1.08rem", lineHeight: "1.6", margin: 0 }}>
              Whether you are travelling with energetic toddlers, curious teenagers, or cherished elders, every journey is planned around your family’s natural rhythm.
            </p>
          </div>

          <div className="journeys-grid">
            {curatedJourneys.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="journey-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        borderRadius: "10px",
                        background: `color-mix(in srgb, ${item.color} 22%, var(--paper))`,
                        color: "var(--midnight-ocean)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <span
                      style={{
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        background: "var(--canvas)",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "999px",
                        border: "1px solid var(--line)",
                        color: "var(--ink)",
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display" style={{ fontSize: "1.38rem", margin: "0 0 0.4rem", color: "var(--ink)" }}>
                    {item.title}
                  </h3>
                  <strong style={{ display: "block", fontSize: "0.85rem", color: "var(--lagoon-ink)", marginBottom: "0.75rem", fontWeight: 600 }}>
                    {item.tagline}
                  </strong>
                  <p style={{ fontSize: "0.92rem", color: "var(--ink-soft)", lineHeight: "1.55", margin: "0 0 1.25rem" }}>
                    {item.description}
                  </p>

                  <div style={{ marginTop: "auto" }}>
                    <span style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-soft)", marginBottom: "0.5rem" }}>
                      Popular Ideas:
                    </span>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {item.destinations.map((dest, i) => (
                        <li key={i} style={{ fontSize: "0.86rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.color }} />
                          <span>{dest}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/plan-my-trip?style=${encodeURIComponent(item.title)}`}
                      className="button-primary"
                      style={{ width: "100%", fontSize: "0.88rem", padding: "0.5rem 1rem" }}
                    >
                      Plan Similar Journey <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. The YeloTrip Human Care Promise */}
      <section className="section-space" style={{ background: "var(--paper)", borderBlock: "1px solid var(--line)" }} aria-labelledby="promise-title">
        <div className="section-wrap">
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.5rem" }}>
            <span className="eyebrow">
              <Star size={16} aria-hidden="true" style={{ display: "inline", marginRight: "0.4rem" }} />
              Our Core Philosophy
            </span>
            <h2 className="font-display" id="promise-title" style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", margin: "0.5rem 0 0.85rem" }}>
              Travel Planning, Made Truly Human.
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: "1.08rem", lineHeight: "1.6", margin: 0 }}>
              We do not treat travel like an algorithm or a mass factory package. Behind every YeloTrip itinerary is a real, empathetic specialist in Vadodara, Gujarat.
            </p>
          </div>

          <div className="promise-grid">
            {trustPillars.map((tp, idx) => {
              const Icon = tp.icon;
              return (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div
                    style={{
                      width: "3.2rem",
                      height: "3.2rem",
                      borderRadius: "12px",
                      background: "var(--midnight-ocean)",
                      color: "var(--sunrise-gold)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="font-display" style={{ fontSize: "1.25rem", margin: 0, color: "var(--ink)" }}>
                    {tp.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--ink-soft)", lineHeight: "1.55" }}>
                    {tp.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Vadodara Desk Contact Strip */}
          <div className="vadodara-desk-card">
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lagoon-ink)" }}>
                Vadodara Travel Desk · Gujarat, India
              </span>
              <h3 className="font-display" style={{ fontSize: "1.45rem", margin: "0.3rem 0 0.4rem", color: "var(--ink)" }}>
                Prefer to speak directly with our senior consultant?
              </h3>
              <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: "0.92rem" }}>
                Our specialists are available 10:00 AM – 7:00 PM IST (Mon–Sat) to discuss your family plans.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                className="button-primary"
                href="tel:+919667334803"
                style={{ minHeight: "2.6rem" }}
              >
                <Phone size={15} aria-hidden="true" /> Call +91 96673 34803
              </a>
              <a
                className="button-outline"
                href="https://wa.me/919667334803?text=Hello%20YeloTrip%2C%20I%20would%20like%20to%20consult%20with%20your%20Vadodara%20desk."
                target="_blank"
                rel="noreferrer"
                style={{ minHeight: "2.6rem" }}
              >
                <MessageCircle size={15} aria-hidden="true" /> WhatsApp Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quick Callback Enquiry Section */}
      <section className="section-space" style={{ background: "var(--canvas)" }} aria-labelledby="callback-section-title">
        <div className="section-wrap callback-grid">
          <div>
            <span className="eyebrow">Quick Consultation</span>
            <h2 className="font-display" id="callback-section-title" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", margin: "0.5rem 0 1rem" }}>
              Leave your number. We will call you right back.
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
              No complicated questionnaires or long wait times. Leave a phone number and preferred time, and a YeloTrip specialist will connect to understand your journey.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.92rem", color: "var(--ink)" }}>
                <span style={{ color: "var(--palm-green)", fontWeight: 700 }}>✓</span>
                <span>Zero obligation, 100% human conversation</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.92rem", color: "var(--ink)" }}>
                <span style={{ color: "var(--palm-green)", fontWeight: 700 }}>✓</span>
                <span>Direct inquiry receipt sent to customer.care@yelotrip.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.92rem", color: "var(--ink)" }}>
                <span style={{ color: "var(--palm-green)", fontWeight: 700 }}>✓</span>
                <span>DPDP Act 2023 protected with instant SMS / WhatsApp reference ID</span>
              </div>
            </div>
          </div>

          <div className="callback-card-wrapper">
            <CallbackInquiryForm />
          </div>
        </div>
      </section>

      {/* 7. Comprehensive FAQ with Schema.org */}
      <section className="section-space" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }} aria-labelledby="faq-section-heading">
        <div className="section-wrap">
          <FAQSection items={homeFaqs} />
        </div>
      </section>
    </main>
  );
}
