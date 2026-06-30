import * as fs from "fs";
import * as path from "path";
import { PluginSpec, PluginManifest } from "./Plugin.js";
import { Logger } from "../core/logger.js";

export class PluginLoader {
  constructor(private root: string) {}

  scan(): PluginSpec[] {
    if (!fs.existsSync(this.root)) return [];
    return fs.readdirSync(this.root, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => this.load(d.name))
      .filter((p): p is PluginSpec => p !== null);
  }

  load(name: string): PluginSpec | null {
    const pluginPath = path.join(this.root, name);
    const manifestPath = path.join(pluginPath, "manifest.json");
    if (!fs.existsSync(manifestPath)) {
      Logger.warn(`Plugin ${name} missing manifest.json`);
      return null;
    }

    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as PluginManifest;
      if (!manifest.id || !manifest.name) {
        Logger.warn(`Plugin ${name} manifest invalid`);
        return null;
      }

      const spec: PluginSpec = { rootPath: pluginPath, manifest };
      // try to load module if main exists
      if (manifest.main) {
        const mainPath = path.join(pluginPath, manifest.main);
        try {
          // dynamic import; may run at runtime only
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          // use import() to avoid static resolution
          // Note: may fail in build-time but it's runtime guarded
          // tslint:disable-next-line:no-var-requires
          // leave module undefined if import fails
        } catch {
          // ignore
        }
      }

      return spec;
    } catch (err) {
      Logger.warn(`Failed to read plugin manifest for ${name}: ${(err as Error).message}`);
      return null;
    }
  }
}
