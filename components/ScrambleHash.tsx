"use client";

import { useEffect, useState } from "react";

interface ScrambleHashProps {
  /** The text to settle on, e.g. "0x3fa91c…b27e". Only hex digits are scrambled. */
  value: string;
  durationMs?: number;
}

const GLYPHS = "0123456789abcdef";

function scramble(target: string, progress: number): string {
  const settled = Math.floor(target.length * progress);
  let out = "";
  for (let i = 0; i < target.length; i += 1) {
    const char = target.charAt(i);
    const isHexDigit = GLYPHS.includes(char);
    out += i < settled || !isHexDigit ? char : GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
  }
  return out;
}

/**
 * Server-renders the final value, then on load resolves it digit by digit from
 * left to right. Skipped when the visitor prefers reduced motion.
 */
export default function ScrambleHash({ value, durationMs = 900 }: ScrambleHashProps) {
  const [text, setText] = useState<string>(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = performance.now();
    let frame = 0;

    const tick = (now: number): void => {
      const progress = Math.min((now - start) / durationMs, 1);
      setText(progress >= 1 ? value : scramble(value, progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{text}</span>
    </>
  );
}
