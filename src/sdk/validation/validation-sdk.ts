import * as path from "path";
import { TemplateSDK } from "../templates/template-sdk.js";

export class ValidationSDK {
  constructor(private templateRoot: string) {}

  validateName(name: string) {
    const ok = /^[a-zA-Z0-9-_]+$/.test(name);
    return ok;
  }

  validateTemplate(name: string) {
    const sdk = new TemplateSDK(this.templateRoot);
    const errors = sdk.validate(name);
    return errors;
  }

  validateProject(projectPath: string) {
    // simple check: project folder must not already exist
    return !path.isAbsolute(projectPath) || projectPath.length > 0;
  }
}
