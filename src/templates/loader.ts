import * as fs from "fs";
import * as path from "path";
import { TemplateSpec, TemplateManifest, TemplateFile } from "./types.js";

export class TemplateLoader {
  constructor(private rootPath: string) {}

  load(templateName: string): TemplateSpec | null {
    const templatePath = path.join(this.rootPath, templateName);
    const manifestPath = path.join(templatePath, "template.json");

    if (!fs.existsSync(templatePath) || !fs.statSync(templatePath).isDirectory()) {
      return null;
    }

    if (!fs.existsSync(manifestPath)) {
      return null;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as TemplateManifest;
    const files: TemplateFile[] = this.walkFiles(templatePath).map((relativePath) => ({
      relativePath,
      content: fs.readFileSync(path.join(templatePath, relativePath), "utf8")
    }));

    return { manifest, files };
  }

  private walkFiles(root: string): string[] {
    const results: string[] = [];

    const visit = (directory: string, prefix: string) => {
      const entries = fs.readdirSync(directory, { withFileTypes: true });
      for (const entry of entries) {
        const currentPath = path.join(directory, entry.name);
        const relativePath = path.join(prefix, entry.name);
        if (entry.isDirectory()) {
          visit(currentPath, relativePath);
        } else if (entry.name !== "template.json") {
          results.push(relativePath);
        }
      }
    };

    visit(root, "");
    return results;
  }
}
