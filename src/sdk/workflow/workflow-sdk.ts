import { WorkflowEngine } from "../../workflows/engine.js";

/** WorkflowSDK - exposes a simple execute API for commands */
export class WorkflowSDK {
  private engine = new WorkflowEngine();

  execute(commandName: string, args: string[]) {
    return this.engine.execute({ commandName, args });
  }
}
