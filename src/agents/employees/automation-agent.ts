import { Agent, AgentRole, AgentDepartment } from "../core/agent.js";
import { AgentPermissions } from "../permissions/agent-permissions.js";
import { AgentMemory } from "../memory/agent-memory.js";
import { CommunicationBus } from "../communication/communication-bus.js";

export class AutomationAgent extends Agent {
  constructor(bus: CommunicationBus) {
    super(
      "automation",
      "Automation Agent",
      AgentRole.Automation,
      AgentDepartment.Automation,
      "1.0.0",
      ["orchestration", "scripting"],
      new AgentPermissions(["filesystem", "workflow", "memory"]),
      new AgentMemory(),
      "cto",
      bus
    );
  }
}
