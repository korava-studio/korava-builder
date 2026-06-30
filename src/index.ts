import { CommandRegistry } from "./core/registry.js";

import { versionCommand } from "./commands/version.js";
import { newCommand } from "./commands/new.js";

const registry = new CommandRegistry();

registry.register(versionCommand);
registry.register(newCommand);

const args = process.argv.slice(2);

const command = args[0];

if (!command) {
    console.log("No command provided.");
    process.exit(0);
}

registry.execute(command, args.slice(1));