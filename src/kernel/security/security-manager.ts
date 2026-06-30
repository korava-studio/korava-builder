import { EventBus } from "../events/event-bus.js";
import { SecurityEngine } from "../../security/engine/security-engine.js";

export class SecurityManager {
  public engine: SecurityEngine;

  constructor(private bus: EventBus) {
    this.engine = new SecurityEngine(this.bus);
  }

  checkPermissions(subject: string, action: string) {
    const result = this.engine.authorization.authorize(subject, action, "kernel");
    return result.granted;
  }
}
