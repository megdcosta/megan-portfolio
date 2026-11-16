"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { roles } from "@/lib/data";
import { Reveal, SectionHeading, snappy, spring } from "./ui";

export default function ExperienceTimeline() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const role = roles[active];

  // Arrow-key navigation, per the ARIA tabs pattern.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = roles.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="experience"
      className="border-y border-line/60 bg-surface"
    >
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading title="Experience" />

        <Reveal className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
          {/* Left: vertical timeline rail with tabs */}
          <div
            role="tablist"
            aria-label="Co-op roles"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="relative"
          >
            {/* The rail */}
            <span
              aria-hidden
              className="absolute bottom-6 left-[0.9rem] top-6 w-px bg-line"
            />
            {roles.map((r, i) => {
              const selected = i === active;
              return (
                <button
                  key={r.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${r.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${r.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group relative flex w-full items-start gap-1 rounded-2xl py-4 pl-0 pr-4 text-left"
                >
                  {/* Sliding highlight behind the active tab */}
                  {selected && (
                    <motion.span
                      layoutId="timeline-highlight"
                      transition={snappy}
                      className="absolute inset-y-0 left-10 right-0 rounded-2xl border border-tint bg-canvas"
                    />
                  )}
                  {/* Node on the rail */}
                  <span className="relative z-10 mt-1 grid h-[1.85rem] w-[1.85rem] shrink-0 place-items-center">
                    <span
                      className={`h-3 w-3 rounded-full border-2 transition-colors duration-300 ${
                        selected
                          ? "border-accent bg-surface"
                          : "border-line bg-surface group-hover:border-tint"
                      }`}
                    />
                    {selected && (
                      <motion.span
                        layoutId="timeline-node"
                        transition={snappy}
                        className="absolute inset-0 rounded-full bg-accent ring-4 ring-pop/60"
                      />
                    )}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.logo}
                    alt=""
                    className="relative z-10 ml-4 mt-0.5 h-12 w-12 shrink-0 rounded-xl border border-line bg-white object-contain"
                  />
                  <span className="relative z-10 pl-3 pr-2">
                    <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-kicker">
                      {r.dates}
                    </span>
                    <span className="mt-1 block font-display text-2xl font-semibold leading-tight">
                      {r.company}
                    </span>
                    <span className="mt-0.5 block text-ink-soft">{r.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: impact card */}
          <div className="relative min-h-[26rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={role.id}
                role="tabpanel"
                id={`panel-${role.id}`}
                aria-labelledby={`tab-${role.id}`}
                tabIndex={0}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ ...spring, stiffness: 200, damping: 24 }}
                className="rounded-3xl border border-line bg-canvas p-7 md:p-10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={role.logo}
                  alt={`${role.company} logo`}
                  className="mb-6 h-16 w-16 rounded-2xl border border-line bg-white object-contain"
                />
                <h3 className="font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
                  {role.title}
                </h3>
                <p className="mt-3 text-xl font-semibold text-kicker">
                  {role.company}
                </p>
                <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-ink-soft">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={17} aria-hidden />
                    {role.dates}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={17} aria-hidden />
                    {role.location}
                  </span>
                </p>
                <ul className="mt-8 space-y-5 border-t border-line pt-8">
                  {role.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...spring, delay: 0.08 + i * 0.07 }}
                      className="flex gap-4 text-lg leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.7rem] h-2 w-2 shrink-0 rotate-45 bg-tint"
                      />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
