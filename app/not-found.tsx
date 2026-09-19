"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SceneBackdrop } from "../components/site/decor";
import { SiteNav } from "../components/site/site-nav";
import { SiteFooter } from "../components/site/site-footer";
import { useLanguage } from "../components/site/language-context";

const copy = {
  fr: {
    eyebrow: "404 / PAGE INTROUVABLE",
    title: "Cette page n'existe pas.",
    description: "Le lien est peut-être ancien ou incomplet. Retrouvez toutes les études de cas depuis la page Projets.",
    projects: "Voir tous les projets",
    home: "Retour à l'accueil",
  },
  en: {
    eyebrow: "404 / PAGE NOT FOUND",
    title: "This page does not exist.",
    description: "The link may be old or incomplete. Find every case study from the Projects page.",
    projects: "View all projects",
    home: "Back to home",
  },
};

export default function NotFound() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <SceneBackdrop />
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteNav variant="projects" />
        <section className="grid-bg flex flex-1 items-center pt-28 pb-16">
          <div className="site-container">
            <div className="mono text-xs tracking-[.2em] text-[var(--accent)]">{t.eyebrow}</div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-[-.04em] text-[var(--fg)] mt-5">
              {t.title}
            </h1>
            <p className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-xl mt-6">
              {t.description}
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <Link
                href="/projects"
                className="rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-6 py-3 font-semibold"
              >
                {t.projects}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] text-[var(--fg)] px-6 py-3 font-semibold"
              >
                <ArrowLeft size={16} /> {t.home}
              </Link>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}
