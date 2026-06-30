import { MemoryEntry } from "../memory-types.js";
import { MemoryStore } from "../core/memory-store.js";

export class MemoryCompressor {
  constructor(private store: MemoryStore) {}

  compress(entry: MemoryEntry) {
    const summary = this.summarize(entry.content);
    const updated = this.store.update({ id: entry.id, summary });
    return updated;
  }

  merge(entries: MemoryEntry[]) {
    const merged = entries.reduce<MemoryEntry | null>((accumulator, next) => {
      if (!accumulator) return { ...next };
      return {
        ...accumulator,
        content: `${accumulator.content}\n${next.content}`,
        summary: `${accumulator.summary} ${next.summary}`.trim(),
        tags: Array.from(new Set([...accumulator.tags, ...next.tags])),
        updatedAt: next.updatedAt,
        importance: accumulator.importance === "Critical" || next.importance === "Critical" ? "Critical" : accumulator.importance,
        owner: next.owner || accumulator.owner,
        visibility: next.visibility,
        id: accumulator.id,
        title: accumulator.title,
        createdAt: accumulator.createdAt,
        type: accumulator.type
      };
    }, null);

    if (!merged) {
      throw new Error("No entries provided to merge");
    }

    this.store.update({
      id: merged.id,
      content: merged.content,
      summary: merged.summary,
      tags: merged.tags
    });
    return merged;
  }

  archiveOld(thresholdDays: number) {
    const threshold = Date.now() - thresholdDays * 24 * 60 * 60 * 1000;
    const oldEntries = this.store.list().filter((entry) => Date.parse(entry.updatedAt) < threshold);
    return oldEntries.map((entry) => this.store.archive(entry.id)).filter((entry): entry is MemoryEntry => Boolean(entry));
  }

  private summarize(content: string) {
    const excerpt = content.trim().split("\n").slice(0, 3).join(" ");
    return excerpt.length > 200 ? `${excerpt.slice(0, 197)}...` : excerpt;
  }
}
