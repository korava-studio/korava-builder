import { MemoryEntry } from "../memory-types.js";
import { MemoryStore } from "../core/memory-store.js";

export class MemorySync {
  constructor(private store: MemoryStore) {}

  syncEmployees(entries: MemoryEntry[]) {
    this.sync(entries);
  }

  syncKnowledgeGraph(entries: MemoryEntry[]) {
    this.sync(entries);
  }

  syncProjects(entries: MemoryEntry[]) {
    this.sync(entries);
  }

  syncCompanyBrain(entries: MemoryEntry[]) {
    this.sync(entries);
  }

  private sync(entries: MemoryEntry[]) {
    entries.forEach((entry) => {
      if (!this.store.exists(entry.id)) {
        this.store.add(entry);
      } else {
        this.store.update({ id: entry.id, summary: entry.summary, tags: entry.tags, content: entry.content });
      }
    });
  }
}
