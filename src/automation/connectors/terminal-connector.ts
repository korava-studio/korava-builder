import { AutomationConnector } from "./connector.js";

export class TerminalConnector implements AutomationConnector {
  id = "terminal";
  name = "Terminal";
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
    return { success: true, output: `Terminal task simulated: ${task}` };
  }

  async validate() {
    return true;
  }
}
