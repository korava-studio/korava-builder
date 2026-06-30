import { Command } from "../core/registry.js";
import { createFolder } from "../core/filesystem.js";

const requiredDirectories = ["bootstrap", "docs", "templates", "tests", "scripts"];

export const repairCommand: Command = {
  name: "repair",
  aliases: ["fix"],
  description: "Create missing project folders required by KORAVA Builder",
  run() {
    for (const folder of requiredDirectories) {
      createFolder(folder);
      console.log(`Created or verified: ${folder}`);
    }

    console.log("");
    return 0;
  }
};
