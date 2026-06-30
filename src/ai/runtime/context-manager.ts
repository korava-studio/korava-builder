export interface ContextWindow {
  system: string;
  developer: string;
  workspace: string;
  project: string;
  user: string;
  task: string;
}

export class ContextManager {
  private window: ContextWindow;

  constructor(window?: Partial<ContextWindow>) {
    this.window = {
      system: "",
      developer: "",
      workspace: "",
      project: "",
      user: "",
      task: "",
      ...window
    };
  }

  setSystem(value: string) {
    this.window.system = value;
  }

  setDeveloper(value: string) {
    this.window.developer = value;
  }

  setWorkspace(value: string) {
    this.window.workspace = value;
  }

  setProject(value: string) {
    this.window.project = value;
  }

  setUser(value: string) {
    this.window.user = value;
  }

  setTask(value: string) {
    this.window.task = value;
  }

  getWindow() {
    return { ...this.window };
  }
}
