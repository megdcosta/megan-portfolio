import type { NextConfig } from "next";

// GitHub Pages serves this repo at https://megdcosta.github.io/megan-portfolio,
// so production builds live under that sub-path. Local `npm run dev` stays at "/".
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH; lib/asset.ts uses it too.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` writes the whole site to ./out
  output: "export",
  basePath,
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
