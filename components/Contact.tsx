"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, CircleAlert, Mail, Send } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/lib/data";
import {
  GithubIcon,
  LinkedinIcon,
  Magnetic,
  Reveal,
  SectionHeading,
  btnPrimary,
  snappy,
  spring,
} from "./ui";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", message: "" };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please add your name.";
  if (!f.email.trim()) e.email = "Please add your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "That email doesn't look right.";
  if (f.message.trim().length < 10)
    e.message = "A sentence or two helps (10+ characters).";
  return e;
}

const fieldClass =
  "mt-1.5 w-full rounded-xl border bg-canvas px-4 py-3 text-base text-ink transition-colors duration-300 focus:border-ink focus:outline-none focus:ring-2 focus:ring-pop";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold uppercase tracking-[0.12em]">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold"
          >
            <CircleAlert size={15} aria-hidden className="shrink-0 text-tint" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    /* --------------------------------------------------------------------
       PLUG IN A REAL ENDPOINT HERE
       --------------------------------------------------------------------
       Formspree: make this handler async and replace the mailto fallback
       below with

         const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
           method: "POST",
           headers: { "Content-Type": "application/json", Accept: "application/json" },
           body: JSON.stringify(fields),
         });
         if (!res.ok) return; // show an error message instead of setSent

       Resend: create app/api/contact/route.ts that calls
       resend.emails.send({ from, to: site.email, subject, text })
       and POST `fields` to "/api/contact" the same way as above.
       -------------------------------------------------------------------- */

    // Fallback: open the visitor's mail client with everything pre-filled.
    const subject = `[Portfolio] Message from ${fields.name.trim()}`;
    const body = `${fields.message.trim()}\n\n— ${fields.name.trim()}\n${fields.email.trim()}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  const links = [
    { label: "Email", href: `mailto:${site.email}`, Icon: Mail, external: false },
    { label: "GitHub", href: site.github, Icon: GithubIcon, external: true },
    { label: "LinkedIn", href: site.linkedin, Icon: LinkedinIcon, external: true },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-16 pt-24 md:px-8 md:pt-28">
      <SectionHeading title="Get in Touch" />

      <div className="max-w-3xl">
        {/* Message form */}
        <Reveal>
          <div className="rounded-3xl border border-line bg-surface p-6 md:p-9">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  role="status"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={spring}
                  className="flex min-h-[22rem] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ ...snappy, delay: 0.1 }}
                    className="grid h-16 w-16 place-items-center rounded-full bg-ink text-canvas ring-8 ring-pop/50"
                  >
                    <Check size={30} aria-hidden />
                  </motion.span>
                  <h3 className="mt-7 font-display text-4xl font-semibold">
                    Your email draft is ready.
                  </h3>
                  <p className="mt-3 max-w-sm text-lg text-ink-soft">
                    Press send in your mail app to deliver it. If nothing
                    opened, email me at{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="font-semibold text-ink underline decoration-tint decoration-2 underline-offset-4"
                    >
                      {site.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFields(empty);
                      setSent(false);
                    }}
                    className="link-underline mt-7 py-1 font-semibold"
                  >
                    Write another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Name" error={errors.name}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={fields.name}
                        onChange={(e) => set("name")(e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`${fieldClass} ${errors.name ? "border-tint" : "border-line"}`}
                      />
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={fields.email}
                        onChange={(e) => set("email")(e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`${fieldClass} ${errors.email ? "border-tint" : "border-line"}`}
                      />
                    </Field>
                  </div>
                  <Field id="message" label="Message" error={errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={fields.message}
                      onChange={(e) => set("message")(e.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`${fieldClass} resize-y ${errors.message ? "border-tint" : "border-line"}`}
                    />
                  </Field>
                  <Magnetic strength={0.15}>
                    <button type="submit" className={btnPrimary}>
                      Send Message
                      <Send size={17} aria-hidden />
                    </button>
                  </Magnetic>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* Icon links */}
      <Reveal className="mt-14 flex gap-4">
        {links.map(({ label, href, Icon, external }) => (
          <Magnetic key={label} strength={0.4}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="grid h-14 w-14 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-tint hover:bg-pop/40"
            >
              <Icon className="h-6 w-6" />
            </a>
          </Magnetic>
        ))}
      </Reveal>
    </section>
  );
}
