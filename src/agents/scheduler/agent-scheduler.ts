import { Agent } from "../core/agent.js";
import { AgentRegistry } from "../registry/agent-registry.js";
import { AgentStatus } from "../core/agent.js";

export interface ScheduleEntry {
  agentId: string;
  priority: number;
  retry: number;
  timeoutMs: number;
  dependencies: string[];
}

export class AgentScheduler {
  private queue: ScheduleEntry[] = [];

  constructor(private registry: AgentRegistry) {}

  enqueue(entry: ScheduleEntry) {
    this.queue.push(entry);
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  dequeue() {
    return this.queue.shift() ?? null;
  }

  schedule() {
    const next = this.dequeue();
    if (!next) return null;
    const agent = this.registry.get(next.agentId);
    if (!agent) return null;
    if (next.dependencies.some((id) => this.registry.get(id)?.status !== AgentStatus.Running)) {
      this.enqueue(next);
      return null;
    }
    return agent;
  }

  listPending() {
    return [...this.queue];
  }
}
