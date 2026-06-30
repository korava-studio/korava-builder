import { Command } from "../core/registry.js";
import { PluginManager } from "../plugins/manager.js";
import { Logger } from "../core/logger.js";

export function createPluginsCommand(manager: PluginManager): Command {
  return {
    name: "plugins",
    aliases: [],
    description: "Show installed plugins and status",
    run() {
      const installed = manager.getInstalledPlugins();

      console.log("");
      console.log("Installed plugins");
      console.log("--------------");

      if (installed.length === 0) {
        console.log("No plugins installed.");
        return 0;
      }

      for (const plugin of installed) {
        console.log(`${plugin.name.padEnd(18)} ${plugin.version.padEnd(10)} ${plugin.author}`);
      }

      console.log("");
      Logger.success("Build Status", "Sprint 4 Complete");
      return 0;
    }
  };
}
