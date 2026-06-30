import { EventBus } from "../../kernel/events/event-bus.js";

export interface AuditRecord {
  actor: string;
  action: string;
  resource: string;
  status: string;
  details: string;
  timestamp: string;
}

export class AuditManager {
  private records: AuditRecord[] = [];

  constructor(private bus: EventBus) {}

  record(actor: string, action: string, resource: string, status: string, details: string) {
    const entry: AuditRecord = {
      actor,
      action,
      resource,
      status,
      details,
      timestamp: new Date().toISOString()
    };
    this.records.push(entry);
    this.bus.emit("audit.recorded", entry).catch(() => undefined);
    return entry;
  }

  list() {
    return [...this.records];
  }
}
