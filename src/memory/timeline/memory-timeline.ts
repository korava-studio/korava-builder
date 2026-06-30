import { MemoryEntry } from "../memory-types.js";
import { MemoryStore } from "../core/memory-store.js";

export class MemoryTimeline {
  constructor(private store: MemoryStore) {}

  listRecent(count = 10) {
    return this.store
      .list()
      .sort((a, b) => (b.updatedAt < a.updatedAt ? -1 : 1))
      .slice(0, count);
  }

  listByRange(start: string, end: string) {
    return this.store.list().filter((entry) => entry.updatedAt >= start && entry.updatedAt <= end);
  }

  historyForOwner(owner: string) {
    return this.store.listByOwner(owner).sort((a, b) => (a.updatedAt < b.updatedAt ? -1 : 1));
  }

  historyForTag(tag: string) {
    return this.store.searchByTag(tag).sort((a, b) => (a.updatedAt < b.updatedAt ? -1 : 1));
  }
}
