import { Agent } from "./agent.js";
import { AgentRegistry } from "../registry/agent-registry.js";
import { LifecycleManager } from "../lifecycle/lifecycle-manager.js";
import { CommunicationBus } from "../communication/communication-bus.js";
import { AgentScheduler } from "../scheduler/agent-scheduler.js";

export class AgentManager {
  private registry = new AgentRegistry();
  private lifecycle = new LifecycleManager();
  private scheduler = new AgentScheduler(this.registry);

  constructor(private bus: CommunicationBus) {}

  register(agent: Agent) {
    this.registry.register(agent);
  }

  boot(agentId: string) {
    const agent = this.registry.get(agentId);
    if (!agent) return null;
    this.lifecycle.boot(agent);
    return agent;
  }

  start(agentId: string) {
    const agent = this.registry.get(agentId);
    if (!agent) return null;
    this.lifecycle.start(agent);
    return agent;
  }

  pause(agentId: string) {
    const agent = this.registry.get(agentId);
    if (!agent) return null;
    this.lifecycle.pause(agent);
    return agent;
  }

  resume(agentId: string) {
    const agent = this.registry.get(agentId);
    if (!agent) return null;
    this.lifecycle.resume(agent);
    return agent;
  }

  stop(agentId: string) {
    const agent = this.registry.get(agentId);
    if (!agent) return null;
    this.lifecycle.stop(agent);
    return agent;
  }

  shutdown(agentId: string) {
    const agent = this.registry.get(agentId);
    if (!agent) return null;
    this.lifecycle.shutdown(agent);
    return agent;
  }

  schedule(entry: Parameters<AgentScheduler["enqueue"]>[0]) {
    this.scheduler.enqueue(entry);
  }

  next() {
    return this.scheduler.schedule();
  }

  list() {
    return this.registry.list();
  }
}
