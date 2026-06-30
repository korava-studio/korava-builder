import { CLIRunner } from "./runner.js";
import { createPluginsCommand } from "../commands/plugins.js";
import { createHelpCommand } from "../commands/help.js";
import { versionCommand } from "../commands/version.js";
import { doctorCommand } from "../commands/doctor.js";
import { repairCommand } from "../commands/repair.js";
import { newCommand } from "../commands/new.js";
import * as path from "path";

export function createCLI() {
  const runner = new CLIRunner();
  const pluginRoot = path.resolve(process.cwd(), "plugins");
  // register built-in commands
  runner.register(versionCommand as any);
  runner.register(createHelpCommand as any);
  runner.register(doctorCommand as any);
  runner.register(repairCommand as any);
  runner.register(newCommand as any);

  // register plugins command
  // plugin manager will be wired separately as before
  return runner;
}
