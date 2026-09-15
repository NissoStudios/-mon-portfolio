"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionary, type Dictionary, type Lang } from "../../lib/i18n";

const STORAGE_KEY = "nisso-lang";

interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children, defaultLang = "fr" }: { children: React.ReactNode; defaultLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

  useEffect(() => {
    // Runs once after mount so the server-rendered default language matches the client's first
    // paint (no hydration mismatch), then adopts the visitor's persisted preference if any.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const next: Lang = current === "fr" ? "en" : "fr";
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: dictionary[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
