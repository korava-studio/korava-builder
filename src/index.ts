import { CommandRegistry } from "./core/registry";
import { versionCommand } from "./commands/version";

const registry = new CommandRegistry();

registry.register(versionCommand);

const args = process.argv.slice(2);

const command = args[0];

if (!command) {
    console.log("No command provided.");
    process.exit(0);
}

registry.execute(command, args.slice(1));