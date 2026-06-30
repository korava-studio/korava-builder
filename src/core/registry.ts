export interface Command {
  name: string;
  description: string;
  run(args: string[]): void;
}

export class CommandRegistry {
  private commands = new Map<string, Command>();

  register(command: Command) {
    this.commands.set(command.name, command);
  }

  execute(name: string, args: string[]) {
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