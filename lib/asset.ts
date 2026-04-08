/**
 * Prefix a public asset path with the configured basePath.
 * Needed because next/image with `unoptimized: true` does not auto-apply
 * basePath, and plain <img> tags never do.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}
