import { AutomationConnector } from "./connector.js";

export class GmailConnector implements AutomationConnector {
  id = "gmail";
  name = "Gmail";
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
    return { success: true, output: `Gmail connector executed: ${task}` };
  }

  async validate() {
    return true;
  }
}
