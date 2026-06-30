import { JobQueue } from "../jobs/job-queue.js";
import { JobStatus } from "../jobs/job-types.js";

export type SchedulerMode = "cron" | "manual" | "event" | "webhook" | "workflow";

export class AutomationScheduler {
  constructor(private queue: JobQueue) {}

  next() {
    return this.queue.dequeue();
  }

  schedule(jobId: string) {
    const job = this.queue.list().find((item) => item.id === jobId);
    if (!job || job.status !== JobStatus.Pending) return null;
    job.status = JobStatus.Pending;
    return job;
  }

  trigger(mode: SchedulerMode) {
    return this.queue.dequeue();
  }
}
