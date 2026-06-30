export enum JobStatus {
  Pending = "pending",
  Running = "running",
  Completed = "completed",
  Failed = "failed",
  Cancelled = "cancelled"
}

export interface AutomationJob {
  id: string;
  connectorId: string;
  task: string;
  payload?: unknown;
  status: JobStatus;
  retries: number;
  createdAt: string;
  updatedAt: string;
  error?: string;
  durationMs?: number;
}
