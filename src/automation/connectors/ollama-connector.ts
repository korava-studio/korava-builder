import { AutomationConnector } from "./connector.js";

export class OllamaConnector implements AutomationConnector {
  id = "ollama";
  name = "Ollama";
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
    return { success: true, output: `Ollama connector simulated: ${task}` };
  }

  async validate() {
    return true;
  }
}
