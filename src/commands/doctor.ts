import { Command } from "../core/registry.js";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const checks = [
  {
    name: "Node",
    test: () => process.version,
    required: true
  },
  {
    name: "npm",
    test: () => execSync("npm --version", { encoding: "utf8" }).trim(),
    required: true
  },
  {
    name: "Git",
    test: () => execSync("git --version", { encoding: "utf8" }).trim(),
    required: true
  },
  {
    name: "package.json",
    test: () => fs.existsSync(path.resolve(process.cwd(), "package.json")) ? "present" : "missing",
    required: true
  },
  {
    name: "tsconfig.json",
    test: () => fs.existsSync(path.resolve(process.cwd(), "tsconfig.json")) ? "present" : "missing",
    required: true
  },
  {
    name: "bootstrap/",
    test: () => fs.existsSync(path.resolve(process.cwd(), "bootstrap")) ? "present" : "missing",
    required: false
  },
  {
    name: "docs/",
    test: () => fs.existsSync(path.resolve(process.cwd(), "docs")) ? "present" : "missing",
    required: false
  },
  {
    name: "templates/",
    test: () => fs.existsSync(path.resolve(process.cwd(), "templates")) ? "present" : "missing",
    required: false
  },
  {
    name: "tests/",
    test: () => fs.existsSync(path.resolve(process.cwd(), "tests")) ? "present" : "missing",
    required: false
  },
  {
    name: "scripts/",
    test: () => fs.existsSync(path.resolve(process.cwd(), "scripts")) ? "present" : "missing",
    required: false
  }
];

export const doctorCommand: Command = {
  name: "doctor",
  aliases: ["check"],
  description: "Run a diagnostic check of the current environment and project structure",
  run() {
    console.log("");
    console.log("Doctor report:");
    console.log("");

    let exitCode = 0;

    for (const check of checks) {
      try {
        const result = check.test();
        const success = typeof result === "string" ? result !== "missing" : Boolean(result);
        const label = success ? "OK" : "FAIL";
        console.log(`  ${check.name.padEnd(14)} ${label}  ${result}`);
        if (check.required && !success) {
          exitCode = 1;
        }
      } catch (error) {
        console.log(`  ${check.name.padEnd(14)} FAIL  ${error instanceof Error ? error.message : error}`);
        if (check.required) {
          exitCode = 1;
        }
      }
    }

    console.log("");
    return exitCode;
  }
};
