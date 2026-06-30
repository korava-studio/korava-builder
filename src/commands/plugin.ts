import { Command } from "../core/registry.js";
import { PluginManager } from "../plugins/PluginManager.js";
import * as path from "path";
import { Logger } from "../core/logger.js";

const pluginRoot = path.resolve(process.cwd(), "plugins");
const manager = new PluginManager(pluginRoot);
manager.loadAll();

export const pluginCommand: Command = {
  name: "plugin",
  aliases: [],
  description: "Manage plugins (list|install|remove|enable|disable|reload)",
  run(args: string[]) {
    const sub = args[0] ?? "list";

    try {
      if (sub === "list") {
        const list = manager.list();
        console.log("");
        console.log("Installed plugins");
        console.log("--------------");
        for (const p of list) {
          console.log(`${p.manifest.id.padEnd(20)} ${p.manifest.version.padEnd(8)} ${p.manifest.name.padEnd(18)} ${p.enabled ? "enabled" : "disabled"}`);
        }
        return 0;
      }

      if (sub === "install") {
        const src = args[1];
        if (!src) {
          Logger.error("Usage: plugin install <path>");
          return 1;
        }
        manager.install(path.resolve(process.cwd(), src));
        return 0;
      }

      if (sub === "remove") {
        const id = args[1];
        if (!id) return 1;
        manager.uninstall(id);
        return 0;
      }

      if (sub === "enable") {
        const id = args[1];
        if (!id) return 1;
        manager.enable(id);
        return 0;
      }

      if (sub === "disable") {
        const id = args[1];
        if (!id) return 1;
        manager.disable(id);
        return 0;
      }

      if (sub === "reload") {
        manager.reload(args[1]);
        return 0;
      }

      Logger.error(`Unknown plugin command: ${sub}`);
      return 1;
    } catch (err) {
      Logger.error("Plugin command failed:", (err as Error).message);
      return 1;
    }
  }
};
