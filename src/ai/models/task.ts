export enum TaskStatus {
  Pending = "pending",
  Running = "running",
  Completed = "completed",
  Failed = "failed",
  Cancelled = "cancelled"
}

export interface TaskPlan {
  title: string;
  description: string;
  priority: number;
  estimateMinutes: number;
}

export interface TaskSpec {
  goal: string;
  prompt: string;
  provider: string;
}

export interface TaskRecord extends TaskPlan {
  id: string;
  status: TaskStatus;
  provider: string;
  createdAt: string;
  updatedAt: string;
  result?: string;
  error?: string;
  retries: number;
}
