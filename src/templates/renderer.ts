import { TemplateFile, TemplateVariableSet } from "./types.js";

export class TemplateRenderer {
  constructor(private variables: TemplateVariableSet) {}

  replaceVariables(text: string) {
    let output = text;
    for (const [key, value] of Object.entries(this.variables)) {
      output = output.replaceAll(new RegExp(`{{${key}}}`, "g"), value);
    }
    return output;
  }

  renderFiles(files: TemplateFile[]) {
    return files.map((file) => ({
      relativePath: file.relativePath,
      content: this.replaceVariables(file.content)
    }));
  }
}
