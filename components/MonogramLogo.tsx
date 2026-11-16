import type { SVGProps } from "react";

/**
 * Bespoke "M" monogram: a tapered left leg, a thick diagonal that folds like
 * a ribbon at the baseline and rises as a hairline, and a heavy right stem.
 * Fills with currentColor, so set the colour with a text-* class.
 */
export default function MonogramLogo({
  title = "Megan D'Costa monogram",
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      {...props}
    >
      {/* Left leg: hairline at the cap, flaring into a wide foot */}
      <path d="M33 10 L38 10 C37 46 35 84 31 112 L5 112 C19 84 29 46 33 10 Z" />
      {/* Ribbon: thick diagonal, fold at the baseline, hairline rising right */}
      <path d="M33 10 H57 C58 46 61 84 68 100 C71 106 75 100 77 86 C80 62 82 34 83 10 H88 C87 42 85 78 80 100 C75 115 61 116 54 104 C44 86 37 46 33 10 Z" />
      {/* Right stem: heavy, with a slight flare at the foot */}
      <path d="M83 10 H106 C105 48 107 88 114 112 H82 C86 84 87 46 83 10 Z" />
    </svg>
  );
}
