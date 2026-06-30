import { ImportanceLevel, MemoryEntry, MemoryType, Visibility } from "../memory-types.js";

export class MemoryStore {
  private entries = new Map<string, MemoryEntry>();

  add(entry: MemoryEntry) {
    if (this.entries.has(entry.id)) {
      throw new Error(`Memory entry ${entry.id} already exists`);
    }
    this.entries.set(entry.id, { ...entry });
  }

  update(entry: Partial<MemoryEntry> & { id: string }) {
    const existing = this.entries.get(entry.id);
    if (!existing) {
      throw new Error(`Memory entry ${entry.id} not found`);
    }
    const updated: MemoryEntry = {
      ...existing,
      ...entry,
      tags: entry.tags ? [...entry.tags] : existing.tags,
      updatedAt: new Date().toISOString()
    };
    this.entries.set(entry.id, updated);
    return updated;
  }

  get(id: string) {
    return this.entries.get(id) ?? null;
  }

  remove(id: string) {
    return this.entries.delete(id);
  }

  list() {
    return Array.from(this.entries.values());
  }

  exists(id: string) {
    return this.entries.has(id);
  }

  searchByTag(tag: string) {
    return this.list().filter((entry) => entry.tags.includes(tag));
  }

  listByType(type: MemoryType) {
    return this.list().filter((entry) => entry.type === type);
  }

  listByOwner(owner: string) {
    return this.list().filter((entry) => entry.owner === owner);
  }

  listByImportance(level: ImportanceLevel) {
    return this.list().filter((entry) => entry.importance === level);
  }

  archive(id: string) {
    const entry = this.get(id);
    if (!entry) {
      return null;
    }
    const archived: MemoryEntry = {
      ...entry,
      archived: true,
      updatedAt: new Date().toISOString()
    };
    this.entries.set(id, archived);
    return archived;
  }

  clear() {
    this.entries.clear();
  }
}
