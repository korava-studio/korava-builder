import { AIProvider, ChatResult, StreamResult, EmbedResult, HealthStatus } from "./provider.js";

export class QwenProvider implements AIProvider {
  name = "Qwen";

  async connect() {
    return;
  }

  async chat(prompt: string): Promise<ChatResult> {
    return { text: `Qwen mock output for: ${prompt}` };
  }

  async stream(prompt: string): Promise<StreamResult> {
    async function* generator() {
      yield `Qwen stream output for: ${prompt}`;
    }
    return { events: generator() };
  }

  async embed(inputs: string[]): Promise<EmbedResult> {
    return { vectors: inputs.map((input) => [input.length, input.length, input.length]) };
  }

  async health(): Promise<HealthStatus> {
    return { healthy: true, details: "Qwen provider mock healthy" };
  }
}
