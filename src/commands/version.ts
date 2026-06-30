import { Command } from "../core/registry";

export const versionCommand: Command = {
  name: "version",

  description: "Show builder version",

  run() {
    console.log("");
    console.log("KORAVA Builder");
    console.log("v0.1.0");
    console.log("");
  }
};