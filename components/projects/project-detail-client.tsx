"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  GitBranch,
  Layers3,
  PlayCircle,
  Route,
  Target,
} from "lucide-react";
import { projects } from "../../lib/projects-data";
import { projectDetails } from "../../lib/project-details";
import { useLanguage } from "../site/language-context";
import { Reveal, SceneBackdrop } from "../site/decor";
import { SiteNav } from "../site/site-nav";
import { SiteFooter, FloatingWhatsappButton } from "../site/site-footer";
import { DemoModal } from "../site/demo-registry";

const labels = {
  fr: {
    back: "Tous les projets",
    builtFor: "CRÉÉ POUR",
    overview: "VUE D'ENSEMBLE",
    challenge: "LE PROBLÈME",
    role: "MON RÔLE",
    workflow: "COMMENT ÇA FONCTIONNE",
    features: "FONCTIONNALITÉS CLÉS",
    decisions: "DÉCISIONS D'INGÉNIERIE",
    learned: "CE QUE J'AI RÉELLEMENT APPRIS",
    outcome: "RÉSULTAT",
    stack: "STACK TECHNIQUE",
    demo: "Lancer le prototype",
    source: "Voir le code source",
    next: "Projet suivant",
    previous: "Projet précédent",
  },
  en: {
    back: "All projects",
    builtFor: "BUILT FOR",
    overview: "OVERVIEW",
    challenge: "THE PROBLEM",
    role: "MY ROLE",
    workflow: "HOW IT WORKS",
    features: "KEY FEATURES",
    decisions: "ENGINEERING DECISIONS",
    learned: "WHAT I ACTUALLY LEARNED",
    outcome: "OUTCOME",
    stack: "TECH STACK",
    demo: "Launch prototype",
    source: "View source code",
    next: "Next project",
    previous: "Previous project",
  },
} as const;

export function ProjectDetailClient({ projectId }: { projectId: string }) {
  const { lang } = useLanguage();
  const copy = labels[lang];
  const project = projects.find((item) => item.id === projectId);
  const detail = projectDetails[projectId];
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const closeDemo = useCallback(() => setActiveDemo(null), []);

  if (!project || !detail) return null;

  const Icon = project.icon;
  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main-content">
      <a href="#page-content" className="skip-link">Skip to main content</a>
      <SceneBackdrop />
      <div id="page-content" className="relative z-10">
        <SiteNav variant="projects" />

        <section className="grid-bg min-h-[72vh] flex items-center pt-28 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_72%_30%,rgba(34,211,238,.12),transparent_30%)]" />
          <div className="site-container">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors mb-10"
            >
              <ArrowLeft size={15} /> {copy.back}
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="mono text-xs tracking-[.2em] text-[var(--accent)]">
                {project.num} · {project.tag}
              </span>
              {project.client && (
                <span className="mono text-[10px] tracking-wide px-2.5 py-1 rounded-full bg-[var(--accent-soft-bg)] border border-[var(--accent-soft-border)] text-[var(--accent)]">
                  {copy.builtFor} {project.client.toUpperCase()}
                </span>
              )}
            </div>

            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end mt-6">
              <div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-.04em] leading-none text-[var(--fg)]">
                  {project.title}
                </h1>
                <p className="text-lg md:text-2xl text-[var(--fg-muted)] mt-6 max-w-3xl leading-relaxed">
                  {project.headline[lang]}
                </p>
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-[var(--accent-soft-border)] bg-[var(--accent-soft-bg)] flex items-center justify-center">
                <Icon aria-hidden="true" size={48} className="text-[var(--accent)]" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              <button
                onClick={() => setActiveDemo(project.demoId)}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-6 py-3 font-semibold"
              >
                <PlayCircle size={17} /> {copy.demo}
              </button>
              <a
                href={project.sourcePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] text-[var(--fg)] px-6 py-3 font-semibold hover:border-[var(--border-strong)] transition-colors"
              >
                {copy.source} <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className="site-container py-20 md:py-28">
          <Reveal>
            <div className="grid md:grid-cols-[.7fr_1.3fr] gap-8 md:gap-16">
              <div>
                <div className="mono text-xs text-[var(--accent)]">{copy.overview}</div>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--fg)]">{detail.summary[lang]}</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 mt-16">
            <Reveal>
              <article className="glass rounded-3xl p-7 md:p-9 h-full">
                <Target aria-hidden="true" className="text-[var(--accent)]" />
                <h2 className="mono text-xs text-[var(--fg-subtle)] mt-6">{copy.challenge}</h2>
                <p className="text-[var(--fg-muted)] mt-4 leading-relaxed">{project.context[lang]}</p>
              </article>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="glass rounded-3xl p-7 md:p-9 h-full">
                <GitBranch aria-hidden="true" className="text-[var(--accent)]" />
                <h2 className="mono text-xs text-[var(--fg-subtle)] mt-6">{copy.role}</h2>
                <p className="text-[var(--fg-muted)] mt-4 leading-relaxed">{project.role[lang]}</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-[var(--surface-subtle)] py-20 md:py-28">
          <div className="site-container">
            <Reveal>
              <div className="flex items-center gap-3">
                <Route aria-hidden="true" size={20} className="text-[var(--accent)]" />
                <h2 className="mono text-xs text-[var(--accent)]">{copy.workflow}</h2>
              </div>
            </Reveal>
            <ol className="grid md:grid-cols-2 gap-4 mt-10">
              {detail.workflow[lang].map((step, stepIndex) => (
                <li key={step} className="h-full">
                  <Reveal delay={stepIndex * 0.04}>
                   <div className="glass rounded-2xl p-6 h-full flex gap-4">
                    <span className="mono text-xs text-[var(--accent)] shrink-0">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--fg-muted)]">{step}</span>
                   </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="site-container py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <Layers3 aria-hidden="true" size={20} className="text-[var(--accent)]" />
                  <h2 className="mono text-xs text-[var(--accent)]">{copy.features}</h2>
                </div>
                <ul className="mt-7 space-y-3">
                  {detail.features[lang].map((feature) => (
                    <li key={feature} className="flex gap-3 text-[var(--fg-muted)]">
                      <Check size={17} className="text-[var(--accent)] mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div>
                <div className="flex items-center gap-3">
                  <GitBranch aria-hidden="true" size={20} className="text-[var(--accent)]" />
                  <h2 className="mono text-xs text-[var(--accent)]">{copy.decisions}</h2>
                </div>
                <ul className="mt-7 space-y-4">
                  {detail.decisions[lang].map((decision) => (
                    <li
                      key={decision}
                      className="text-[var(--fg-muted)] leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--accent)]"
                    >
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-[var(--surface-subtle)] py-20 md:py-28">
          <div className="site-container grid lg:grid-cols-[1.15fr_.85fr] gap-12">
            <Reveal>
              <div>
                <h2 className="mono text-xs text-[var(--accent)]">{copy.learned}</h2>
                <ul className="mt-7 space-y-4">
                  {project.learned[lang].map((point) => (
                    <li key={point} className="glass rounded-2xl p-5 flex gap-4">
                      <Check size={17} className="text-[var(--accent)] mt-0.5 shrink-0" />
                      <span className="text-sm leading-relaxed text-[var(--fg-muted)]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <aside className="glass rounded-3xl p-7 md:p-9 h-fit">
                <h2 className="mono text-xs text-[var(--fg-subtle)]">{copy.stack}</h2>
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="mono text-xs border border-[var(--border)] rounded-full px-3 py-1.5 text-[var(--fg-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h2 className="mono text-xs text-[var(--fg-subtle)] mt-10">{copy.outcome}</h2>
                <p className="text-[var(--fg-muted)] mt-4 leading-relaxed">{detail.outcome[lang]}</p>
              </aside>
            </Reveal>
          </div>
        </section>

        <nav aria-label="Project navigation" className="site-container py-16 grid sm:grid-cols-2 gap-4">
          <Link
            href={`/projects/${previous.id}`}
            className="glass rounded-2xl p-6 group hover:border-[var(--border-strong)] transition-colors"
          >
            <span className="mono text-[10px] text-[var(--fg-subtle)]">{copy.previous}</span>
            <div className="flex items-center gap-2 mt-2 font-bold text-[var(--fg)]">
              <ArrowLeft size={16} />
              {previous.title}
            </div>
          </Link>
          <Link
            href={`/projects/${next.id}`}
            className="glass rounded-2xl p-6 text-right group hover:border-[var(--border-strong)] transition-colors"
          >
            <span className="mono text-[10px] text-[var(--fg-subtle)]">{copy.next}</span>
            <div className="flex items-center justify-end gap-2 mt-2 font-bold text-[var(--fg)]">
              {next.title}
              <ArrowRight size={16} />
            </div>
          </Link>
        </nav>

        <SiteFooter />
        <FloatingWhatsappButton />
      </div>

      <DemoModal activeId={activeDemo} title={project.title} onClose={closeDemo} />
    </main>
  );
}
