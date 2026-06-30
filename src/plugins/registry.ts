import { Command } from "../core/registry.js";

export interface PluginRegistry {
  register(command: Command): void;
}
