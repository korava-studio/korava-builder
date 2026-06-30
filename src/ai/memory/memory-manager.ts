export interface MemorySnapshot {
  timestamp: string;
  conversation: string;
  workspace: string;
  project: string;
  shared: string;
}

export class MemoryManager {
  private snapshot: MemorySnapshot | null = null;

  captureConversation(text: string) {
    this.snapshot = {
      timestamp: new Date().toISOString(),
      conversation: text,
      workspace: "",
      project: "",
      shared: ""
    };
  }

  updateWorkspace(value: string) {
    if (!this.snapshot) this.captureConversation("");
    this.snapshot!.workspace = value;
  }

  updateProject(value: string) {
    if (!this.snapshot) this.captureConversation("");
    this.snapshot!.project = value;
  }

  updateShared(value: string) {
    if (!this.snapshot) this.captureConversation("");
    this.snapshot!.shared = value;
  }

  getSnapshot() {
    return this.snapshot;
  }
}
