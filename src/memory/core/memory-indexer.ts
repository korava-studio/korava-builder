import { MemoryEntry } from "../memory-types.js";
import { MemoryStore } from "./memory-store.js";

export class MemoryIndexer {
  private keywordIndex = new Map<string, Set<string>>();

  constructor(private store: MemoryStore) {}

  indexEntry(entry: MemoryEntry) {
    this.removeEntry(entry.id);
    const tokens = this.buildTokens(entry);
    for (const token of tokens) {
      const set = this.keywordIndex.get(token) ?? new Set();
      set.add(entry.id);
      this.keywordIndex.set(token, set);
    }
  }

  searchKeywords(query: string) {
    const token = query.toLowerCase();
    const ids = this.keywordIndex.get(token) ?? new Set();
    return Array.from(ids)
      .map((id) => this.store.get(id))
      .filter((entry): entry is MemoryEntry => Boolean(entry));
  }

  private buildTokens(entry: MemoryEntry) {
    const values = [entry.title, entry.summary, entry.content, ...entry.tags];
    return values
      .join(" ")
      .toLowerCase()
      .split(/\W+/)
      .filter(Boolean);
  }

  private removeEntry(id: string) {
    for (const [keyword, ids] of this.keywordIndex.entries()) {
      if (ids.has(id)) {
        ids.delete(id);
        if (ids.size === 0) {
          this.keywordIndex.delete(keyword);
        }
      }
    }
  }
}
