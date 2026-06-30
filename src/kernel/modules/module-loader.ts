import * as fs from "fs";
import * as path from "path";
import { ModuleSpec } from "./module.js";

export class ModuleLoader {
  constructor(private modulesRoot: string) {}

  scan(): ModuleSpec[] {
    if (!fs.existsSync(this.modulesRoot)) return [];
    return fs.readdirSync(this.modulesRoot, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => {
        const manifestPath = path.join(this.modulesRoot, d.name, "module.json");
        let manifest = {};
        if (fs.existsSync(manifestPath)) {
          try {
            manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
          } catch {
            manifest = {};
          }
        }

        return { name: d.name, path: path.join(this.modulesRoot, d.name), manifest } as ModuleSpec;
      });
  }
}
