const ALLOWED_PROTOCOLS: ReadonlySet<string> = new Set(["http:", "https:", "mailto:"]);

/**
 * Returns a link that is safe to render, or undefined when the value is
 * empty, malformed, or uses a protocol other than http(s) or mailto.
 * Site-relative paths such as "/resume.pdf" are allowed.
 */
export function safeHref(raw: string | undefined): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  if (value.startsWith("/") && !value.startsWith("//")) return value;

  try {
    const url = new URL(value);
    return ALLOWED_PROTOCOLS.has(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}
