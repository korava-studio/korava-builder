import { TemplateEngine } from "../../templates/engine.js";
import { TemplateVariableSet } from "../../templates/types.js";

/** TemplateSDK - thin wrapper around TemplateEngine */
export class TemplateSDK {
  private engine: TemplateEngine;

  constructor(rootPath: string) {
    this.engine = new TemplateEngine(rootPath);
  }

  load(name: string) {
    return this.engine.load(name);
  }

  validate(name: string) {
    return this.engine.validate(name);
  }

  render(name: string, variables: TemplateVariableSet) {
    return this.engine.render(name, variables);
  }

  copy(name: string, dest: string, variables: TemplateVariableSet) {
    return this.engine.copy(name, dest, variables);
  }
}
