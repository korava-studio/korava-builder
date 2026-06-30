import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class CEOAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "ceo",
      "CEO Agent",
      AgentRole.Executive,
      AgentDepartment.Executive,
      "1.0.0",
      ["strategy", "alignment"],
      new AgentPermissions(["workflow", "plugins", "memory"]),
      new AgentMemory(),
      undefined,
      bus
    );
  }
}
