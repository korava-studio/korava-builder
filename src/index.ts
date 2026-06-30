import { CommandRegistry } from "./core/registry.js";
import { banner } from "./core/banner.js";
import { versionCommand } from "./commands/version.js";
import { createHelpCommand } from "./commands/help.js";
import { doctorCommand } from "./commands/doctor.js";
import { repairCommand } from "./commands/repair.js";
import { newCommand } from "./commands/new.js";

const registry = new CommandRegistry();

registry.register(versionCommand);
registry.register(createHelpCommand(registry));
registry.register(doctorCommand);
registry.register(repairCommand);
registry.register(newCommand);

async function main() {
  console.log(banner);

  const args = process.argv.slice(2);
  const commandName = args[0] ?? "help";
  const exitCode = await registry.execute(commandName, args.slice(1));
  process.exit(exitCode);
}

main();
