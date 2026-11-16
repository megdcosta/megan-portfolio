"use client";

import { Award, GraduationCap } from "lucide-react";
import { education } from "@/lib/data";
import { Reveal, SectionHeading } from "./ui";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
      <SectionHeading title="About" />

      {/* Education & honors */}
      <Reveal>
        <div className="grid gap-8 rounded-3xl bg-sage p-7 text-brown-deep md:grid-cols-[1.4fr_1fr] md:p-9">
          <div className="flex gap-4">
            <GraduationCap className="mt-1 shrink-0" size={28} aria-hidden />
            <div>
              <h3 className="font-display text-3xl font-semibold md:text-4xl">
                {education.school}
              </h3>
              <p className="mt-1 text-lg">{education.degree}</p>
              <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                <span>
                  <span className="font-semibold">GPA</span> {education.gpa}
                </span>
                <span>{education.dates}</span>
                <span>{education.location}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 md:border-l md:border-brown-deep/25 md:pl-8">
            <Award className="mt-1 shrink-0" size={28} aria-hidden />
            <div>
              <p className="text-lg leading-snug">{education.honors}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {education.honorTerms.map((term) => (
                  <li
                    key={term}
                    className="rounded-full bg-cream px-3 py-0.5 text-sm font-bold"
                  >
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

    </section>
  );
}
