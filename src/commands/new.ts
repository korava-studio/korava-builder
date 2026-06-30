import { Command } from "../core/registry.js";
import * as path from "path";
import { ProjectGenerator } from "../services/project-generator/generator.js";
import { Logger } from "../core/logger.js";

const supportedTemplates = ["agent", "website", "saas", "bim"];

export const newCommand: Command = {
  name: "new",
  aliases: ["create"],
  description: "Create a new project from a KORAVA template",
  run(args: string[]) {
    const templateType = args[0];
    const projectName = args[1];

    if (!templateType || !projectName) {
      Logger.error("Usage: new <template> <project-name>");
      Logger.info("Supported templates:", supportedTemplates.join(", "));
      return 1;
    }

    if (!supportedTemplates.includes(templateType)) {
      Logger.error(`Unknown template type: ${templateType}`);
      Logger.info("Supported templates:", supportedTemplates.join(", "));
      return 1;
    }

    if (path.isAbsolute(templateType) || templateType.includes("..")) {
      Logger.error("Invalid template name.");
      return 1;
    }

    const templateRoot = path.resolve(process.cwd(), "templates");
    const projectRoot = path.resolve(process.cwd(), "projects");
    const generator = new ProjectGenerator(templateRoot, projectRoot);

    Logger.info("Validating template", templateType);
    const successful = generator.generate(templateType, projectName);

    if (!successful) {
      Logger.error("Project generation failed.");
      return 1;
    }

    Logger.success(`Created project ${projectName} from template ${templateType}`);
    return 0;
  }
};
