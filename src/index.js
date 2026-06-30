"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registry_1 = require("./core/registry");
const version_1 = require("./commands/version");
const registry = new registry_1.CommandRegistry();
registry.register(version_1.versionCommand);
const args = process.argv.slice(2);
const command = args[0];
if (!command) {
    console.log("No command provided.");
    process.exit(0);
}
registry.execute(command, args.slice(1));
//# sourceMappingURL=index.js.map