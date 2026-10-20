"use client";

import { ArrowRight, HeartHandshake, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";

export default function HomeHero() {
  const { messages } = useLocale();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <span className="eyebrow">
          <Sparkles size={15} aria-hidden="true" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.35rem" }} />
          {messages.home.eyebrow}
        </span>
        <h1 className="font-display" id="hero-title">{messages.home.headline}</h1>
        <p className="hero-copy">{messages.home.description}</p>
        
        <div className="hero-actions">
          <Link className="button-primary hero-main-cta" href="/plan-my-trip">
            {messages.home.plan} <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <a
            className="button-outline hero-whatsapp-cta"
            href="https://wa.me/919667334803?text=Hello%20YeloTrip%2C%20I%20would%20like%20to%20plan%20a%20journey."
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} aria-hidden="true" style={{ color: "#25d366" }} />
            <span>WhatsApp a Specialist</span>
          </a>
          <a className="hero-secondary-link" href="#senior-comfort-guide">
            <ShieldCheck size={16} aria-hidden="true" style={{ color: "var(--lagoon-ink)" }} />
            <span>Senior &amp; Family Guide ↓</span>
          </a>
        </div>

        <div className="hero-reassurance">
          <span className="hero-note">
            <HeartHandshake size={17} aria-hidden="true" style={{ color: "var(--sunrise-gold)" }} />
            {messages.home.human}
          </span>
        </div>
      </div>

      <div className="hero-bottomline" aria-label="Travel support at every stage">
        <span>✓ Thoughtful Human Planning</span>
        <span>✓ 24/7 Support While You Travel</span>
        <span>✓ No Mass Templates or Hidden Fees</span>
        <span>✓ DPDP Act 2023 Statutory Privacy</span>
      </div>
    </section>
  );
}