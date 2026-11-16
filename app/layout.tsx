import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";

// Display serif: stands in for TAN Meringue (see the swap-in note in
// globals.css). Exposed as --font-cormorant and consumed by --font-display.
const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body / UI sans. Exposed as --font-source-sans and consumed by --font-sans.
const sans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Megan D'Costa | Software Engineering & Cybersecurity",
  description:
    "Portfolio of Megan D'Costa, a Software Engineering co-op student at the University of Guelph working across full-stack development and cybersecurity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
