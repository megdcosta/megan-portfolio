import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-5 md:px-8">
      <p className="border-t border-line py-8 text-center text-ink-soft">
        &copy; 2026 {site.name}
      </p>
    </footer>
  );
}
