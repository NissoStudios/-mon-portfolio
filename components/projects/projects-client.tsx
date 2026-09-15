"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react";
import { SceneBackdrop, Reveal } from "../site/decor";
import { SiteNav } from "../site/site-nav";
import { SiteFooter, FloatingWhatsappButton } from "../site/site-footer";
import { DemoModal } from "../site/demo-registry";
import { useLanguage } from "../site/language-context";
import { projects, featuredProjects, otherProjects, type ProjectCaseStudy } from "../../lib/projects-data";

function ProjectCard({ project, onLaunch }: { project: ProjectCaseStudy; onLaunch: (id: string) => void }) {
  const { lang, t } = useLanguage();
  const Icon = project.icon;
  return (
    <article
      id={project.id}
      className="scroll-mt-24 glass rounded-3xl p-6 md:p-9 border border-[var(--border)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="mono text-[11px] text-[var(--accent)]">{project.num} · {project.tag}</span>
          {project.featured && (
            <span className="mono text-[10px] tracking-wide px-2.5 py-1 rounded-full bg-[var(--accent-soft-bg)] border border-[var(--accent-soft-border)] text-[var(--accent)]">
              {t.featured.clientBadge}
            </span>
          )}
        </div>
        <Icon aria-hidden="true" size={20} className="text-[var(--fg-subtle)]" />
      </div>

      <h3 className="text-2xl md:text-3xl font-black mt-4 text-[var(--fg)]">{project.title}</h3>
      <p className="text-[var(--fg-muted)] mt-2 leading-relaxed">{project.headline[lang]}</p>

      <div className="grid md:grid-cols-2 gap-6 mt-7">
        <div>
          <div className="mono text-[11px] text-[var(--fg-subtle)] tracking-wide">{t.projectsPage.contextLabel}</div>
          <p className="text-sm text-[var(--fg-muted)] mt-2 leading-relaxed">{project.context[lang]}</p>
        </div>
        <div>
          <div className="mono text-[11px] text-[var(--fg-subtle)] tracking-wide">{t.projectsPage.roleLabel}</div>
          <p className="text-sm text-[var(--fg-muted)] mt-2 leading-relaxed">{project.role[lang]}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mono text-[11px] text-[var(--fg-subtle)] tracking-wide">{t.projectsPage.stackLabel}</div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.tech.map((tech) => (
            <span key={tech} className="mono text-[11px] border border-[var(--border)] rounded-full px-2.5 py-1 text-[var(--fg-muted)]">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mono text-[11px] text-[var(--fg-subtle)] tracking-wide">{t.projectsPage.learnedLabel}</div>
        <ul className="mt-2 space-y-1.5">
          {project.learned[lang].map((point) => (
            <li key={point} className="text-sm text-[var(--fg-muted)] leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--accent)]">
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        <button
          onClick={() => onLaunch(project.id)}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-5 py-2.5 text-sm font-semibold glow-hover"
        >
          <PlayCircle size={16} /> {t.projectsPage.launchDemo}
        </button>
        <a
          href={project.sourcePath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] text-[var(--fg-muted)] px-5 py-2.5 text-sm font-semibold hover:text-[var(--fg)] hover:border-[var(--border-strong)] transition-colors"
        >
          {t.projectsPage.viewSource} <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

export function ProjectsClient() {
  const { t } = useLanguage();
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const closeDemo = useCallback(() => setActiveDemo(null), []);
  const activeProject = projects.find((p) => p.id === activeDemo);

  return (
    <main id="main-content">
      <a href="#page-content" className="skip-link">Skip to main content</a>
      <SceneBackdrop />
      <div id="page-content" className="relative z-10">
        <SiteNav variant="projects" />

        <section className="min-h-[60vh] grid-bg flex items-center pt-28 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_35%,rgba(34,211,238,.10),transparent_30%)]" />
          <div className="max-w-4xl mx-auto px-5 w-full">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors mb-8">
              <ArrowLeft size={15} /> {t.projectsPage.backHome}
            </Link>
            <div className="mono text-xs tracking-[.22em] text-[var(--accent)] mb-6">{t.projectsPage.eyebrow}</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-.03em] leading-[1.05] text-[var(--fg)]">
              {t.projectsPage.titleLead} <span className="text-[var(--accent)]">{t.projectsPage.titleHighlight}</span>
            </h1>
            <p className="text-base md:text-lg text-[var(--fg-muted)] max-w-2xl mt-7 leading-relaxed">{t.projectsPage.intro}</p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-5 pb-10">
          <Reveal>
            <div className="mono text-xs text-[var(--accent)] mb-6">{t.projectsPage.featuredLabel}</div>
          </Reveal>
          <div className="grid gap-6">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06}>
                <ProjectCard project={project} onLaunch={setActiveDemo} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-5 py-10">
          <Reveal>
            <div className="mono text-xs text-[var(--fg-subtle)] mb-6">{t.projectsPage.otherLabel}</div>
          </Reveal>
          <div className="grid gap-6">
            {otherProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.05}>
                <ProjectCard project={project} onLaunch={setActiveDemo} />
              </Reveal>
            ))}
          </div>
        </section>

        <SiteFooter />
        <FloatingWhatsappButton />
      </div>
      <DemoModal activeId={activeDemo} title={activeProject?.title} onClose={closeDemo} />
    </main>
  );
}
