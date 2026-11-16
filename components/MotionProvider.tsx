"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Honours the visitor's "reduce motion" system setting site-wide. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
