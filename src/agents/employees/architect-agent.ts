import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class ArchitectAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "architect",
      "Architect Agent",
      AgentRole.Engineering,
      AgentDepartment.Engineering,
      "1.0.0",
      ["design", "roadmap"],
      new AgentPermissions(["workflow", "plugins", "memory"]),
      new AgentMemory(),
      "cto",
      bus
    );
  }
}
