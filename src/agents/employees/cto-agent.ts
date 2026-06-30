import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class CTOAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "cto",
      "CTO Agent",
      AgentRole.Executive,
      AgentDepartment.Engineering,
      "1.0.0",
      ["architecture", "technicalLeadership"],
      new AgentPermissions(["filesystem", "workflow", "plugins", "memory"]),
      new AgentMemory(),
      "ceo",
      bus
    );
  }
}
