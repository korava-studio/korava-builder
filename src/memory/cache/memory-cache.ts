import { MemoryEntry } from "../memory-types.js";

interface CacheRecord {
  entry: MemoryEntry;
  expiresAt: number;
}

export class MemoryCache {
  private cache = new Map<string, CacheRecord>();

  constructor(private ttlMs = 300_000) {}

  set(entry: MemoryEntry) {
    this.cache.set(entry.id, {
      entry,
      expiresAt: Date.now() + this.ttlMs
    });
  }

  get(id: string) {
    const record = this.cache.get(id);
    if (!record) {
      return null;
    }
    if (Date.now() > record.expiresAt) {
      this.cache.delete(id);
      return null;
    }
    return record.entry;
  }

  has(id: string) {
    return Boolean(this.get(id));
  }

  clear() {
    this.cache.clear();
  }
}
