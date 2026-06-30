import { AIProvider, ChatResult, StreamResult, EmbedResult, HealthStatus } from "./provider.js";

export class DeepSeekProvider implements AIProvider {
  id = "deepseek";
  name = "DeepSeek";

  async connect() {
    return;
  }

  async disconnect() {
    return;
  }

  async chat(prompt: string): Promise<ChatResult> {
    return { text: `DeepSeek mock response for: ${prompt}` };
  }

  async stream(prompt: string): Promise<StreamResult> {
    async function* generator() {
      yield `DeepSeek event for: ${prompt}`;
    }
    return { events: generator() };
  }

  async embed(inputs: string[]): Promise<EmbedResult> {
    return { vectors: inputs.map((input) => [0, 1, input.length]) };
  }

  async health(): Promise<HealthStatus> {
    return { healthy: true, details: "DeepSeek provider mock healthy" };
  }
}
