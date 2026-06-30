import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class ReviewerAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "reviewer",
      "Reviewer Agent",
      AgentRole.Engineering,
      AgentDepartment.Engineering,
      "1.0.0",
      ["review", "audit"],
      new AgentPermissions(["workflow", "memory"]),
      new AgentMemory(),
      "architect",
      bus
    );
  }
}
