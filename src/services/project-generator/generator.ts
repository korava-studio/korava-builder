import * as path from "path";
import { ProjectValidator } from "./validator.js";
import { ProjectCopier } from "./copy.js";
import { GeneratorLogger } from "./logger.js";
import { buildProjectVariables } from "./variables.js";

export class ProjectGenerator {
  constructor(private templateRoot: string, private projectRoot: string) {}

  generate(templateName: string, projectName: string) {
    const validator = new ProjectValidator(this.templateRoot);
    const errors = validator.validate(templateName);

    if (errors.length > 0) {
      errors.forEach((error) => GeneratorLogger.error(error));
      return false;
    }

    const targetRoot = path.join(this.projectRoot, projectName);
    const copier = new ProjectCopier(this.templateRoot);
    const variables = buildProjectVariables(projectName);

    GeneratorLogger.info("Creating project", targetRoot);
    copier.createProject(templateName, targetRoot, variables);
    GeneratorLogger.success(`Project generated at ${targetRoot}`);
    return true;
  }
}
