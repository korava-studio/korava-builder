export const AutomationEvents = {
  CONNECTOR_CONNECTED: "connector.connected",
  CONNECTOR_FAILED: "connector.failed",
  JOB_STARTED: "job.started",
  JOB_FINISHED: "job.finished",
  WORKFLOW_EXECUTED: "workflow.executed"
} as const;

export type AutomationEvent = typeof AutomationEvents[keyof typeof AutomationEvents];
