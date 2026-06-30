import { AutomationConnector } from "./connector.js";

export class LinearConnector implements AutomationConnector {
  id = "linear";
  name = "Linear";
  version = "1.0.0";

  async health() {
    return { healthy: true };
  }

  async connect() {
    return;
  }

  async disconnect() {
    return;
  }

  async execute(task: string) {
    return { success: true, output: `Linear task processed: ${task}` };
  }

  async validate() {
    return true;
  }
}
