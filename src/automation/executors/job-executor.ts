import { AutomationConnector } from "../connectors/connector.js";
import { AutomationJob, JobStatus } from "../jobs/job-types.js";
import { AutomationEvents } from "../events/automation-events.js";
import { EventBus } from "../../kernel/events/event-bus.js";

export class JobExecutor {
  constructor(private bus: EventBus) {}

  async execute(connector: AutomationConnector, job: AutomationJob) {
    job.status = JobStatus.Running;
    job.updatedAt = new Date().toISOString();
    await this.bus.emit(AutomationEvents.JOB_STARTED, job);
    const start = Date.now();
    try {
      await connector.connect();
      const result = await connector.execute(job.task, job.payload);
      await connector.disconnect();
      job.status = result.success ? JobStatus.Completed : JobStatus.Failed;
      job.error = result.error;
      job.durationMs = Date.now() - start;
      job.updatedAt = new Date().toISOString();
      await this.bus.emit(AutomationEvents.JOB_FINISHED, job);
      return job;
    } catch (err) {
      job.status = JobStatus.Failed;
      job.error = (err as Error).message;
      job.durationMs = Date.now() - start;
      job.updatedAt = new Date().toISOString();
      await this.bus.emit(AutomationEvents.JOB_FINISHED, job);
      return job;
    }
  }
}
