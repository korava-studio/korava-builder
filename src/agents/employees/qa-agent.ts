import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class QAAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "qa",
      "QA Agent",
      AgentRole.Engineering,
      AgentDepartment.Engineering,
      "1.0.0",
      ["testing", "verification"],
      new AgentPermissions(["workflow", "memory"]),
      new AgentMemory(),
      "architect",
      bus
    );
  }
}
