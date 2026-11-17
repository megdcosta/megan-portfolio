/**
 * Prefixes a file in /public with the site's base path, so plain <img> and
 * <a href> links keep working when the site is served from a sub-path
 * (GitHub Pages: /megan-portfolio). Locally the prefix is empty.
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
