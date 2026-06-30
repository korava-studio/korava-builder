export interface ConnectorOptions {
  endpoint?: string;
  apiKey?: string;
  [key: string]: unknown;
}

export interface HealthStatus {
  healthy: boolean;
  details?: string;
}

export interface ConnectorResult {
  success: boolean;
  output?: string;
  error?: string;
}

export interface AutomationConnector {
  id: string;
  name: string;
  version: string;
  health(): Promise<HealthStatus>;
  connect(options?: ConnectorOptions): Promise<void>;
  disconnect(): Promise<void>;
  execute(task: string, payload?: unknown): Promise<ConnectorResult>;
  validate(): Promise<boolean>;
}
