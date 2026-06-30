import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class SecurityAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "security",
      "Security Agent",
      AgentRole.Security,
      AgentDepartment.Security,
      "1.0.0",
      ["audit", "protection"],
      new AgentPermissions(["filesystem", "network", "workflow", "memory"]),
      new AgentMemory(),
      "cto",
      bus
    );
  }
}
