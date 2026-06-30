export interface ProviderOptions {
  model?: string;
}

export interface ChatResult {
  text: string;
}

export interface StreamResult {
  events: AsyncIterable<string>;
}

export interface EmbedResult {
  vectors: number[][];
}

export interface HealthStatus {
  healthy: boolean;
  details?: string;
}

export interface AIProvider {
  name: string;
  connect(): Promise<void>;
  chat(prompt: string, options?: ProviderOptions): Promise<ChatResult>;
  stream(prompt: string, options?: ProviderOptions): Promise<StreamResult>;
  embed(inputs: string[], options?: ProviderOptions): Promise<EmbedResult>;
  health(): Promise<HealthStatus>;
}
