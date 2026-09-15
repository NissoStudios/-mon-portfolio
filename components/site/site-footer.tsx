"use client";
import { useLanguage } from "./language-context";
import { WhatsappIcon } from "./icons";

const WHATSAPP_LINK = "https://wa.me/237680363055";

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row gap-3 justify-between text-sm text-[var(--fg-subtle)]">
        <div className="font-black text-[var(--fg-muted)]">
          NISSO STUDIOS<span className="text-[var(--accent)]">.</span>
        </div>
        <div>{t.footer.tagline}</div>
        <div>{t.footer.rights}</div>
      </div>
    </footer>
  );
}

export function FloatingWhatsappButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="md:hidden fixed bottom-5 right-5 z-[60] w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,.5)]"
    >
      <WhatsappIcon size={26} className="text-white" />
    </a>
  );
}

export { WHATSAPP_LINK };
