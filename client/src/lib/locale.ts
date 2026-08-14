import { useEffect, useState } from "react";

export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

const storageKey = "rasyne-deco-locale";

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (locales.includes(requested as Locale)) return requested as Locale;
    const saved = window.localStorage.getItem(storageKey);
    return locales.includes(saved as Locale) ? (saved as Locale) : "en";
  });

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.body.dataset.locale = locale;
    window.localStorage.setItem(storageKey, locale);
  }, [locale]);

  return { locale, setLocale: setLocaleState };
}

export const localeNames: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "ع",
};
