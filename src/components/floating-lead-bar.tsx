"use client";

import { ChevronDown, ChevronUp, MessageCircle, Phone, Send, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { thematicSocialChannels } from "../../config/social";
import { FacebookIcon, InstagramIcon, LinkedinIcon, PinterestIcon, WhatsAppIcon, XIcon, YoutubeIcon } from "@/components/social-icons";
import QuickProposalModal from "@/components/quick-proposal-modal";

const iconMap = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  youtube: YoutubeIcon,
  pinterest: PinterestIcon,
  whatsapp: WhatsAppIcon,
};

export default function FloatingLeadBar() {
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [socialTrayOpen, setSocialTrayOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div className="floating-minimized-pill" aria-label="Expand quick trip desk">
        <button
          className="minimized-trigger"
          type="button"
          onClick={() => setIsMinimized(false)}
          title="Open quick travel desk"
          aria-expanded={false}
        >
          <Sparkles size={16} aria-hidden="true" />
          <span>Quick Travel Desk</span>
          <ChevronUp size={16} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <>
      <nav
        className="floating-lead-bar"
        aria-label="Quick travel actions and social contact"
      >
        <div className="floating-bar-inner">
          {/* Quick Action Buttons */}
          <div className="floating-core-actions">
            <button
              className="lead-action-btn lead-action-proposal"
              type="button"
              onClick={() => setProposalModalOpen(true)}
              aria-label="Open instant proposal form"
            >
              <Send size={15} aria-hidden="true" />
              <span>Get Proposal</span>
            </button>

            <Link
              className="lead-action-btn lead-action-plan"
              href="/plan-my-trip"
              aria-label="Start complete plan my trip flow"
            >
              <Sparkles size={15} aria-hidden="true" />
              <span>Plan My Trip</span>
            </Link>

            <a
              className="lead-action-btn lead-action-whatsapp"
              href="https://wa.me/919667334803?text=Hello%20YeloTrip%2C%20I%27d%20like%20to%20discuss%20a%20tailored%20travel%20proposal."
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with YeloTrip specialist on WhatsApp"
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span>WhatsApp Us</span>
            </a>

            <a
              className="lead-action-btn lead-action-call"
              href="tel:+919667334803"
              aria-label="Call YeloTrip travel desk at +91 96673 34803"
            >
              <Phone size={15} aria-hidden="true" />
              <span className="call-text">Call Desk</span>
            </a>
          </div>

          {/* Social Channels Trigger & Flyout */}
          <div className="floating-social-wrapper">
            <button
              className="lead-action-btn lead-social-trigger"
              type="button"
              onClick={() => setSocialTrayOpen(!socialTrayOpen)}
              aria-expanded={socialTrayOpen}
              aria-label="Toggle official social channels"
              title="Official social media channels"
            >
              <Share2 size={15} aria-hidden="true" />
              <span className="social-tag">@yelotrip</span>
            </button>

            {socialTrayOpen && (
              <div
                className="floating-social-tray"
                role="menu"
                aria-label="Official @yelotrip social channels"
              >
                {thematicSocialChannels.map((channel) => {
                  const Icon = iconMap[channel.id];
                  return (
                    <a
                      key={channel.id}
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-tray-item"
                      role="menuitem"
                      aria-label={`Visit YeloTrip on ${channel.name}`}
                      title={`${channel.name} · ${channel.handle}`}
                    >
                      <span
                        className="social-tray-color-dot"
                        style={{ background: channel.bgGradient || channel.color }}
                        aria-hidden="true"
                      >
                        <Icon size={14} className="social-tray-icon" />
                      </span>
                      <div className="social-tray-info">
                        <span className="social-tray-title">{channel.name}</span>
                        <span className="social-tray-sub">{channel.shortAction}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Minimize toggle */}
          <button
            className="floating-minimize-btn"
            type="button"
            onClick={() => setIsMinimized(true)}
            aria-label="Minimize quick travel desk"
            title="Minimize"
          >
            <ChevronDown size={17} aria-hidden="true" />
          </button>
        </div>
      </nav>

      <QuickProposalModal
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
        sourceContext="Floating Bar"
      />
    </>
  );
}
