"use client";

import { useActionState, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Blocks,
  CalendarDays,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Gauge,
  Globe2,
  HeartHandshake,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  MoveRight,
  Palette,
  PenTool,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Store,
  Terminal,
  Timer,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const initialContactState = {
  status: "idle" as const,
  message: "",
  fieldErrors: {},
};

const services = [
  {
    icon: Blocks,
    title: "Custom Plugin Development",
    description:
      "Purpose-built plugins that extend WordPress without slowing your site down.",
  },
  {
    icon: Palette,
    title: "Theme Development & Customization",
    description:
      "Clean, conversion-ready themes that make your brand feel unmistakably yours.",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & Security",
    description:
      "Proactive updates, backups, monitoring, and hardening that keep sites healthy.",
  },
  {
    icon: Gauge,
    title: "Performance & SEO",
    description:
      "Technical improvements that make your site faster, findable, and easier to use.",
  },
  {
    icon: Wrench,
    title: "Migrations & Emergency Fixes",
    description:
      "Calm, careful help when a launch breaks or a critical site needs moving.",
  },
  {
    icon: Store,
    title: "WooCommerce Solutions",
    description:
      "Reliable storefronts, custom checkout flows, and integrations that sell more.",
  },
];

const differentiators = [
  {
    icon: Terminal,
    title: "Specialized experience",
    text: "10+ years working inside WordPress, from the database up.",
  },
  {
    icon: Code2,
    title: "Code that lasts",
    text: "Documented, maintainable solutions without bloated page builders.",
  },
  {
    icon: MessageCircle,
    title: "Direct communication",
    text: "You work with the developer doing the work—no middlemen.",
  },
  {
    icon: HeartHandshake,
    title: "Support when you need it",
    text: "A reliable technical partner for the next fix, launch, or idea.",
  },
];

const steps = [
  [
    "01",
    "Discovery & audit",
    "We map the problem, inspect the site, and define what success looks like.",
  ],
  [
    "02",
    "Proposal & quote",
    "You get a clear plan, fixed scope, and transparent quote before work begins.",
  ],
  [
    "03",
    "Development",
    "I build carefully in a focused staging environment with regular updates.",
  ],
  [
    "04",
    "Launch & support",
    "We ship confidently, measure the result, and keep things running smoothly.",
  ],
];

const testimonials = [
  [
    "“Our checkout issue was diagnosed and fixed in one afternoon. Clear, capable, and refreshingly direct.”",
    "Sarah M.",
    "Agency owner",
  ],
  [
    "“The custom plugin replaced three subscriptions and made our editorial workflow dramatically simpler.”",
    "James R.",
    "Publisher",
  ],
  [
    "“Finally, a developer who explains the why—not just the what. Our site is faster and much easier to manage.”",
    "Nina K.",
    "Founder",
  ],
];

const faqs = [
  [
    "How fast can you fix my site?",
    "Many urgent issues can be assessed within 24 hours. I will confirm the scope and next available slot after a quick initial review.",
  ],
  [
    "Do you work with existing themes and plugins?",
    "Yes. I regularly work with existing stacks, custom themes, popular page builders, and bespoke plugins. The goal is always to improve what you have before recommending a rebuild.",
  ],
  [
    "What information do you need to start?",
    "A short description of the problem, your website URL, and any relevant access or error details are usually enough to begin. Never send passwords by email.",
  ],
  [
    "Do you offer ongoing maintenance?",
    "Yes. Monthly plans cover updates, backups, security checks, performance monitoring, and a set amount of development support.",
  ],
  [
    "Can you recover a hacked WordPress site?",
    "Yes. I can help contain the incident, clean the installation, review vulnerabilities, harden the site, and put safer backups and monitoring in place.",
  ],
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function WordPressLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactState, contactAction, isPending] = useActionState(
    submitContactForm,
    initialContactState,
  );
  const submitted = contactState.status === "success";
  const fieldError = (field: keyof typeof contactState.fieldErrors) =>
    contactState.fieldErrors[field]?.[0];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a
            href="#top"
            className="flex items-center gap-3"
            onClick={closeMenu}
            aria-label="rambudev home"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground shadow-[0_0_24px_var(--primary-glow)]">
              W/
            </span>
            <span className="font-mono text-sm font-semibold tracking-tight">
              rambu<span className="text-primary">dev</span>
            </span>
          </a>
          <nav
            className={`${menuOpen ? "absolute inset-x-0 top-full flex flex-col border-b border-border bg-background px-5 py-5" : "hidden"} gap-5 text-sm text-muted-foreground md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
            aria-label="Main navigation"
          >
            <a
              href="#services"
              onClick={closeMenu}
              className="transition-colors hover:text-foreground"
            >
              Services
            </a>
            <a
              href="#process"
              onClick={closeMenu}
              className="transition-colors hover:text-foreground"
            >
              Process
            </a>
            <a
              href="#pricing"
              onClick={closeMenu}
              className="transition-colors hover:text-foreground"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={closeMenu}
              className="transition-colors hover:text-foreground"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground transition hover:bg-primary/90 md:mt-0"
            >
              Start a project <ArrowRight className="size-4" />
            </a>
          </nav>
          <button
            className="rounded-md p-2 text-muted-foreground md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="relative border-b border-border/70 px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="relative z-10">
              <Reveal>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />{" "}
                  Available for select projects
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="max-w-3xl text-balance font-mono text-4xl font-bold leading-[1.08] tracking-[-0.06em] sm:text-5xl lg:text-7xl">
                  WordPress problems solved.
                  <br />
                  <span className="text-primary">Custom solutions built.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                  Senior WordPress development for businesses that need a site
                  that works harder. 10+ years of plugin, theme, performance,
                  and troubleshooting expertise—with a fast, human response.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    className="group inline-flex items-center justify-center gap-3 rounded-md bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Get a free quote{" "}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center gap-3 rounded-md border border-border bg-card px-5 py-3.5 font-semibold transition hover:border-primary/50 hover:bg-secondary"
                  >
                    View services <MoveRight className="size-4" />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-border pt-6">
                  <div>
                    <p className="font-mono text-xl font-bold text-foreground">
                      100<span className="text-primary">+</span>
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Sites maintained
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xl font-bold text-foreground">
                      10<span className="text-primary">+</span>
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Years experience
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xl font-bold text-foreground">
                      24h
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Response time
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.16} className="relative">
              <div className="relative mx-auto max-w-xl rounded-xl border border-border bg-card p-3 shadow-2xl shadow-primary/5">
                <div className="flex items-center gap-2 border-b border-border px-3 pb-3">
                  <span className="size-2 rounded-full bg-destructive/70" />
                  <span className="size-2 rounded-full bg-primary/70" />
                  <span className="size-2 rounded-full bg-accent" />
                  <span className="ml-3 font-mono text-[10px] text-muted-foreground">
                    wp-admin / overview
                  </span>
                </div>
                <div className="grid grid-cols-[72px_1fr] gap-3 pt-3 sm:grid-cols-[92px_1fr]">
                  <div className="space-y-2 border-r border-border pr-3">
                    <div className="mb-5 flex size-8 items-center justify-center rounded bg-primary font-mono text-xs font-bold text-primary-foreground">
                      W
                    </div>
                    {[Blocks, BarChart3, PenTool, Search, ServerCog].map(
                      (Icon, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-center rounded p-2 ${i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}
                        >
                          <Icon className="size-4" />
                        </div>
                      ),
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-[10px] text-muted-foreground">
                          GOOD MORNING, ALEX
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          Site overview
                        </p>
                      </div>
                      <span className="rounded bg-primary/10 px-2 py-1 font-mono text-[9px] text-primary">
                        LIVE
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <div className="rounded border border-border bg-background p-3">
                        <p className="text-[10px] text-muted-foreground">
                          Performance
                        </p>
                        <p className="mt-2 font-mono text-lg font-bold text-primary">
                          98<span className="text-xs">/100</span>
                        </p>
                      </div>
                      <div className="rounded border border-border bg-background p-3">
                        <p className="text-[10px] text-muted-foreground">
                          Uptime
                        </p>
                        <p className="mt-2 font-mono text-lg font-bold">
                          99.9<span className="text-xs">%</span>
                        </p>
                      </div>
                      <div className="hidden rounded border border-border bg-background p-3 sm:block">
                        <p className="text-[10px] text-muted-foreground">
                          Updates
                        </p>
                        <p className="mt-2 font-mono text-lg font-bold">
                          0
                          <span className="text-xs text-muted-foreground">
                            {" "}
                            due
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="rounded border border-border bg-background p-3">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-[10px] text-muted-foreground">
                          Weekly traffic
                        </p>
                        <span className="font-mono text-[10px] text-primary">
                          +24.8%
                        </span>
                      </div>
                      <div className="flex h-20 items-end gap-1.5">
                        {[32, 46, 38, 62, 55, 71, 66, 84, 78, 94, 87, 100].map(
                          (height, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t-sm bg-primary/30 transition-colors hover:bg-primary"
                              style={{ height: `${height}%` }}
                            />
                          ),
                        )}
                      </div>
                      <div className="mt-2 flex justify-between font-mono text-[8px] text-muted-foreground">
                        <span>MON</span>
                        <span>WED</span>
                        <span>FRI</span>
                        <span>SUN</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded border border-primary/20 bg-primary/5 px-3 py-2 font-mono text-[10px] text-primary">
                  <Zap className="size-3" /> All systems operational{" "}
                  <span className="ml-auto text-muted-foreground">
                    just now
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="services"
          className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <p className="section-kicker">What I do</p>
                <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                  Technical work that moves your business forward.
                </h2>
                <p className="mt-4 text-muted-foreground leading-7">
                  From a single stubborn bug to a complete custom build, I bring
                  senior-level thinking to the details that make WordPress
                  dependable.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ icon: Icon, title, description }, i) => (
                <Reveal key={title} delay={i * 0.04}>
                  <article className="group h-full bg-card p-6 transition-colors hover:bg-secondary/70 sm:p-7">
                    <div className="mb-10 flex items-start justify-between">
                      <div className="flex size-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <ExternalLink className="size-4 text-muted-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <h3 className="font-mono text-base font-semibold">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary"
                    >
                      Learn more{" "}
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="why"
          className="border-y border-border bg-secondary/30 px-5 py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <Reveal>
              <p className="section-kicker">The difference</p>
              <h2 className="mt-3 max-w-md text-balance font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                A developer who thinks beyond the ticket.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                Good development is not just making something work. It is making
                the next change easier, the next problem smaller, and the whole
                business more confident.
              </p>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              {differentiators.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="border-t border-border pt-5">
                    <Icon className="size-5 text-primary" />
                    <h3 className="mt-5 font-mono text-sm font-semibold">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="process"
          className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-14 max-w-xl">
                <p className="section-kicker">How it works</p>
                <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                  A clear process. No black box.
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-8 md:grid-cols-4">
              {steps.map(([number, title, text], i) => (
                <Reveal key={number} delay={i * 0.07}>
                  <div className="relative border-t border-border pt-5">
                    <span className="font-mono text-xs text-primary">
                      {number}
                    </span>
                    <h3 className="mt-5 font-mono text-base font-semibold">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {text}
                    </p>
                    {i < 3 && (
                      <ArrowRight className="absolute right-0 top-5 hidden size-4 text-border md:block" />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/30 px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="section-kicker">Client notes</p>
                  <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                    Trusted by people who value craft.
                  </h2>
                </div>
                <p className="max-w-xs text-sm leading-6 text-muted-foreground sm:text-right">
                  Trusted by agencies and business owners who need WordPress
                  done right.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
              {testimonials.map(([quote, name, role], i) => (
                <Reveal key={name} delay={i * 0.06}>
                  <figure className="h-full bg-card p-6 sm:p-8">
                    <div
                      className="flex gap-1 text-primary"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index}>★</span>
                      ))}
                    </div>
                    <blockquote className="mt-8 text-sm leading-7 text-foreground/90">
                      {quote}
                    </blockquote>
                    <figcaption className="mt-8 border-t border-border pt-4">
                      <p className="font-mono text-xs font-semibold">{name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {role}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <p className="section-kicker">Ways to work together</p>
                <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                  Straightforward plans for every stage.
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-4 lg:grid-cols-3">
              <PricingCard
                title="One-time fix"
                eyebrow="For urgent problems"
                price="$35"
                unit="/ hour"
                features={[
                  "Issue diagnosis & estimate",
                  "Focused development session",
                  "Clear handover notes",
                ]}
              />
              <PricingCard
                featured
                title="Maintenance plan"
                eyebrow="Most popular"
                price="$350"
                unit="/ month"
                features={[
                  "Monthly updates & backups",
                  "Security & uptime checks",
                  "2 hours development support",
                  "Priority response",
                ]}
              />
              <PricingCard
                title="Custom project"
                eyebrow="For bigger builds"
                price="Let’s talk"
                unit="quote-based"
                features={[
                  "Discovery & technical plan",
                  "Milestone-based delivery",
                  "Staging and launch support",
                ]}
              />
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-20 border-y border-border bg-secondary/30 px-5 py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <Reveal>
              <p className="section-kicker">Questions</p>
              <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                Before we get started.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                Still unsure? Send over the details and I’ll point you in the
                right direction—no hard sell.
              </p>
            </Reveal>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map(([question, answer], i) => (
                <div key={question}>
                  <button
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-mono text-sm font-semibold"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {question}
                    <ChevronDown
                      className={`size-4 shrink-0 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${openFaq === i ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <p className="overflow-hidden text-sm leading-6 text-muted-foreground">
                      {answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-20 px-5 py-20 lg:px-8 lg:py-28"
        >
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <Reveal>
              <p className="section-kicker">Get in touch</p>
              <h2 className="mt-3 text-balance font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                Let’s fix or build your WordPress site.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                Tell me what you’re working on. I’ll review the details and get
                back to you with useful next steps—not a generic sales reply.
              </p>
              <div className="mt-10 space-y-5">
                <a
                  className="flex items-center gap-3 text-sm text-muted-foreground transition hover:text-primary"
                  href="mailto:vn.nqhung@gmail.com"
                >
                  <Mail className="size-4 text-primary" /> vn.nqhung@gmail.com
                </a>
                <a
                  className="flex items-center gap-3 text-sm text-muted-foreground transition hover:text-primary"
                  href="https://t.me/rambudev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="size-4 text-primary" /> Telegram:
                  @rambudev <ExternalLink className="size-3" />
                </a>
                <a
                  className="flex items-center gap-3 text-sm text-muted-foreground transition hover:text-primary"
                  href="https://wa.me/rambudev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="size-4 text-primary" /> WhatsApp:
                  rambudev <ExternalLink className="size-3" />
                </a>
                <a
                  className="flex items-center gap-3 text-sm text-muted-foreground transition hover:text-primary"
                  href="https://calendly.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <CalendarDays className="size-4 text-primary" /> Book a
                  20-minute call <ExternalLink className="size-3" />
                </a>
                <p className="flex items-center gap-3 text-xs text-muted-foreground">
                  <LockKeyhole className="size-4 text-primary" /> Free initial
                  consultation. No commitment required.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-border bg-card p-5 sm:p-8">
                {submitted ? (
                  <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-7" />
                    </div>
                    <h3 className="mt-6 font-mono text-xl font-bold">
                      Message received.
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                      Thanks for reaching out. I’ll be in touch within 24 hours
                      with next steps.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-8 text-sm font-semibold text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    action={contactAction}
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    <Field label="Name" error={fieldError("name")} errorId="contact-name-error">
                      <input
                        id="contact-name"
                        name="name"
                        placeholder="Your name"
                        minLength={2}
                        maxLength={100}
                        required
                        aria-invalid={Boolean(fieldError("name"))}
                        aria-describedby={fieldError("name") ? "contact-name-error" : undefined}
                        className="form-input"
                      />
                    </Field>
                    <Field label="Email" error={fieldError("email")} errorId="contact-email-error">
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        required
                        maxLength={254}
                        aria-invalid={Boolean(fieldError("email"))}
                        aria-describedby={fieldError("email") ? "contact-email-error" : undefined}
                        className="form-input"
                      />
                    </Field>
                    <Field label="Website URL" error={fieldError("website")} errorId="contact-website-error">
                      <input
                        id="contact-website"
                        name="website"
                        type="url"
                        placeholder="https://"
                        maxLength={2048}
                        aria-invalid={Boolean(fieldError("website"))}
                        aria-describedby={fieldError("website") ? "contact-website-error" : undefined}
                        className="form-input"
                      />
                    </Field>
                    <Field label="Service needed" error={fieldError("service")} errorId="contact-service-error">
                      <select
                        id="contact-service"
                        name="service"
                        className="form-input"
                        required
                        aria-invalid={Boolean(fieldError("service"))}
                        aria-describedby={fieldError("service") ? "contact-service-error" : undefined}
                      >
                        <option value="">Select a service</option>
                        <option>Custom Plugin</option>
                        <option>Theme Work</option>
                        <option>Maintenance</option>
                        <option>Emergency Fix</option>
                        <option>Other</option>
                      </select>
                    </Field>
                    <Field
                      label="Project details"
                      error={fieldError("details")}
                      errorId="contact-details-error"
                      wide
                    >
                      <textarea
                        id="contact-details"
                        name="details"
                        placeholder="What would you like help with?"
                        minLength={20}
                        maxLength={2000}
                        required
                        aria-invalid={Boolean(fieldError("details"))}
                        aria-describedby={fieldError("details") ? "contact-details-error" : undefined}
                        rows={5}
                        className="form-input resize-y"
                      />
                    </Field>
                    <Field label="Budget range" error={fieldError("budget")} errorId="contact-budget-error">
                      <select
                        id="contact-budget"
                        name="budget"
                        className="form-input"
                        required
                        aria-invalid={Boolean(fieldError("budget"))}
                        aria-describedby={fieldError("budget") ? "contact-budget-error" : undefined}
                      >
                        <option value="">Select a range</option>
                        <option>Under $500</option>
                        <option>$500 – $2,000</option>
                        <option>$2,000 – $5,000</option>
                        <option>$5,000+</option>
                        <option>Not sure yet</option>
                      </select>
                    </Field>
                    <Field
                      label="Preferred contact"
                      error={fieldError("contact")}
                      errorId="contact-method-error"
                    >
                      <select
                        id="contact-method"
                        name="contact"
                        className="form-input"
                        required
                        aria-invalid={Boolean(fieldError("contact"))}
                        aria-describedby={fieldError("contact") ? "contact-method-error" : undefined}
                      >
                        <option value="">Choose one</option>
                        <option>Email</option>
                        <option>Video call</option>
                        <option>Phone</option>
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <button
                        disabled={isPending}
                        className="group inline-flex w-full items-center justify-center gap-3 rounded-md bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-wait disabled:opacity-70"
                      >
                        {isPending ? "Sending…" : "Send project enquiry"}{" "}
                        {!isPending && (
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        )}
                      </button>
                    </div>
                    <input
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="sr-only"
                    />
                    <p
                      aria-live="polite"
                      className={`text-xs ${contactState.status === "error" ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {contactState.message}
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
          <div>
            <a href="#top" className="font-mono text-sm font-semibold">
              rambu<span className="text-primary">dev</span>
            </a>
            <p className="mt-3 max-w-xs text-xs leading-5 text-muted-foreground">
              Senior WordPress development for businesses that care about the
              details.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted-foreground">
            <a href="#services" className="hover:text-foreground">
              Services
            </a>
            <a href="#process" className="hover:text-foreground">
              Process
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </div>
          <div className="text-xs text-muted-foreground md:text-right">
            <p>© {new Date().getFullYear()} rambudev</p>
            <p className="mt-2">
              Not affiliated with the WordPress Foundation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PricingCard({
  title,
  eyebrow,
  price,
  unit,
  features,
  featured = false,
}: {
  title: string;
  eyebrow: string;
  price: string;
  unit: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <article
      className={`relative rounded-xl border p-6 sm:p-8 ${featured ? "border-primary bg-primary/[0.07] shadow-xl shadow-primary/10" : "border-border bg-card"}`}
    >
      <div className="flex items-center justify-between">
        <p className="section-kicker">{eyebrow}</p>
        {featured && (
          <span className="rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] font-bold text-primary-foreground">
            POPULAR
          </span>
        )}
      </div>
      <h3 className="mt-6 font-mono text-lg font-semibold">{title}</h3>
      <div className="mt-5 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-bold">{price}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <ul className="mt-8 space-y-3 border-t border-border pt-6">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {feature}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold ${featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border hover:border-primary/50"}`}
      >
        Choose this plan <ArrowRight className="size-4" />
      </a>
    </article>
  );
}

function Field({
  label,
  error,
  errorId,
  children,
  wide = false,
}: {
  label: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label
      className={`grid gap-2 text-xs font-semibold ${wide ? "sm:col-span-2" : ""}`}
    >
      <span>{label}</span>
      {children}
      {error && (
        <span
          id={errorId}
          className="font-normal text-destructive"
        >
          {error}
        </span>
      )}
    </label>
  );
}
