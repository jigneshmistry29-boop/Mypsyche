"use client";

import { ArrowRight, MessageCircle, Send, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAttribution } from "@/lib/attribution";
import { FacebookIcon, InstagramIcon, LinkedinIcon, PinterestIcon, WhatsAppIcon, XIcon, YoutubeIcon } from "@/components/social-icons";
import QuickProposalModal from "@/components/quick-proposal-modal";

interface ChannelConfig {
  name: string;
  badge: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  heading: string;
  subtext: string;
  accentColor: string;
  whatsappMessage: string;
}

const channels: Record<string, ChannelConfig> = {
  Instagram: {
    name: "Instagram",
    badge: "Arrived from Instagram",
    icon: InstagramIcon,
    heading: "Turn your saved travel reels into an effortless journey.",
    subtext: "Welcome to YeloTrip! Our Vadodara travel specialists translate your visual bucket list into custom, pacing-friendly itineraries.",
    accentColor: "#e1306c",
    whatsappMessage: "Hi YeloTrip, I came from your Instagram and would love to turn my saved travel ideas into a proposal!",
  },
  Facebook: {
    name: "Facebook",
    badge: "Welcome from Facebook",
    icon: FacebookIcon,
    heading: "Planning a cherished family getaway, cruise, or reunion?",
    subtext: "Welcome! We design multi-generational travel with generous breathing room, accessible stays, and real human care.",
    accentColor: "#1877f2",
    whatsappMessage: "Hello YeloTrip, I connected via Facebook and would like to discuss a family holiday.",
  },
  LinkedIn: {
    name: "LinkedIn",
    badge: "Welcome from LinkedIn",
    icon: LinkedinIcon,
    heading: "Executive retreats, founder travel & seamless MICE programs.",
    subtext: "Welcome! A dedicated travel desk in Vadodara to coordinate complex team schedules, offsites, and flights with zero friction.",
    accentColor: "#0a66c2",
    whatsappMessage: "Hello YeloTrip team, reaching out via LinkedIn regarding corporate travel & MICE planning.",
  },
  X: {
    name: "X (Twitter)",
    badge: "Connected via X",
    icon: XIcon,
    heading: "No travel bots, no hidden charges — pure human curation.",
    subtext: "Welcome from X! We listen first, compare supplier options, and bring every detail together with transparent advice.",
    accentColor: "#111111",
    whatsappMessage: "Hi YeloTrip, found you on X! Looking to discuss custom travel arrangements.",
  },
  YouTube: {
    name: "YouTube",
    badge: "Inspired by YouTube Stories",
    icon: YoutubeIcon,
    heading: "Ready to walk the destinations you’ve been watching?",
    subtext: "Welcome! Let our specialists craft the exact route, authentic stays, and travel documents for your dream adventure.",
    accentColor: "#ff0000",
    whatsappMessage: "Hello YeloTrip, inspired by your travel videos and looking to plan a trip!",
  },
  Pinterest: {
    name: "Pinterest",
    badge: "From Pinterest Moodboard",
    icon: PinterestIcon,
    heading: "Bring your dream travel pins into real flight & stay plans.",
    subtext: "Welcome! Share the places and aesthetics you love; we’ll handle flights, boutique stays, pacing, and visa checklists.",
    accentColor: "#bd081c",
    whatsappMessage: "Hi YeloTrip, I came from Pinterest with a travel moodboard and want to build an itinerary!",
  },
  WhatsApp: {
    name: "WhatsApp",
    badge: "Connected via WhatsApp",
    icon: WhatsAppIcon,
    heading: "Your dedicated travel desk is right by your side.",
    subtext: "Welcome back! Connect with our team in Vadodara for quick questions, proposal reviews, or family trip arrangements.",
    accentColor: "#25d366",
    whatsappMessage: "Hello YeloTrip, continuing our conversation about holiday planning.",
  },
  Organic: {
    name: "YeloTrip Desk",
    badge: "Personalised Travel Planning",
    icon: Sparkles,
    heading: "Every journey begins with a dream. We take care of the rest.",
    subtext: "Welcome to YeloTrip! Personalised travel facilitation based in Vadodara, Gujarat. We listen first, then plan around who you are.",
    accentColor: "var(--sunrise-gold)",
    whatsappMessage: "Hello YeloTrip, I would like to explore trip planning options with your team.",
  },
};

export default function SocialWelcomeBanner() {
  const [activeChannel, setActiveChannel] = useState<ChannelConfig | null>(null);
  const [dismissed, setDismissed] = useState(true);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isDismissed = sessionStorage.getItem("yelotrip-social-banner-dismissed");
      if (isDismissed === "true") {
        return;
      }

      const attribution = getAttribution();
      const source = attribution.get("source") || attribution.get("utm_source") || "";

      let matched: ChannelConfig = channels.Organic;
      if (source.includes("Instagram")) matched = channels.Instagram;
      else if (source.includes("Facebook")) matched = channels.Facebook;
      else if (source.includes("LinkedIn")) matched = channels.LinkedIn;
      else if (source.includes("X") || source.toLowerCase().includes("twitter")) matched = channels.X;
      else if (source.includes("YouTube")) matched = channels.YouTube;
      else if (source.includes("Pinterest")) matched = channels.Pinterest;
      else if (source.includes("WhatsApp")) matched = channels.WhatsApp;

      setActiveChannel(matched);
      setDismissed(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem("yelotrip-social-banner-dismissed", "true");
    } catch {
      // Ignore storage errors
    }
  }

  if (dismissed || !activeChannel) return null;

  const Icon = activeChannel.icon;

  return (
    <>
      <aside
        className="social-welcome-banner"
        role="region"
        aria-label={`Welcome message for ${activeChannel.name} visitors`}
      >
        <div className="section-wrap banner-inner">
          <div className="banner-context">
            <span className="banner-badge" style={{ borderColor: activeChannel.accentColor }}>
              <Icon size={16} aria-hidden="true" />
              <span>{activeChannel.badge}</span>
            </span>
            <div className="banner-text">
              <h3 className="banner-title">{activeChannel.heading}</h3>
              <p className="banner-desc">{activeChannel.subtext}</p>
            </div>
          </div>

          <div className="banner-actions">
            <button
              className="banner-cta-primary"
              type="button"
              onClick={() => setProposalModalOpen(true)}
            >
              <Send size={15} aria-hidden="true" />
              <span>Get Proposal</span>
            </button>

            <Link
              className="banner-cta-outline"
              href={`/plan-my-trip?utm_source=${encodeURIComponent(activeChannel.name)}`}
            >
              <span>Plan My Trip</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>

            <a
              className="banner-cta-whatsapp"
              href={`https://wa.me/919667334803?text=${encodeURIComponent(activeChannel.whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with YeloTrip on WhatsApp"
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span>WhatsApp Us</span>
            </a>

            <button
              className="banner-dismiss"
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss welcome message"
              title="Close welcome banner"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>

      <QuickProposalModal
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
        sourceContext={activeChannel.name}
      />
    </>
  );
}
