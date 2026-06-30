import { MemoryCache } from "../cache/memory-cache.js";
import { MemoryCompressor } from "../compression/memory-compressor.js";
import { MemoryIndexer } from "./memory-indexer.js";
import { MemoryStore } from "./memory-store.js";
import { MemorySync } from "../sync/memory-sync.js";
import { MemoryTimeline } from "../timeline/memory-timeline.js";
import { MemoryRetriever } from "../retrieval/memory-retriever.js";
import { MemoryEntry, MemoryType } from "../memory-types.js";

export class MemoryEngine {
  public store = new MemoryStore();
  public indexer = new MemoryIndexer(this.store);
  public retriever = new MemoryRetriever(this.store, this.indexer);
  public cache = new MemoryCache();
  public compressor = new MemoryCompressor(this.store);
  public sync = new MemorySync(this.store);
  public timeline = new MemoryTimeline(this.store);

  remember(entry: MemoryEntry) {
    this.store.add(entry);
    this.indexer.indexEntry(entry);
    this.cache.set(entry);
    return entry;
  }

  recall(id: string) {
    return this.cache.get(id) ?? this.retriever.recallById(id);
  }

  forget(id: string) {
    this.cache.clear();
    return this.store.remove(id);
  }

  compress(id: string) {
    const entry = this.store.get(id);
    if (!entry) {
      throw new Error(`Memory entry ${id} not found`);
    }
    return this.compressor.compress(entry);
  }

  merge(ids: string[]) {
    const entries = ids.map((id) => this.store.get(id)).filter((entry): entry is MemoryEntry => Boolean(entry));
    return this.compressor.merge(entries);
  }

  archive(id: string) {
    return this.store.archive(id);
  }

  share(id: string, owner: string) {
    const entry = this.store.get(id);
    if (!entry) {
      throw new Error(`Memory entry ${id} not found`);
    }
    const sharedEntry = {
      ...entry,
      visibility: "Public" as const,
      owner,
      updatedAt: new Date().toISOString()
    };
    this.store.update(sharedEntry);
    this.indexer.indexEntry(sharedEntry);
    this.cache.set(sharedEntry);
    return sharedEntry;
  }

  search(query: string) {
    return this.retriever.hybrid(query);
  }

  searchByTag(tag: string) {
    return this.retriever.recallByTag(tag);
  }

  searchByOwner(owner: string) {
    return this.retriever.recallByOwner(owner);
  }

  searchByTimeline(from?: string, to?: string) {
    return this.retriever.recallByTimeline(from, to);
  }

  listByType(type: MemoryType) {
    return this.store.listByType(type);
  }

  listRecent(count = 10) {
    return this.timeline.listRecent(count);
  }
}
