import { EventBus } from "../../kernel/events/event-bus.js";
import { ConnectorRegistry } from "../registry/connector-registry.js";
import { JobQueue } from "../jobs/job-queue.js";
import { AutomationScheduler } from "../scheduler/automation-scheduler.js";
import { JobExecutor } from "../executors/job-executor.js";
import { AutomationMonitor } from "../monitor/automation-monitor.js";
import { AutomationConnector } from "../connectors/connector.js";
import { AutomationJob, JobStatus } from "../jobs/job-types.js";
import { AutomationEvents } from "../events/automation-events.js";

export class AutomationEngine {
  public connectors = new ConnectorRegistry();
  public queue = new JobQueue();
  public scheduler = new AutomationScheduler(this.queue);
  public executor: JobExecutor;
  public monitor = new AutomationMonitor();

  constructor(private bus: EventBus) {
    this.executor = new JobExecutor(bus);
  }

  registerConnector(connector: AutomationConnector) {
    this.connectors.register(connector);
  }

  async connectConnector(id: string) {
    const connector = this.connectors.get(id);
    if (!connector) throw new Error("Connector not found");
    try {
      await connector.connect();
      await this.bus.emit(AutomationEvents.CONNECTOR_CONNECTED, { connector: id });
      return true;
    } catch (err) {
      await this.bus.emit(AutomationEvents.CONNECTOR_FAILED, { connector: id, error: (err as Error).message });
      return false;
    }
  }

  enqueueJob(job: AutomationJob) {
    this.queue.enqueue(job);
  }

  async runNext() {
    const job = this.scheduler.next();
    if (!job) return null;
    const connector = this.connectors.get(job.connectorId);
    if (!connector) throw new Error("Connector not found");
    const result = await this.executor.execute(connector, job);
    this.monitor.capture(result);
    return result;
  }

  async submitJob(connectorId: string, task: string, payload?: unknown) {
    const now = new Date().toISOString();
    const job: AutomationJob = {
      id: `job-${Math.random().toString(36).slice(2, 10)}`,
      connectorId,
      task,
      payload,
      status: JobStatus.Pending,
      retries: 0,
      createdAt: now,
      updatedAt: now
    };
    this.enqueueJob(job);
    return job;
  }
}
