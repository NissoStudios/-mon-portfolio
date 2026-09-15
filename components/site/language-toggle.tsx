"use client";
import { useLanguage } from "./language-context";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
      className={
        "mono inline-flex items-center justify-center gap-1 h-9 px-3 rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-strong)] transition-colors " +
        className
      }
    >
      <span className={lang === "fr" ? "text-[var(--accent)]" : ""}>FR</span>
      <span aria-hidden="true">/</span>
      <span className={lang === "en" ? "text-[var(--accent)]" : ""}>EN</span>
    </button>
  );
}
