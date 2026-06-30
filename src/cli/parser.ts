import { CLICommand } from "./types.js";

export class CommandParser {
  parse(argv: string[]): { command: string; args: string[] } {
    const command = argv[0] ?? "help";
    const args = argv.slice(1);
    return { command, args };
  }
}
