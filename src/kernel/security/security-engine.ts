import { EventBus } from "../events/event-bus.js";
import { SecurityEngine } from "../../security/engine/security-engine.js";

export class KernelSecurityEngine {
  public engine: SecurityEngine;

  constructor(private bus: EventBus) {
    this.engine = new SecurityEngine(bus);
  }
}
