import { TaskRecord, TaskSpec, TaskStatus } from "../models/task.js";

export class TaskQueue {
  private tasks = new Map<string, TaskRecord>();

  enqueue(spec: TaskSpec): TaskRecord {
    const now = new Date().toISOString();
    const id = `task-${Math.random().toString(36).slice(2, 10)}`;
    const record: TaskRecord = {
      id,
      title: spec.goal,
      description: spec.prompt,
      priority: 1,
      estimateMinutes: 1,
      status: TaskStatus.Pending,
      createdAt: now,
      updatedAt: now,
      provider: spec.provider,
      retries: 0
    } as TaskRecord;
    this.tasks.set(id, record);
    return record;
  }

  start(id: string): TaskRecord | null {
    const task = this.tasks.get(id);
    if (!task || task.status !== TaskStatus.Pending) return null;
    task.status = TaskStatus.Running;
    task.updatedAt = new Date().toISOString();
    return task;
  }

  complete(id: string, result: string): TaskRecord | null {
    const task = this.tasks.get(id);
    if (!task) return null;
    task.status = TaskStatus.Completed;
    task.result = result;
    task.updatedAt = new Date().toISOString();
    return task;
  }

  fail(id: string, error: string): TaskRecord | null {
    const task = this.tasks.get(id);
    if (!task) return null;
    task.status = TaskStatus.Failed;
    task.error = error;
    task.updatedAt = new Date().toISOString();
    return task;
  }

  cancel(id: string): TaskRecord | null {
    const task = this.tasks.get(id);
    if (!task) return null;
    task.status = TaskStatus.Cancelled;
    task.updatedAt = new Date().toISOString();
    return task;
  }

  retry(id: string): TaskRecord | null {
    const task = this.tasks.get(id);
    if (!task || task.status !== TaskStatus.Failed) return null;
    task.status = TaskStatus.Pending;
    task.retries += 1;
    task.updatedAt = new Date().toISOString();
    return task;
  }

  list() {
    return Array.from(this.tasks.values());
  }
}
