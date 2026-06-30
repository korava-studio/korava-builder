import { AIProvider, ChatResult, StreamResult, EmbedResult, HealthStatus } from "./provider.js";

export class ClaudeProvider implements AIProvider {
  name = "Claude";

  async connect() {
    return;
  }

  async chat(prompt: string): Promise<ChatResult> {
    return { text: `Claude mock reply for: ${prompt}` };
  }

  async stream(prompt: string): Promise<StreamResult> {
    async function* generator() {
      yield `Claude stream event for: ${prompt}`;
    }
    return { events: generator() };
  }

  async embed(inputs: string[]): Promise<EmbedResult> {
    return { vectors: inputs.map((input) => [input.length, 0, 1]) };
  }

  async health(): Promise<HealthStatus> {
    return { healthy: true, details: "Claude provider mock healthy" };
  }
}
