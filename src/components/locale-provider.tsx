"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import as from "../../messages/as.json";
import bn from "../../messages/bn.json";
import brx from "../../messages/brx.json";
import doi from "../../messages/doi.json";
import en from "../../messages/en.json";
import gu from "../../messages/gu.json";
import hi from "../../messages/hi.json";
import kn from "../../messages/kn.json";
import ks from "../../messages/ks.json";
import kok from "../../messages/kok.json";
import mai from "../../messages/mai.json";
import ml from "../../messages/ml.json";
import mni from "../../messages/mni.json";
import mr from "../../messages/mr.json";
import ne from "../../messages/ne.json";
import or from "../../messages/or.json";
import pa from "../../messages/pa.json";
import sa from "../../messages/sa.json";
import sat from "../../messages/sat.json";
import sd from "../../messages/sd.json";
import ta from "../../messages/ta.json";
import te from "../../messages/te.json";
import ur from "../../messages/ur.json";
import { scheduledLanguagesOfIndia, type LanguageMeta } from "../../config/languages";

export const allDictionaries = {
  en,
  hi,
  gu,
  as,
  bn,
  brx,
  doi,
  kn,
  ks,
  kok,
  mai,
  ml,
  mni,
  mr,
  ne,
  or,
  pa,
  sa,
  sat,
  sd,
  ta,
  te,
  ur,
};

export type Locale = keyof typeof allDictionaries;
export const validLocales = Object.keys(allDictionaries) as Locale[];

const localeCookie = "yelotrip_locale";
const localeEvent = "yelotrip-locale-change";

function readLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`(?:^|; )${localeCookie}=(${validLocales.join("|")})(?:;|$)`));
  return (match?.[1] as Locale | undefined) ?? "en";
}

function subscribe(callback: () => void) {
  window.addEventListener(localeEvent, callback);
  return () => window.removeEventListener(localeEvent, callback);
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: (typeof allDictionaries)[Locale];
  isRtl: boolean;
  languages: LanguageMeta[];
  currentLanguage: LanguageMeta;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, (): Locale => "en");
  const messages = allDictionaries[locale] ?? en;
  const isRtl = ["ks", "sd", "ur"].includes(locale);
  const currentLanguage =
    scheduledLanguagesOfIndia.find((l) => l.code === locale) ?? scheduledLanguagesOfIndia[0];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [locale, isRtl]);

  function setLocale(nextLocale: Locale) {
    document.cookie = `${localeCookie}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = ["ks", "sd", "ur"].includes(nextLocale) ? "rtl" : "ltr";
    window.dispatchEvent(new Event(localeEvent));
  }

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        messages,
        isRtl,
        languages: scheduledLanguagesOfIndia,
        currentLanguage,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
