"use client";
import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, PlayCircle } from "lucide-react";
import { SceneBackdrop, Reveal, Cube3D } from "../components/site/decor";
import { SiteNav } from "../components/site/site-nav";
import { SiteFooter, FloatingWhatsappButton, WHATSAPP_LINK } from "../components/site/site-footer";
import { DemoModal } from "../components/site/demo-registry";
import { GithubIcon, FacebookIcon, WhatsappIcon } from "../components/site/icons";
import { useLanguage } from "../components/site/language-context";
import { projects, featuredProjects } from "../lib/projects-data";

const logos = [
  { src: "/logo-sosucam.png", alt: "SOSUCAM", width: 146, height: 30 },
  { src: "/logo-mobile-six.png", alt: "Mobile Six", width: 40, height: 40 },
  { src: "/logo-ousy.png", alt: "Secrétariat Ousy", width: 40, height: 40 },
];

function LogoMarquee() {
  const { t } = useLanguage();
  const loop = [...logos, ...logos];
  return (
    <div className="border-y border-[var(--border)] bg-[var(--surface-subtle)] py-7 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 mb-4">
        <span className="mono text-[11px] text-[var(--fg-subtle)] tracking-[.2em]">{t.builtForStrip.label}</span>
      </div>
      <div className="flex overflow-hidden">
        <div className="flex items-center gap-14 marquee-track shrink-0 pr-14">
          {loop.map((l, i) => (
            <div key={`${l.src}-${i}`} aria-hidden={i >= logos.length} className="shrink-0 bg-white/95 rounded-xl px-5 py-3 flex items-center justify-center h-16 w-40">
              <Image src={l.src} alt={i < logos.length ? l.alt : ""} width={l.width} height={l.height} className="max-h-10 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const { lang, t } = useLanguage();
  const closeDemo = useCallback(() => setActiveDemo(null), []);
  const activeProject = projects.find((p) => p.id === activeDemo);

  return (
    <main id="main-content">
      <a href="#page-content" className="skip-link">Skip to main content</a>
      <SceneBackdrop />
      <div id="page-content" className="relative z-10">
        <SiteNav variant="home" />

        <section className="min-h-screen grid-bg flex items-center pt-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_35%,rgba(34,211,238,.10),transparent_30%)]" />
          <div className="max-w-6xl mx-auto px-5 py-16 md:py-24 w-full grid lg:grid-cols-[1.15fr_.85fr] gap-14 items-center">
            <div>
              <div className="mono text-xs tracking-[.22em] text-[var(--accent)] mb-7">{t.hero.eyebrow}</div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-[-.05em] leading-[.95] text-[var(--fg)]">
                {t.hero.titleLead} <span className="text-[var(--accent)]">{t.hero.titleHighlight}</span>
              </h1>
              <p className="text-base md:text-xl text-[var(--fg-muted)] max-w-2xl mt-7 leading-relaxed">{t.hero.description}</p>
              <div className="flex flex-wrap gap-3 mt-9">
                <a href="#work" className="rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-6 py-3 font-semibold glow-hover">
                  {t.hero.exploreWork} <ArrowDown className="inline ml-1" size={17} />
                </a>
                <a href="#contact" className="rounded-full border border-[var(--border)] text-[var(--fg)] px-6 py-3 font-semibold glow-hover">
                  {t.hero.connect}
                </a>
              </div>
              <div className="mono text-xs text-[var(--fg-subtle)] mt-10 space-y-1.5">
                <div>{t.hero.basedIn}</div>
                <div>{t.hero.builtFor}</div>
              </div>
            </div>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="hero-portrait relative mx-auto max-w-[320px] lg:max-w-none w-full"
            >
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-cyan-300/25 via-cyan-500/10 to-transparent blur-2xl pointer-events-none" />
              <div className="glass relative rounded-[2rem] p-3">
                <div className="relative rounded-[1.6rem] overflow-hidden aspect-[4/5]">
                  <Image
                    src="/nisso-photo.png"
                    alt={lang === "fr" ? "Nisso Emmanuel Franky, ingénieur logiciel et fondateur de Nisso Studios" : "Nisso Emmanuel Franky, software engineer and founder of Nisso Studios"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 320px, 430px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
                  <div className="absolute inset-0 opacity-[.05] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 3px)" }} />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="mono text-[10px] text-cyan-300 bg-black/50 backdrop-blur px-2.5 py-1.5 rounded-full border border-cyan-300/20">OPERATOR</span>
                    <span className="mono text-[10px] text-slate-300 bg-black/50 backdrop-blur px-2.5 py-1.5 rounded-full border border-white/10">NISSO STUDIOS</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <LogoMarquee />

        <section className="max-w-6xl mx-auto px-5 py-20 md:py-28">
          <Reveal>
            <div className="mono text-xs text-[var(--accent)]">{t.featured.eyebrow}</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-[var(--fg)]">
              {t.featured.titleLead}<span className="text-[var(--fg-subtle)]">{t.featured.titleHighlight}</span>
            </h2>
            <p className="text-[var(--fg-muted)] mt-5 max-w-2xl leading-relaxed">{t.featured.description}</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {featuredProjects.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.id} delay={i * 0.08}>
                  <div className="glass rounded-3xl p-7 h-full flex flex-col border border-[var(--accent-soft-border)]">
                    <div className="flex items-center justify-between">
                      <span className="mono text-[10px] tracking-wide px-2.5 py-1 rounded-full bg-[var(--accent-soft-bg)] text-[var(--accent)]">{t.featured.clientBadge}</span>
                      <Icon aria-hidden="true" size={20} className="text-[var(--accent)]" />
                    </div>
                    <h3 className="text-2xl font-black mt-5 text-[var(--fg)]">{p.title}</h3>
                    <p className="text-sm text-[var(--fg-muted)] mt-2 leading-relaxed flex-1">{p.headline[lang]}</p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <button
                        onClick={() => setActiveDemo(p.id)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-4 py-2 text-xs font-semibold glow-hover"
                      >
                        <PlayCircle size={14} /> {t.featured.launchDemo}
                      </button>
                      <Link
                        href={`/projects/${p.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] text-[var(--fg-muted)] px-4 py-2 text-xs font-semibold hover:text-[var(--fg)] transition-colors"
                      >
                        {t.featured.viewCaseStudy} <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="about" className="max-w-6xl mx-auto px-5 py-20 md:py-28 scroll-mt-20">
          <Reveal>
            <div className="max-w-3xl">
              <div className="mono text-xs text-[var(--accent)]">{t.about.eyebrow}</div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4 text-[var(--fg)]">
                {t.about.titleLead} <span className="text-[var(--fg-subtle)]">{t.about.titleHighlight}</span>
              </h2>
              <p className="text-base md:text-lg text-[var(--fg-muted)] mt-7 leading-relaxed">{t.about.description}</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-14">
            {t.about.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="border-t border-[var(--border)] pt-5">
                  <div className="mono text-xs text-[var(--accent)]">0{i + 1}</div>
                  <h3 className="font-bold mt-4 text-[var(--fg)]">{step.title}</h3>
                  <p className="text-sm text-[var(--fg-subtle)] mt-2">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y border-[var(--border)] bg-[var(--surface-subtle)] py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5">
            <Reveal>
              <div className="mono text-xs text-[var(--accent)]">{t.experience.eyebrow}</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 text-[var(--fg)]">
                {t.experience.titleLead}<span className="text-[var(--fg-subtle)]">{t.experience.titleHighlight}</span>
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              {t.experience.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="glass rounded-2xl p-6 h-full">
                    <div className="mono text-[11px] text-[var(--accent)]">{item.period}</div>
                    <h3 className="font-bold mt-3 text-[var(--fg)]">{item.title}</h3>
                    <div className="text-sm text-[var(--fg-muted)] mt-0.5">{item.org}</div>
                    <p className="text-sm text-[var(--fg-subtle)] mt-3 leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="py-20 md:py-28 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-5">
            <Reveal>
              <div className="mono text-xs text-[var(--accent)]">{t.work.eyebrow}</div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4 text-[var(--fg)]">
                {t.work.titleLead}<span className="text-[var(--fg-subtle)]">{t.work.titleHighlight}</span>
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
                <p className="text-[var(--fg-subtle)] text-sm">{t.work.description}</p>
                <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline">
                  {t.work.viewAll} <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
            <div className="mt-14 grid sm:grid-cols-2 gap-4">
              {projects.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.id} delay={i * 0.05}>
                    <article className="glass rounded-2xl p-5 h-full flex flex-col group hover:border-cyan-300/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="mono text-[10px] text-[var(--accent)]">{p.num} · {p.tag}</span>
                        <Icon aria-hidden="true" size={18} className="text-[var(--fg-subtle)] group-hover:text-[var(--accent)] transition-colors" />
                      </div>
                      <h3 className="text-xl font-black mt-4 text-[var(--fg)]">{p.title}</h3>
                      <p className="text-sm text-[var(--fg-muted)] mt-2 leading-relaxed flex-1">{p.headline[lang]}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {p.tech.map((tech) => (
                          <span key={tech} className="mono text-[10px] border border-[var(--border)] rounded-full px-2 py-0.5 text-[var(--fg-subtle)]">{tech}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => setActiveDemo(p.id)}
                        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-cyan-300/30 text-[var(--accent)] px-3 py-2 text-xs font-semibold hover:bg-cyan-300/10 glow-hover w-fit"
                      >
                        <PlayCircle size={14} /> {t.work.launchDemo}
                      </button>
                      <Link
                        href={`/projects/${p.id}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors w-fit"
                      >
                        {t.featured.viewCaseStudy} <ArrowUpRight size={13} />
                      </Link>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="approach" className="max-w-6xl mx-auto px-5 py-20 md:py-28 scroll-mt-20">
          <Reveal>
            <div className="mono text-xs text-[var(--accent)]">{t.approach.eyebrow}</div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4 text-[var(--fg)]">
              {t.approach.titleLead}<span className="text-[var(--fg-subtle)]">{t.approach.titleHighlight}</span>
            </h2>
          </Reveal>
          <Cube3D />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {t.approach.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.03}>
                <div className="rounded-2xl border border-[var(--border)] p-5 min-h-[150px] glow-hover">
                  <div className="mono text-xs text-[var(--fg-subtle)]">{step.n}</div>
                  <div className="font-bold mt-5 text-[var(--fg)]">{step.title}</div>
                  <p className="text-xs text-[var(--fg-subtle)] mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills" className="border-y border-[var(--border)] bg-[var(--surface-subtle)] py-20 md:py-28 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-5">
            <Reveal>
              <div className="mono text-xs text-[var(--accent)]">{t.skills.eyebrow}</div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mt-4 text-[var(--fg)]">
                {t.skills.titleLead}<span className="text-[var(--fg-subtle)]">{t.skills.titleHighlight}</span>
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
              {t.skills.groups.map((group) => (
                <div key={group.title} className="rounded-3xl border border-[var(--border)] p-6 glow-hover">
                  <h3 className="mono text-xs mt-1 text-[var(--fg-subtle)]">{group.title}</h3>
                  <div className="mt-5 space-y-2">
                    {group.items.map((item) => (
                      <div className="text-[var(--fg-muted)]" key={item}>{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-5 py-20 md:py-28">
          <div className="rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[.035] p-6 md:p-14">
            <div className="mono text-xs text-[var(--accent)]">{t.philosophy.eyebrow}</div>
            <blockquote className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight max-w-4xl mt-5 text-[var(--fg)]">{t.philosophy.quote}</blockquote>
            <p className="text-[var(--fg-muted)] mt-6 max-w-2xl">{t.philosophy.description}</p>
          </div>
        </section>

        <section id="contact" className="border-t border-[var(--border)] py-20 md:py-28 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-5">
            <div className="max-w-4xl">
              <div className="mono text-xs text-[var(--accent)]">{t.contact.eyebrow}</div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mt-4 text-[var(--fg)]">{t.contact.title}</h2>
              <p className="text-lg md:text-xl text-[var(--fg-muted)] mt-6">{t.contact.description}</p>
              <div className="flex flex-wrap gap-3 mt-9">
                <a href="mailto:frankynisso16@gmail.com" className="rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] px-6 py-3 font-semibold glow-hover">{t.contact.talk}</a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full border px-5 py-3 glow-hover" style={{borderColor:"var(--whatsapp-border)",color:"var(--whatsapp-fg)"}}>
                  <WhatsappIcon className="inline mr-2" size={17} />{t.contact.whatsapp}
                </a>
                <a href="https://github.com/NissoStudios" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--border)] text-[var(--fg)] px-5 py-3 glow-hover">
                  <GithubIcon className="inline mr-2" size={17} />{t.contact.github}
                </a>
                <a href="https://www.facebook.com/nisso.emmanuel.franky" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--border)] text-[var(--fg)] px-5 py-3 glow-hover">
                  <FacebookIcon className="inline mr-2" size={17} />{t.contact.facebook}
                </a>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
        <FloatingWhatsappButton />
      </div>

      <DemoModal activeId={activeDemo} title={activeProject?.title} onClose={closeDemo} />
    </main>
  );
}
