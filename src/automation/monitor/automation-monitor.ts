import { AutomationJob } from "../jobs/job-types.js";

export class AutomationMonitor {
  private records: AutomationJob[] = [];

  capture(job: AutomationJob) {
    this.records.push(job);
  }

  list() {
    return [...this.records];
  }

  failed() {
    return this.records.filter((job) => job.status === "failed");
  }

  recent() {
    return this.records.slice(-10);
  }
}
