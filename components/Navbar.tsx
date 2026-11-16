"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks, site } from "@/lib/data";
import MonogramLogo from "./MonogramLogo";
import { snappy } from "./ui";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        {/* Left: monogram + wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="Megan D'Costa, back to top"
        >
          <motion.span whileHover={{ rotate: -6, scale: 1.08 }} transition={snappy}>
            <MonogramLogo className="h-8 w-8 text-accent" title="" aria-hidden />
          </motion.span>
          <span className="font-display text-2xl font-semibold tracking-tight">
            {site.name}
          </span>
        </a>

        {/* Right: anchor links */}
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-7 text-[0.95rem] font-medium">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline py-1">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full border border-line sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="overflow-hidden border-t border-line/60 sm:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 font-display text-2xl font-semibold hover:bg-pop/40"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
