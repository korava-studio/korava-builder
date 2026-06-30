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

  list() {
    return Array.from(this.jobs.values());
  }
}
