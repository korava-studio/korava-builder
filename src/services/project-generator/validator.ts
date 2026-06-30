import { TemplateEngine } from "../../templates/engine.js";

export class ProjectValidator {
  constructor(private templateRoot: string) {}

  validate(templateName: string) {
    const engine = new TemplateEngine(this.templateRoot);
    return engine.validate(templateName);
  }
}
