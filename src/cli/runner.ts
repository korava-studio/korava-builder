import { CLICommand } from "./types.js";
import * as path from "path";
import { CommandRegistry } from "../core/registry.js";
import { CommandParser } from "./parser.js";
import { Logger } from "../core/logger.js";

export class CLIRunner {
  private registry = new CommandRegistry();
  private parser = new CommandParser();

  constructor() {}

  register(command: CLICommand) {
    this.registry.register({
      name: command.name,
      aliases: [],
      description: command.description,
      run: (args: string[]) => command.execute(args)
    });
  }

  async run(argv: string[]) {
    const parsed = this.parser.parse(argv);
    Logger.info("CLI executing", parsed.command);
    return this.registry.execute(parsed.command, parsed.args);
  }
}
