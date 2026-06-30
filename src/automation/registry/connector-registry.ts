import { AutomationConnector } from "../connectors/connector.js";

export class ConnectorRegistry {
  private connectors = new Map<string, AutomationConnector>();

  register(connector: AutomationConnector) {
    this.connectors.set(connector.id, connector);
  }

  get(id: string) {
    return this.connectors.get(id) ?? null;
  }

  list() {
    return Array.from(this.connectors.values());
  }
}
