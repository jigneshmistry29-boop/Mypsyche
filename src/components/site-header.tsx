"use client";

import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { captureAttribution } from "@/lib/attribution";
import { useLocale, type Locale } from "@/components/locale-provider";
import { scheduledLanguagesOfIndia } from "../../config/languages";
import AccessibilityBar from "@/components/accessibility/AccessibilityBar";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, messages } = useLocale();

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    captureAttribution();
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
        console.error("YeloTrip offline support could not be registered", error);
      });
    }
  }, []);

  const links = [
    [messages.nav.about, "/about"],
    [messages.nav.services, "/services"],
    [messages.nav.planning, "/plan-my-trip"],
    [messages.nav.corporate, "/corporate"],
    [messages.nav.planner, "/ai-planner"],
    [messages.nav.resources, "/resources"],
    [messages.nav.care, "/customer-care"],
    [messages.nav.contact, "/contact"],
  ];

  function languagePicker(id: string) {
    return (
      <select
        className="language-selector"
        id={id}
        aria-label={messages.languageLabel}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
      >
        <optgroup label="Default">
          <option value="en">English (Pan-India)</option>
        </optgroup>
        <optgroup label="22 Eighth Schedule Languages of India">
          {scheduledLanguagesOfIndia
            .filter((lang) => lang.code !== "en")
            .map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.englishName}{lang.isRtl ? " · RTL" : ""})
              </option>
            ))}
        </optgroup>
      </select>
    );
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-lockup" href="/" aria-label="YeloTrip home">
          <span className="brand-logo-frame">
            <Image
              className="brand-logo"
              src="/yelotrip-logo.svg"
              alt="YeloTrip"
              width={198}
              height={43}
              priority
            />
          </span>
          <span className="brand-caption">{messages.brand.tagline}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
          {languagePicker("desktop-language")}
        </nav>

        <div className="header-actions">
          <AccessibilityBar />
          <a
            className="header-cta"
            href="tel:+919667334803"
            aria-label="Call YeloTrip at +91 96673 34803"
          >
            <Phone size={15} aria-hidden="true" />
            <span>Talk to a specialist</span>
          </a>
          <button
            className="menu-trigger"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-menu" id="mobile-navigation" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <label className="mobile-language-label" htmlFor="mobile-language">
            {messages.languageLabel}
          </label>
          {languagePicker("mobile-language")}
          <a href="https://wa.me/919667334803" target="_blank" rel="noreferrer">
            WhatsApp a specialist
          </a>
        </nav>
      )}
    </header>
  );
}
