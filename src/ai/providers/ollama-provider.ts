import { AIProvider, ChatResult, StreamResult, EmbedResult, HealthStatus } from "./provider.js";

export class OllamaProvider implements AIProvider {
  id = "ollama";
  name = "Ollama";

  async connect() {
    return;
  }

  async disconnect() {
    return;
  }

  async chat(prompt: string): Promise<ChatResult> {
    return { text: `Ollama mock answer for: ${prompt}` };
  }

  async stream(prompt: string): Promise<StreamResult> {
    async function* generator() {
      yield `Ollama streaming chunk for: ${prompt}`;
    }
    return { events: generator() };
  }

  async embed(inputs: string[]): Promise<EmbedResult> {
    return { vectors: inputs.map((input) => [1, 1, input.length]) };
  }

  async health(): Promise<HealthStatus> {
    return { healthy: true, details: "Ollama provider mock healthy" };
  }
}
