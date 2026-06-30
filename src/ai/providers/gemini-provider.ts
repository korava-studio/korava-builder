import { AIProvider, ChatResult, StreamResult, EmbedResult, HealthStatus } from "./provider.js";

export class GeminiProvider implements AIProvider {
  id = "gemini";
  name = "Gemini";

  async connect() {
    return;
  }

  async disconnect() {
    return;
  }

  async chat(prompt: string): Promise<ChatResult> {
    return { text: `Gemini simulated answer for: ${prompt}` };
  }

  async stream(prompt: string): Promise<StreamResult> {
    async function* generator() {
      yield `Gemini stream payload for: ${prompt}`;
    }
    return { events: generator() };
  }

  async embed(inputs: string[]): Promise<EmbedResult> {
    return { vectors: inputs.map((input) => [1, input.length, 0]) };
  }

  async health(): Promise<HealthStatus> {
    return { healthy: true, details: "Gemini provider mock healthy" };
  }
}
