import { MemoryEntry, MemoryType } from "../memory-types.js";
import { MemoryIndexer } from "../core/memory-indexer.js";
import { MemoryStore } from "../core/memory-store.js";

export class MemoryRetriever {
  constructor(private store: MemoryStore, private indexer: MemoryIndexer) {}

  recallById(id: string) {
    return this.store.get(id);
  }

  recallByKeyword(query: string) {
    return this.indexer.searchKeywords(query);
  }

  recallByTag(tag: string) {
    return this.store.searchByTag(tag);
  }

  recallByOwner(owner: string) {
    return this.store.listByOwner(owner);
  }

  recallByType(type: MemoryType) {
    return this.store.listByType(type);
  }

  recallByTimeline(from?: string, to?: string) {
    const entries = this.store.list();
    return entries.filter((entry) => {
      const timestamp = entry.updatedAt;
      return (!from || timestamp >= from) && (!to || timestamp <= to);
    });
  }

  semantic(query: string) {
    return this.recallByKeyword(query);
  }

  hybrid(query: string) {
    return [...new Set([...this.recallByKeyword(query), ...this.semantic(query)])];
  }
}
