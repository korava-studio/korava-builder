import * as fs from "fs";
import * as path from "path";

export class ConfigManager {
  constructor(private configRoot: string) {}

  load(name: string) {
    const p = path.join(this.configRoot, `${name}.json`);
    if (!fs.existsSync(p)) return null;
    try {
      return JSON.parse(fs.readFileSync(p, "utf8"));
    } catch {
      return null;
    }
  }

  save(name: string, data: unknown) {
    const p = path.join(this.configRoot, `${name}.json`);
    fs.mkdirSync(this.configRoot, { recursive: true });
    fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
  }
}
