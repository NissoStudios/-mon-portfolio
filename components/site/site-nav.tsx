"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./language-context";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

export function SiteNav({ variant = "home" }: { variant?: "home" | "projects" }) {
  const [menu, setMenu] = useState(false);
  const { t } = useLanguage();
  const prefix = variant === "projects" ? "/#" : "#";

  const sectionLinks = [
    { href: `${prefix}about`, label: t.nav.about },
    { href: `${prefix}work`, label: t.nav.work },
    { href: `${prefix}approach`, label: t.nav.approach },
    { href: `${prefix}skills`, label: t.nav.skills },
    { href: `${prefix}contact`, label: t.nav.contact },
  ];
  // The contact anchor is already the nav CTA button below, so the inline desktop
  // cluster skips it to keep the bar from crowding on common laptop widths.
  const desktopLinks = sectionLinks.filter((l) => l.label !== t.nav.contact);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl" aria-label="Primary navigation">
      <div className="max-w-6xl mx-auto px-5 min-h-[64px] md:min-h-[72px] flex items-center justify-between gap-3">
        <Link href="/" className="font-black text-lg md:text-xl shrink-0 whitespace-nowrap text-[var(--fg)]">
          NISSO STUDIOS<span className="text-[var(--accent)]">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-4 text-sm text-[var(--fg-muted)]">
          {desktopLinks.map((l) => (
            <a key={l.href} href={l.href} className="whitespace-nowrap hover:text-[var(--fg)] transition-colors">{l.label}</a>
          ))}
          <Link href="/projects" className="whitespace-nowrap hover:text-[var(--fg)] transition-colors">{t.nav.projects}</Link>
          <a href={`${prefix}contact`} className="whitespace-nowrap rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-4 py-2 font-semibold glow-hover">
            {t.nav.cta}
          </a>
          <div className="flex items-center gap-1.5 pl-2 border-l border-[var(--border)]">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="p-2 text-[var(--fg)]"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menu}
            aria-controls="mobile-navigation"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {menu && (
        <div id="mobile-navigation" className="md:hidden px-5 pb-5 grid gap-4 text-[var(--fg-muted)]">
          {sectionLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenu(false)}>{l.label}</a>
          ))}
          <Link href="/projects" onClick={() => setMenu(false)}>{t.nav.projects}</Link>
        </div>
      )}
    </nav>
  );
}
