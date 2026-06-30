import { AutomationJob, JobStatus } from "./job-types.js";

export class JobQueue {
  private jobs = new Map<string, AutomationJob>();

  enqueue(job: AutomationJob) {
    this.jobs.set(job.id, job);
  }

  dequeue() {
    return Array.from(this.jobs.values()).find((job) => job.status === JobStatus.Pending) ?? null;
  }

  update(job: AutomationJob) {
    this.jobs.set(job.id, job);
  }

  remove(id: string) {
    return this.jobs.delete(id);
  }

  find(id: string) {
    return this.jobs.get(id) ?? null;
  }

  list() {
    return Array.from(this.jobs.values());
  }

  clear() {
    this.jobs.clear();
  }

  size() {
    return this.jobs.size;
  }
}
