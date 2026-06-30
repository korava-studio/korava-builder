import { AutomationConnector } from "./connector.js";

export class NotionConnector implements AutomationConnector {
  id = "notion";
  name = "Notion";
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
    return { success: true, output: `Notion task executed: ${task}` };
  }

  async validate() {
    return true;
  }
}
