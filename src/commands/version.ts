import { Command } from "../core/registry.js";
import * as fs from "fs";
import * as path from "path";

export const versionCommand: Command = {
  name: "version",
  aliases: ["v"],
  description: "Show KORAVA Builder version and runtime environment",
  run() {
    let packageVersion = "0.1.0";

    const packagePath = path.resolve(process.cwd(), "package.json");
    if (fs.existsSync(packagePath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
        packageVersion = packageJson.version ?? packageVersion;
      } catch {
        packageVersion = "0.1.0";
      }
    }

    console.log("");
    console.log("KORAVA Builder");
    console.log(`Version ${packageVersion}`);
    console.log(`Node ${process.version}`);
    console.log(`Platform ${process.platform}`);
    console.log("");
    return 0;
  }
};
