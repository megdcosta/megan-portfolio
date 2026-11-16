"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import { projects } from "@/lib/data";
import { GithubIcon, Reveal, SectionHeading, Tag, snappy } from "./ui";

/* To add a project: add an entry to `projects` in lib/data.ts and put its
   screenshot in public/projects/. */

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
      <SectionHeading title="Projects" />

      <div className="space-y-8">
        {projects.map((p) => (
          <Reveal key={p.id}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={snappy}
              className="grid items-center gap-8 rounded-3xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-tint md:p-8 lg:grid-cols-2 lg:gap-12"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.screenshot}
                alt={`Screenshot of ${p.name}`}
                className="aspect-[16/9] w-full rounded-2xl border border-brown/20 object-cover object-top shadow-[0_18px_40px_-22px_rgba(60,40,28,0.55)]"
              />

              <div>
                {p.award && (
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-mauve px-3.5 py-1 text-sm font-bold text-cream">
                    <Trophy size={15} aria-hidden />
                    {p.award}
                  </p>
                )}
                <h3 className="font-display text-5xl font-semibold leading-none">
                  {p.name}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                  {p.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-5">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline group inline-flex items-center gap-2 py-1 text-base font-semibold"
                    >
                      {l.kind === "github" && <GithubIcon className="h-[1.05rem] w-[1.05rem]" />}
                      {l.label}
                      <ArrowUpRight
                        size={17}
                        aria-hidden
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
