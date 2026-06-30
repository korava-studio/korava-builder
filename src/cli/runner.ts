import { CLICommand } from "./types.js";
import { Command, CommandRegistry } from "../core/registry.js";
import { CommandParser } from "./parser.js";
import { Logger } from "../core/logger.js";

export type RunnerCommand = CLICommand | Command;

export class CLIRunner {
  private registry = new CommandRegistry();
  private parser = new CommandParser();

  constructor() {}

  register(command: RunnerCommand) {
    if ("execute" in command) {
      this.registry.register({
        name: command.name,
        aliases: [],
        description: command.description,
        run: (args: string[]) => command.execute(args)
      });
      return;
    }

    this.registry.register(command);
  }

  listCommands() {
    return this.registry.list();
  }

  async run(argv: string[]) {
    const parsed = this.parser.parse(argv);
    Logger.info("CLI executing", parsed.command);
    return this.registry.execute(parsed.command, parsed.args);
  }
}
