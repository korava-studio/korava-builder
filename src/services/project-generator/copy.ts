import * as path from "path";
import * as fs from "fs";
import { TemplateEngine } from "../../templates/engine.js";
import { TemplateVariableSet } from "../../templates/types.js";
import { GeneratorLogger } from "./logger.js";

export class ProjectCopier {
  constructor(private templateRoot: string) {}

  createProject(templateName: string, targetRoot: string, variables: TemplateVariableSet) {
    const engine = new TemplateEngine(this.templateRoot);
    const spec = engine.load(templateName);

    if (!spec) {
      throw new Error(`Template ${templateName} not found.`);
    }

    if (fs.existsSync(targetRoot)) {
      throw new Error(`Destination already exists: ${targetRoot}`);
    }

    fs.mkdirSync(targetRoot, { recursive: true });
    const renderedFiles = engine.render(templateName, variables);

    for (const file of renderedFiles) {
      const targetPath = path.join(targetRoot, file.relativePath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, file.content, "utf8");
      GeneratorLogger.info("Writing file", targetPath);
    }
  }
}
