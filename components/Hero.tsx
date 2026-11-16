"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { site } from "@/lib/data";
import MonogramLogo from "./MonogramLogo";
import { Magnetic, btnPrimary, btnSecondary, spring } from "./ui";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: spring },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line/60"
    >
      {/* Oversized monogram watermark */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ ...spring, delay: 0.3 }}
        className="pointer-events-none absolute -right-16 -top-6 text-line md:-right-10 md:top-4"
      >
        <MonogramLogo className="h-[22rem] w-[22rem] opacity-45 md:h-[38rem] md:w-[38rem]" title="" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24"
      >
        <motion.h1
          variants={item}
          className="font-display text-[clamp(4rem,13vw,11rem)] font-semibold leading-[0.88] tracking-tight"
        >
          Megan
          <br />
          <span className="italic text-accent">D&rsquo;Costa</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-10 max-w-xl text-xl leading-relaxed text-ink-soft md:text-2xl"
        >
          {site.intro}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a href="#contact" className={btnPrimary}>
              Get in Touch
              <ArrowDown size={17} aria-hidden />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={site.resume} download className={btnSecondary}>
              <Download size={17} aria-hidden />
              Download Resume
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
