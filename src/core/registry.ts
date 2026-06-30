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
    this.commandList.push(command);
    this.commandMap.set(command.name, command);

    for (const alias of command.aliases) {
      this.commandMap.set(alias, command);
    }
  }

  async execute(name: string, args: string[]) {
    const command = this.commandMap.get(name);

    if (!command) {
      console.error(`Unknown command: ${name}`);
      return 1;
    }

    try {
      const result = await command.run(args);
      return typeof result === 'number' ? result : 0;
    } catch (error) {
      console.error('Command failed:', error);
      return 1;
    }
  }

  list() {
    return [...this.commandList];
  }
}
