import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class BackendAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "backend",
      "Backend Agent",
      AgentRole.Engineering,
      AgentDepartment.Engineering,
      "1.0.0",
      ["api", "integration"],
      new AgentPermissions(["filesystem", "workflow", "memory"]),
      new AgentMemory(),
      "architect",
      bus
    );
  }
}
