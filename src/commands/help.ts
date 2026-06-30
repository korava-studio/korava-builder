import { Command, CommandRegistry } from "../core/registry.js";

const supportedTemplates = ["agent", "website", "saas", "bim"];

export function createHelpCommand(registry: CommandRegistry): Command {
  return {
    name: "help",
    aliases: ["h"],
    description: "Display help for available commands",
    run() {
      console.log("");
      console.log("Available commands:");
      console.log("");

      for (const command of registry.list()) {
        console.log(`  ${command.name.padEnd(12)} ${command.description}`);
      }

      console.log("");
      console.log("Available templates:");
      console.log(`  ${supportedTemplates.join(", ")}`);
      console.log("");
      console.log("Usage examples:");
      console.log("  korava-builder help");
      console.log("  korava-builder version");
      console.log("  korava-builder doctor");
      console.log("  korava-builder repair");
      console.log("  korava-builder new website MySite");
      console.log("");
      return 0;
    }
  };
}
