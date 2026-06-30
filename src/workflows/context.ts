import { WorkflowConfig, WorkflowState } from "./types.js";

export class WorkflowContext {
  public state: WorkflowState;

  constructor(public config: WorkflowConfig) {
    this.state = {
      command: undefined,
      templateName: undefined,
      projectName: undefined,
      config: {},
      plugins: [],
      renderedFiles: [],
      generatedPaths: []
    };
  }

  setError(error: Error) {
    this.state.error = error;
  }
}
