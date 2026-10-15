import { createHash } from "node:crypto";
import type { ExperienceItem } from "@/types/portfolio";

export const ZERO_HASH: string = "0".repeat(64);

export interface Block {
  height: number;
  entry: ExperienceItem;
  prevHash: string;
  hash: string;
}

export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function shortHash(hash: string): string {
  return `0x${hash.slice(0, 6)}…${hash.slice(-4)}`;
}

/**
 * Links experience entries into a hash chain, oldest first: each block's hash
 * covers its own content plus its parent's hash. Entries come in newest first
 * (resume order) and the blocks are returned in that same display order.
 * Server-only: uses node:crypto.
 */
export function buildChain(entries: readonly ExperienceItem[]): Block[] {
  let prevHash = ZERO_HASH;

  const oldestFirst = [...entries].reverse().map((entry, height): Block => {
    const hash = sha256(prevHash + JSON.stringify(entry));
    const block: Block = { height, entry, prevHash, hash };
    prevHash = hash;
    return block;
  });

  return oldestFirst.reverse();
}

/** The newest block's hash, or a hash of the name when there is no experience. */
export function headHash(name: string, blocks: readonly Block[]): string {
  return blocks.at(0)?.hash ?? sha256(name);
}
