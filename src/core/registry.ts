import { Logger } from "./logger.js";

export interface Command {
  name: string;
  description: string;
  aliases: string[];
  run(args: string[]): Promise<number> | number;
}

export class CommandRegistry {
  private commandList: Command[] = [];
  private commandMap = new Map<string, Command>();

  register(command: Command) {
    if (this.commandMap.has(command.name)) {
      Logger.warn(`Command ${command.name} already registered, ignoring duplicate.`);
      return;
    }

    this.commandList.push(command);
    this.commandMap.set(command.name, command);

    for (const alias of command.aliases) {
      if (this.commandMap.has(alias)) {
        Logger.warn(`Alias ${alias} already registered for command ${command.name}, skipping alias.`);
        continue;
      }
      this.commandMap.set(alias, command);
    }
  }

  async execute(name: string, args: string[]) {
    const command = this.commandMap.get(name);

    if (!command) {
      Logger.error(`Unknown command: ${name}`);
      return 1;
    }

    try {
      const result = await command.run(args);
      return typeof result === "number" ? result : 0;
    } catch (error) {
      Logger.error("Command failed:", (error as Error).message ?? error);
      return 1;
    }
  }

  list() {
    return [...this.commandList];
  }
}
