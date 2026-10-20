"use client";

import { Accessibility, Check, Eye, Globe, Heart, Search, X, ZoomIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale, type Locale } from "@/components/locale-provider";
import { scheduledLanguagesOfIndia } from "../../config/languages";

type AccessMode = "warm" | "dark" | "contrast" | "night";
type Preferences = {
  mode: AccessMode;
  fontScale: string;
  dyslexiaFont: boolean;
  motionOff: boolean;
  seniorPresetActive?: boolean;
};

const preferenceKey = "yelotrip-accessibility";
const defaults: Preferences = {
  mode: "warm",
  fontScale: "100",
  dyslexiaFont: false,
  motionOff: false,
  seniorPresetActive: false,
};

function readPreferences(): Preferences {
  if (typeof window === "undefined") return defaults;
  try {
    const stored = localStorage.getItem(preferenceKey);
    if (stored) return { ...defaults, ...(JSON.parse(stored) as Partial<Preferences>) };
  } catch {
    localStorage.removeItem(preferenceKey);
  }
  return defaults;
}

export default function AccessibilityBar() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState(readPreferences);
  const [announcement, setAnnouncement] = useState("");
  const [langSearch, setLangSearch] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const { mode, fontScale, dyslexiaFont, motionOff, seniorPresetActive } = preferences;
  const { locale, setLocale, currentLanguage } = useLocale();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-dark", mode === "dark");
    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("contrast-high", mode === "contrast");
    root.classList.toggle("brightness-reduced", mode === "night");
    root.classList.toggle("font-dyslexic", dyslexiaFont);
    root.classList.toggle("motion-off", motionOff);
    root.style.fontSize = `${fontScale}%`;
    root.style.setProperty("--font-scale", `${fontScale}%`);
    localStorage.setItem(preferenceKey, JSON.stringify(preferences));
  }, [preferences, mode, fontScale, dyslexiaFont, motionOff]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    const dialog = dialogRef.current;
    const getFocusable = () =>
      dialog?.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
    getFocusable()?.[0]?.focus();

    function containFocus(event: KeyboardEvent) {
      if (event.key !== "Tab" || !dialog) return;
      const items = getFocusable();
      const first = items?.[0];
      const last = items?.[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", containFocus);
    return () => {
      document.removeEventListener("keydown", containFocus);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    setPreferences((current) => ({ ...current, [key]: value, seniorPresetActive: false }));
    setAnnouncement(`Updated ${String(key)}`);
  }

  function applySeniorPreset() {
    const nextSeniorState = !seniorPresetActive;
    if (nextSeniorState) {
      setPreferences({
        mode: "contrast",
        fontScale: "130",
        dyslexiaFont: true,
        motionOff: true,
        seniorPresetActive: true,
      });
      setAnnouncement("Senior Comfort Mode enabled with large text, high contrast, and reduced motion.");
    } else {
      setPreferences(defaults);
      setAnnouncement("Standard display mode restored.");
    }
  }

  function resetAll() {
    setPreferences(defaults);
    setLocale("en");
    setAnnouncement("Display and language preferences reset to default.");
  }

  const filteredLanguages = scheduledLanguagesOfIndia.filter((l) => {
    if (!langSearch.trim()) return true;
    const q = langSearch.toLowerCase();
    return (
      l.nativeName.toLowerCase().includes(q) ||
      l.englishName.toLowerCase().includes(q) ||
      l.regionHint.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <button
        className="access-trigger accessibility-bubble"
        ref={triggerRef}
        type="button"
        aria-label="Open multi-generational accessibility, reading preferences and Indian scheduled languages (સુગમતા / सुगमता / భాష / மொழி)"
        title="Accessibility, Reading & Indian Scheduled Languages"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="accessibility-dialog"
        onClick={() => setOpen(true)}
      >
        <Accessibility size={22} aria-hidden="true" />
        <span className="sr-only">Accessibility &amp; Language Settings</span>
      </button>

      {open && (
        <div
          className="access-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            ref={dialogRef}
            id="accessibility-dialog"
            className="access-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="access-title"
          >
            <div className="access-dialog-head">
              <div>
                <h2 id="access-title" className="font-display">
                  Reading &amp; Languages
                </h2>
                <span className="access-subhead">
                  Universal accessibility &amp; all 22 Eighth Schedule languages of India
                </span>
              </div>
              <button
                className="access-close"
                type="button"
                aria-label="Close accessibility settings"
                onClick={() => setOpen(false)}
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>

            <p className="access-intro">
              Personalise your viewing experience and regional Indian language. Settings persist automatically on your device.
            </p>

            {/* Quick Multi-Generational Preset */}
            <div className="access-preset-banner">
              <button
                type="button"
                className={`senior-mode-btn ${seniorPresetActive ? "is-active" : ""}`}
                onClick={applySeniorPreset}
                aria-pressed={seniorPresetActive}
              >
                <Heart size={18} aria-hidden="true" />
                <div className="preset-text">
                  <strong>Senior Citizen Comfort Mode</strong>
                  <span>130% Extra Large font + High Contrast + Low Motion</span>
                </div>
                {seniorPresetActive && <Check size={18} aria-hidden="true" />}
              </button>
            </div>

            {/* Scheduled Languages of India Section */}
            <div className="access-group access-lang-section">
              <div className="lang-section-header">
                <span id="language-label" className="access-group-title" style={{ margin: 0 }}>
                  <Globe size={15} aria-hidden="true" /> All 22 Scheduled Languages of India
                </span>
                <span className="current-lang-pill">
                  {currentLanguage.nativeName} ({currentLanguage.englishName})
                </span>
              </div>

              <div className="lang-search-wrapper">
                <Search size={14} className="lang-search-icon" aria-hidden="true" />
                <input
                  type="text"
                  className="lang-search-input"
                  placeholder="Search 22 languages (e.g. Gujarati, Tamil, Bengali, Urdu...)"
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                  aria-label="Filter 22 Scheduled Languages of India"
                />
                {langSearch && (
                  <button
                    type="button"
                    className="lang-search-clear"
                    onClick={() => setLangSearch("")}
                    aria-label="Clear search"
                  >
                    <X size={13} aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="scheduled-languages-scroll-grid" role="group" aria-labelledby="language-label">
                {filteredLanguages.map((lang) => {
                  const isSelected = locale === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      className={`lang-choice-card ${isSelected ? "is-selected" : ""}`}
                      onClick={() => {
                        setLocale(lang.code as Locale);
                        setAnnouncement(`Language switched to ${lang.englishName} (${lang.nativeName})`);
                      }}
                      aria-pressed={isSelected}
                    >
                      <div className="lang-card-lead">
                        <strong className="lang-native">{lang.nativeName}</strong>
                        <span className="lang-english">
                          {lang.englishName}
                          {lang.isRtl && <span className="lang-rtl-badge">RTL</span>}
                        </span>
                      </div>
                      <span className="lang-region">{lang.regionHint}</span>
                      {isSelected && <Check size={16} className="lang-check" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colour Modes */}
            <div className="access-group">
              <span id="mode-label" className="access-group-title">
                <Eye size={15} aria-hidden="true" /> Colour &amp; Contrast
              </span>
              <div className="choice-list" role="group" aria-labelledby="mode-label">
                {(
                  [
                    ["warm", "Warm Sun (Standard)"],
                    ["contrast", "High Contrast (Senior/Low Vision)"],
                    ["dark", "Midnight Dark"],
                    ["night", "Night Comfort (Amber)"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={mode === value}
                    onClick={() => update("mode", value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Sizing */}
            <div className="access-group">
              <span id="scale-label" className="access-group-title">
                <ZoomIn size={15} aria-hidden="true" /> Text Size
              </span>
              <div className="choice-list" role="group" aria-labelledby="scale-label">
                {[
                  ["100", "100% Normal"],
                  ["115", "115% Large"],
                  ["130", "130% Extra Large"],
                  ["150", "150% Maximum"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={fontScale === value}
                    onClick={() => update("fontScale", value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dyslexia / Hyperlegible Font */}
            <div className="access-group access-row">
              <div>
                <span className="access-label" id="dyslexia-label">
                  High-Legibility / Dyslexia Font
                </span>
                <span className="access-caption">
                  Uses Atkinson Hyperlegible for maximum letter distinction
                </span>
              </div>
              <button
                className="access-toggle"
                type="button"
                aria-pressed={dyslexiaFont}
                aria-labelledby="dyslexia-label"
                onClick={() => update("dyslexiaFont", !dyslexiaFont)}
              >
                {dyslexiaFont ? (
                  <>
                    <Check size={14} aria-hidden="true" /> On
                  </>
                ) : (
                  "Off"
                )}
              </button>
            </div>

            {/* Reduce Motion */}
            <div className="access-group access-row">
              <div>
                <span className="access-label" id="motion-label">
                  Smooth Low Motion
                </span>
                <span className="access-caption">
                  Stops autoplay animations and rapid transitions
                </span>
              </div>
              <button
                className="access-toggle"
                type="button"
                aria-pressed={motionOff}
                aria-labelledby="motion-label"
                onClick={() => update("motionOff", !motionOff)}
              >
                {motionOff ? (
                  <>
                    <Check size={14} aria-hidden="true" /> On
                  </>
                ) : (
                  "Off"
                )}
              </button>
            </div>

            <div className="access-footer">
              <button className="access-reset-btn" type="button" onClick={resetAll}>
                Reset to Default
              </button>
              <button
                className="button-primary access-save-btn"
                type="button"
                onClick={() => setOpen(false)}
              >
                Done
              </button>
            </div>

            {/* Live screen reader announcement */}
            <div className="sr-only" aria-live="polite">
              {announcement}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
