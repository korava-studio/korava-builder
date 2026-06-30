"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRegistry = void 0;
class CommandRegistry {
    commands = new Map();
    register(command) {
        this.commands.set(command.name, command);
    }
    execute(name, args) {
        const command = this.commands.get(name);
        if (!command) {
            console.log(`Unknown command: ${name}`);
            return;
        }
        command.run(args);
    }
    list() {
        return [...this.commands.values()];
    }
}
exports.CommandRegistry = CommandRegistry;
//# sourceMappingURL=registry.js.map