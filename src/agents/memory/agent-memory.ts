export interface MemoryRecord {
  shortTerm: string[];
  longTerm: string[];
  shared: string[];
  workspace: string[];
}

export class AgentMemory {
  private record: MemoryRecord = {
    shortTerm: [],
    longTerm: [],
    shared: [],
    workspace: []
  };

  writeShortTerm(entry: string) {
    this.record.shortTerm.push(entry);
  }

  writeLongTerm(entry: string) {
    this.record.longTerm.push(entry);
  }

  writeShared(entry: string) {
    this.record.shared.push(entry);
  }

  writeWorkspace(entry: string) {
    this.record.workspace.push(entry);
  }

  readShortTerm() {
    return [...this.record.shortTerm];
  }

  readLongTerm() {
    return [...this.record.longTerm];
  }

  readShared() {
    return [...this.record.shared];
  }

  readWorkspace() {
    return [...this.record.workspace];
  }

  snapshot() {
    return { ...this.record };
  }
}
