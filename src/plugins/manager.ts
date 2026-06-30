import * as path from "path";
import { PluginLoader } from "./loader.js";
import { PluginSpec } from "./types.js";
import { Logger } from "../core/logger.js";
import { Command } from "../core/registry.js";

export class PluginManager {
  private plugins: PluginSpec[] = [];

  constructor(private pluginsRoot: string) {}

  loadAll() {
    const loader = new PluginLoader(this.pluginsRoot);
    this.plugins = loader.scan();

    if (this.plugins.length === 0) {
      Logger.warn("No valid plugins found in", this.pluginsRoot);
    } else {
      Logger.info("Detected plugins", this.plugins.map((plugin) => plugin.manifest.name).join(", "));
    }

    return this.plugins;
  }

  registerCommands(registry: { register(command: Command): void }) {
    for (const plugin of this.plugins) {
      for (const commandName of plugin.manifest.commands) {
        registry.register({
          name: commandName,
          aliases: [],
          description: `Plugin command from ${plugin.manifest.name}`,
          run: () => {
            Logger.info(`Running plugin command ${commandName}`);
            console.log(`Plugin ${plugin.manifest.name} v${plugin.manifest.version} executed.`);
            return 0;
          }
        });
      }
    }
  }

  getInstalledPlugins() {
    return this.plugins.map((plugin) => plugin.manifest);
  }
}
