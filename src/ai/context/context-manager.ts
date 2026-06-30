export interface AIContextState {
  workspace: string;
  project: string;
  plugins: string[];
  workflow: string;
  task: string;
}

export class ContextManager {
  private state: AIContextState;

  constructor(initial?: Partial<AIContextState>) {
    this.state = {
      workspace: "",
      project: "",
      plugins: [],
      workflow: "",
      task: "",
      ...initial
    };
  }

  setWorkspace(value: string) {
    this.state.workspace = value;
  }

  setProject(value: string) {
    this.state.project = value;
  }

  setPlugins(value: string[]) {
    this.state.plugins = [...value];
  }

  setWorkflow(value: string) {
    this.state.workflow = value;
  }

  setTask(value: string) {
    this.state.task = value;
  }

  getContext() {
    return { ...this.state };
  }
}
