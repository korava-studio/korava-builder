import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class ResearchAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "research",
      "Research Agent",
      AgentRole.Research,
      AgentDepartment.Research,
      "1.0.0",
      ["analysis", "innovation"],
      new AgentPermissions(["network", "workflow", "memory"]),
      new AgentMemory(),
      "cto",
      bus
    );
  }
}
