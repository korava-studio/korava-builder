import { AIProvider, ChatResult, StreamResult, EmbedResult, HealthStatus, ProviderOptions } from "./provider.js";

export class OpenAIProvider implements AIProvider {
  name = "OpenAI";

  async connect() {
    return;
  }

  async chat(prompt: string): Promise<ChatResult> {
    return { text: `OpenAI simulated response to: ${prompt}` };
  }

  async stream(prompt: string): Promise<StreamResult> {
    async function* generator() {
      yield `OpenAI streaming response for: ${prompt}`;
    }
    return { events: generator() };
  }

  async embed(inputs: string[]): Promise<EmbedResult> {
    return { vectors: inputs.map((input) => Array.from({ length: 3 }, () => input.length)) };
  }

  async health(): Promise<HealthStatus> {
    return { healthy: true, details: "OpenAI provider mock healthy" };
  }
}
