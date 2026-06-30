import { Command } from "../core/registry.js";
import * as fs from "fs";
import * as path from "path";
import { createFolder, createFile } from "../core/filesystem.js";

const supportedTemplates = ["agent", "website", "saas", "bim"];

function replacePlaceholders(text: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce(
    (value, [key, replacement]) => value.replaceAll(`{{${key}}}`, replacement),
    text
  );
}

function copyTemplate(source: string, destination: string, replacements: Record<string, string>) {
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetName = replacePlaceholders(entry.name, replacements);
    const targetPath = path.join(destination, targetName);

    if (entry.isDirectory()) {
      createFolder(targetPath);
      copyTemplate(sourcePath, targetPath, replacements);
      continue;
    }

    const content = fs.readFileSync(sourcePath, "utf8");
    const transformed = replacePlaceholders(content, replacements);
    createFolder(path.dirname(targetPath));
    createFile(targetPath, transformed);
  }
}

export const newCommand: Command = {
  name: "new",
  aliases: ["create"],
  description: "Create a new project from a KORAVA template",
  run(args: string[]) {
    const templateType = args[0];
    const projectName = args[1];

    if (!templateType || !projectName) {
      console.log("Usage: new <template> <project-name>");
      console.log("Supported templates:", supportedTemplates.join(", "));
      return 1;
    }

    if (!supportedTemplates.includes(templateType)) {
      console.log(`Unknown template type: ${templateType}`);
      console.log("Supported templates:", supportedTemplates.join(", "));
      return 1;
    }

    const templatePath = path.resolve(process.cwd(), "templates", templateType);
    if (!fs.existsSync(templatePath) || !fs.statSync(templatePath).isDirectory()) {
      console.log(`Template not found: ${templateType}`);
      return 1;
    }

    const targetRoot = path.resolve(process.cwd(), projectName);
    if (fs.existsSync(targetRoot)) {
      console.log(`Destination already exists: ${targetRoot}`);
      return 1;
    }

    createFolder(targetRoot);
    copyTemplate(templatePath, targetRoot, {
      projectName,
      templateType
    });

    console.log(`Created project ${projectName} from template ${templateType}`);
    return 0;
  }
};
