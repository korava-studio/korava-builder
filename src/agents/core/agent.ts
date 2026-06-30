import { AgentMemory } from "../memory/agent-memory.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export enum AgentStatus {
  Registered = "registered",
  Booting = "booting",
  Running = "running",
  Paused = "paused",
  Stopped = "stopped",
  Shutdown = "shutdown"
}

export enum AgentRole {
  Executive = "Executive",
  Engineering = "Engineering",
  Research = "Research",
  Automation = "Automation",
  Security = "Security",
  Finance = "Finance",
  Marketing = "Marketing",
  Legal = "Legal",
  HR = "HR"
}

export enum AgentDepartment {
  Executive = "Executive",
  Engineering = "Engineering",
  Research = "Research",
  Automation = "Automation",
  Security = "Security",
  Finance = "Finance",
  Marketing = "Marketing",
  Legal = "Legal",
  HR = "HR"
}

export interface AgentSummary {
  id: string;
  name: string;
  role: AgentRole;
  department: AgentDepartment;
  status: AgentStatus;
  version: string;
}

export class Agent {
  public status = AgentStatus.Registered;
  public skills: string[];
  public goals: string[] = [];
  public kpis: string[] = [];

  constructor(
    public id: string,
    public name: string,
    public role: AgentRole,
    public department: AgentDepartment,
    public version: string,
    skills: string[],
    public permissions: AgentPermissions,
    public memory: AgentMemory,
    public reportsTo?: string,
    private bus?: CommunicationBus
  ) {
    this.skills = [...skills];
  }

  register() {
    this.status = AgentStatus.Registered;
    return this;
  }

  boot() {
    this.setStatus(AgentStatus.Booting);
    this.bus?.event("agent.boot", { agentId: this.id });
    return this;
  }

  start() {
    this.setStatus(AgentStatus.Running);
    this.bus?.event("agent.start", { agentId: this.id });
    return this;
  }

  pause() {
    if (this.status === AgentStatus.Running) {
      this.setStatus(AgentStatus.Paused);
      this.bus?.event("agent.pause", { agentId: this.id });
    }
    return this;
  }

  resume() {
    if (this.status === AgentStatus.Paused) {
      this.setStatus(AgentStatus.Running);
      this.bus?.event("agent.resume", { agentId: this.id });
    }
    return this;
  }

  stop() {
    this.setStatus(AgentStatus.Stopped);
    this.bus?.event("agent.stop", { agentId: this.id });
    return this;
  }

  shutdown() {
    this.setStatus(AgentStatus.Shutdown);
    this.bus?.event("agent.shutdown", { agentId: this.id });
    return this;
  }

  send(targetId: string, payload: unknown) {
    this.bus?.send(this.id, targetId, payload);
  }

  broadcast(payload: unknown) {
    this.bus?.broadcast(this.id, payload);
  }

  request(targetId: string, payload: unknown) {
    return this.bus?.request(this.id, targetId, payload);
  }

  protected setStatus(status: AgentStatus) {
    this.status = status;
  }

  getSummary(): AgentSummary {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      department: this.department,
      status: this.status,
      version: this.version
    };
  }
}
