import { Agent } from "../core/agent.js";
import { AgentStatus } from "../core/agent.js";

export class LifecycleManager {
  boot(agent: Agent) {
    agent.boot();
  }

  start(agent: Agent) {
    agent.start();
  }

  pause(agent: Agent) {
    agent.pause();
  }

  resume(agent: Agent) {
    agent.resume();
  }

  stop(agent: Agent) {
    agent.stop();
  }

  shutdown(agent: Agent) {
    agent.shutdown();
  }

  isActive(agent: Agent) {
    return agent.status === AgentStatus.Running;
  }
}
