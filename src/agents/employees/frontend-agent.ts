import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class FrontendAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "frontend",
      "Frontend Agent",
      AgentRole.Engineering,
      AgentDepartment.Engineering,
      "1.0.0",
      ["ui", "design"],
      new AgentPermissions(["filesystem", "workflow", "memory"]),
      new AgentMemory(),
      "architect",
      bus
    );
  }
}
