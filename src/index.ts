import * as path from "path";
import { CommandRegistry } from "./core/registry.js";
import { banner } from "./core/banner.js";
import { versionCommand } from "./commands/version.js";
import { createHelpCommand } from "./commands/help.js";
import { doctorCommand } from "./commands/doctor.js";
import { repairCommand } from "./commands/repair.js";
import { newCommand } from "./commands/new.js";
import { createPluginsCommand } from "./commands/plugins.js";
import { PluginManager } from "./plugins/manager.js";

const registry = new CommandRegistry();
const pluginRoot = path.resolve(process.cwd(), "plugins");
const pluginManager = new PluginManager(pluginRoot);

registry.register(versionCommand);
registry.register(createHelpCommand(registry));
registry.register(doctorCommand);
registry.register(repairCommand);
registry.register(newCommand);
registry.register(createPluginsCommand(pluginManager));

pluginManager.loadAll();
pluginManager.registerCommands(registry);

async function main() {
  console.log(banner);

  const args = process.argv.slice(2);
  const commandName = args[0] ?? "help";
  const exitCode = await registry.execute(commandName, args.slice(1));
  process.exit(exitCode);
}

main();
