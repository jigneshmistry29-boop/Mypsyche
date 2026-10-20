export interface LanguageMeta {
  code: string;
  nativeName: string;
  englishName: string;
  script: string;
  isRtl?: boolean;
  isScheduled: boolean;
  regionHint: string;
}

/**
 * All 22 Languages of the Eighth Schedule to the Constitution of India + English
 */
export const scheduledLanguagesOfIndia: LanguageMeta[] = [
  { code: "en", nativeName: "English", englishName: "English", script: "Latin", isScheduled: false, regionHint: "Pan-India & Global" },
  { code: "hi", nativeName: "हिन्दी", englishName: "Hindi", script: "Devanagari", isScheduled: true, regionHint: "Northern & Central India" },
  { code: "gu", nativeName: "ગુજરાતી", englishName: "Gujarati", script: "Gujarati", isScheduled: true, regionHint: "Gujarat & Vadodara HQ" },
  { code: "as", nativeName: "অসমীয়া", englishName: "Assamese", script: "Bengali-Assamese", isScheduled: true, regionHint: "Assam & Northeast" },
  { code: "bn", nativeName: "বাংলা", englishName: "Bengali", script: "Bengali", isScheduled: true, regionHint: "West Bengal & Tripura" },
  { code: "brx", nativeName: "बड़ो", englishName: "Bodo", script: "Devanagari", isScheduled: true, regionHint: "Bodoland, Assam" },
  { code: "doi", nativeName: "डोगरी", englishName: "Dogri", script: "Devanagari", isScheduled: true, regionHint: "Jammu & Kashmir" },
  { code: "kn", nativeName: "ಕನ್ನಡ", englishName: "Kannada", script: "Kannada", isScheduled: true, regionHint: "Karnataka" },
  { code: "ks", nativeName: "كٲشُر", englishName: "Kashmiri", script: "Perso-Arabic", isRtl: true, isScheduled: true, regionHint: "Kashmir Valley" },
  { code: "kok", nativeName: "कोंकणी", englishName: "Konkani", script: "Devanagari", isScheduled: true, regionHint: "Goa & Konkan Coast" },
  { code: "mai", nativeName: "मैथिली", englishName: "Maithili", script: "Devanagari", isScheduled: true, regionHint: "Bihar & Mithila" },
  { code: "ml", nativeName: "മലയാളം", englishName: "Malayalam", script: "Malayalam", isScheduled: true, regionHint: "Kerala" },
  { code: "mni", nativeName: "মৈতৈলোন্", englishName: "Manipuri (Meitei)", script: "Meitei Mayek / Bengali", isScheduled: true, regionHint: "Manipur" },
  { code: "mr", nativeName: "मराठी", englishName: "Marathi", script: "Devanagari", isScheduled: true, regionHint: "Maharashtra" },
  { code: "ne", nativeName: "नेपाली", englishName: "Nepali", script: "Devanagari", isScheduled: true, regionHint: "Sikkim & West Bengal" },
  { code: "or", nativeName: "ଓଡ଼ିଆ", englishName: "Odia", script: "Odia", isScheduled: true, regionHint: "Odisha" },
  { code: "pa", nativeName: "ਪੰਜਾਬੀ", englishName: "Punjabi", script: "Gurmukhi", isScheduled: true, regionHint: "Punjab" },
  { code: "sa", nativeName: "संस्कृतम्", englishName: "Sanskrit", script: "Devanagari", isScheduled: true, regionHint: "Classical National" },
  { code: "sat", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ", englishName: "Santali", script: "Ol Chiki / Devanagari", isScheduled: true, regionHint: "Jharkhand, Odisha, Bengal" },
  { code: "sd", nativeName: "سنڌي", englishName: "Sindhi", script: "Perso-Arabic", isRtl: true, isScheduled: true, regionHint: "Sindhi Community" },
  { code: "ta", nativeName: "தமிழ்", englishName: "Tamil", script: "Tamil", isScheduled: true, regionHint: "Tamil Nadu & Puducherry" },
  { code: "te", nativeName: "తెలుగు", englishName: "Telugu", script: "Telugu", isScheduled: true, regionHint: "Andhra Pradesh & Telangana" },
  { code: "ur", nativeName: "اردو", englishName: "Urdu", script: "Nastaliq / Perso-Arabic", isRtl: true, isScheduled: true, regionHint: "Pan-India & Telangana" },
];
