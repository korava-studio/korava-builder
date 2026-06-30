import { AIProvider } from "../providers/provider.js";

export class ProviderManager {
  private providers = new Map<string, AIProvider>();

  register(provider: AIProvider) {
    this.providers.set(provider.name.toLowerCase(), provider);
  }

  get(name: string) {
    return this.providers.get(name.toLowerCase());
  }

  list() {
    return Array.from(this.providers.values());
  }
}
