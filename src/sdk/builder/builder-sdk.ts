import { FileSystemSDK } from "../filesystem/filesystem-sdk.js";
import { TemplateSDK } from "../templates/template-sdk.js";
import { ValidationSDK } from "../validation/validation-sdk.js";
import { ConfigurationSDK } from "../configuration/configuration-sdk.js";
import * as path from "path";

/** BuilderSDK - high level operations used by CLI and services */
export class BuilderSDK {
  constructor(
    private fsSdk: FileSystemSDK,
    private templateSdk: TemplateSDK,
    private validationSdk: ValidationSDK,
    private configSdk: ConfigurationSDK
  ) {}

  async loadTemplate(name: string) {
    return this.templateSdk.load(name);
  }

  async createProject(templateName: string, projectName: string, projectRoot: string) {
    if (!this.validationSdk.validateName(projectName)) {
      throw new Error("Invalid project name");
    }

    const target = `${projectRoot}/${projectName}`;
    await this.fsSdk.mkdir(target);
    await this.templateSdk.copy(templateName, target, {
      PROJECT_NAME: projectName,
      AUTHOR: "KORAVA",
      DATE: new Date().toISOString(),
      VERSION: "1.0.0",
      DESCRIPTION: "Generated project"
    } as any);
    return target;
  }

  async copyTemplate(templateName: string, destination: string) {
    await this.templateSdk.copy(templateName, destination, {
      PROJECT_NAME: path.basename(destination),
      AUTHOR: "KORAVA",
      DATE: new Date().toISOString(),
      VERSION: "1.0.0",
      DESCRIPTION: "Generated copy"
    } as any);
  }

  async replaceVariables() {
    // delegated to TemplateSDK.render/copy in specific operations
  }

  async validateProject(path: string) {
    return this.validationSdk.validateProject(path);
  }

  async buildProject(path: string) {
    // placeholder: future build orchestration
    return true;
  }
}
