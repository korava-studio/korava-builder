import * as fs from "fs";
import * as path from "path";
import { TemplateLoader } from "./loader.js";
import { TemplateRenderer } from "./renderer.js";
import { TemplateVariableSet, TemplateSpec } from "./types.js";

export class TemplateEngine {
  private loader: TemplateLoader;

  constructor(private rootPath: string) {
    this.loader = new TemplateLoader(rootPath);
  }

  load(templateName: string): TemplateSpec | null {
    return this.loader.load(templateName);
  }

  validate(templateName: string): string[] {
    const errors: string[] = [];
    const spec = this.load(templateName);

    if (!spec) {
      errors.push(`Template ${templateName} not found.`);
      return errors;
    }

    const requiredVariables = ["PROJECT_NAME", "AUTHOR", "DATE", "VERSION", "DESCRIPTION"];
    for (const variable of requiredVariables) {
      if (!spec.manifest.variables.includes(variable)) {
        errors.push(`Template missing variable ${variable}`);
      }
    }

    return errors;
  }

  render(templateName: string, variables: TemplateVariableSet) {
    const spec = this.load(templateName);
    if (!spec) {
      throw new Error(`Template ${templateName} not found.`);
    }

    const renderer = new TemplateRenderer(variables);
    return renderer.renderFiles(spec.files);
  }

  copy(templateName: string, destination: string, variables: TemplateVariableSet) {
    const renderedFiles = this.render(templateName, variables);
    for (const file of renderedFiles) {
      const targetPath = path.join(destination, file.relativePath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, file.content, "utf8");
    }
  }
}
