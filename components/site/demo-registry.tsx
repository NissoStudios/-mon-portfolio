"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { useLanguage } from "./language-context";

function DemoLoadingInner() {
  const { t } = useLanguage();
  return <div className="min-h-[320px] flex items-center justify-center text-slate-500 mono text-sm">{t.demoLoading}</div>;
}

const ECommercialDemo = dynamic(() => import("../demos/ECommercialDemo"), { ssr: false, loading: DemoLoadingInner });
const GestMedicertDemo = dynamic(() => import("../demos/GestMedicertDemo"), { ssr: false, loading: DemoLoadingInner });
const TripBookDemo = dynamic(() => import("../demos/TripBookDemo"), { ssr: false, loading: DemoLoadingInner });
const TransMapDemo = dynamic(() => import("../demos/TransMapDemo"), { ssr: false, loading: DemoLoadingInner });
const JavaRestaurantDemo = dynamic(() => import("../demos/JavaRestaurantDemo"), { ssr: false, loading: DemoLoadingInner });
const MobileSixDemo = dynamic(() => import("../demos/MobileSixDemo"), { ssr: false, loading: DemoLoadingInner });
const BlogOPlatformDemo = dynamic(() => import("../demos/BlogOPlatformDemo"), { ssr: false, loading: DemoLoadingInner });

export const demoMap: Record<string, React.ComponentType> = {
  ecommercial: ECommercialDemo,
  gestmedicert: GestMedicertDemo,
  tripbook: TripBookDemo,
  transmap: TransMapDemo,
  "java-restaurant": JavaRestaurantDemo,
  "mobile-six": MobileSixDemo,
  "blog-o-platform": BlogOPlatformDemo,
};

export function DemoModal({
  activeId,
  title,
  onClose,
}: {
  activeId: string | null;
  title?: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeId) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const pageContent = document.getElementById("page-content");
    document.body.style.overflow = "hidden";
    pageContent?.setAttribute("inert", "");
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      pageContent?.removeAttribute("inert");
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [activeId, onClose]);

  if (!activeId) return null;
  const ActiveComponent = demoMap[activeId];
  if (!ActiveComponent) return null;

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="demo-dialog-title" className="fixed inset-0 z-[80] bg-[#05070b] overflow-y-auto">
      <div id="demo-dialog-title" className="fixed top-4 left-4 z-[95] mono text-[10px] text-cyan-300 bg-black/70 border border-cyan-300/20 rounded-full px-3 py-2 backdrop-blur">
        LIVE PROTOTYPE · {title}
      </div>
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label={`Close ${title ?? "demo"} prototype`}
        className="fixed top-4 right-4 z-[95] w-11 h-11 rounded-full bg-black/70 border border-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-black/90 shadow-lg"
      >
        <X size={18} />
      </button>
      <ActiveComponent />
    </div>
  );
}
