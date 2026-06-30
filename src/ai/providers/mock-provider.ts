import { AIProvider, ChatResult, StreamResult, EmbedResult, HealthStatus } from "./provider.js";

export class MockProvider implements AIProvider {
  name = "Mock";

  async connect() {
    return;
  }

  async chat(prompt: string): Promise<ChatResult> {
    return { text: `Mock response for: ${prompt}` };
  }

  async stream(prompt: string): Promise<StreamResult> {
    async function* generator() {
      yield `Mock stream for: ${prompt}`;
    }
    return { events: generator() };
  }

  async embed(inputs: string[]): Promise<EmbedResult> {
    return { vectors: inputs.map((input) => [0, 0, input.length]) };
  }

  async health(): Promise<HealthStatus> {
    return { healthy: true, details: "Mock provider healthy" };
  }
}
