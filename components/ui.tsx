"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import type { ReactNode, SVGProps } from "react";

/* ------------------------------------------------------------------------
   Shared motion + UI primitives
   ------------------------------------------------------------------------ */

export const spring = { type: "spring", stiffness: 120, damping: 18 } as const;
export const snappy = { type: "spring", stiffness: 380, damping: 26 } as const;

/** Scroll-triggered reveal with spring physics. */
export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...spring, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Wraps a child so it leans gently toward the cursor. */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  return (
    <motion.span
      className={`inline-flex ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      transition={snappy}
    >
      {children}
    </motion.span>
  );
}

/** Top reading-progress bar. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--accent), var(--tint))",
      }}
    />
  );
}

/** Section heading: one display title, optional one-line intro. */
export function SectionHeading({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <h2 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance md:text-7xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {intro}
        </p>
      )}
    </Reveal>
  );
}

/** Small pill used for tech / skill tags. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 text-sm font-medium transition-colors duration-300 hover:border-tint hover:bg-pop/35">
      {children}
    </span>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-[background-color,border-color,color,box-shadow] duration-300";

export const btnPrimary = `${btnBase} bg-ink text-canvas shadow-[0_2px_0_0_var(--line)] hover:shadow-[0_5px_0_0_var(--tint)]`;
export const btnSecondary = `${btnBase} border-2 border-ink/70 hover:border-ink hover:bg-pop/40`;

/* Brand marks (lucide no longer ships brand icons) */
export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
