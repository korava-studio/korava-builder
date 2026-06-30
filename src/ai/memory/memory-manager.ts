export interface MemorySnapshot {
  timestamp: string;
  context: string;
}

export class MemoryManager {
  private snapshot: MemorySnapshot | null = null;

  capture(context: string) {
    this.snapshot = { timestamp: new Date().toISOString(), context };
  }

  getSnapshot() {
    return this.snapshot;
  }
}
