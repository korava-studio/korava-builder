import { CLICommand } from "../cli/types.js";

export class CommandSDK {
  constructor(private command: CLICommand) {}

  getName() {
    return this.command.name;
  }

  getUsage() {
    return this.command.usage;
  }

  async execute(args: string[]) {
    return this.command.execute(args);
  }
}
