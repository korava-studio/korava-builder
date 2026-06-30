import * as fs from "fs";
import * as path from "path";
import { PluginSpec, PluginManifest } from "./types.js";

export class PluginLoader {
  constructor(private pluginsRoot: string) {}

  load(pluginName: string): PluginSpec | null {
    const pluginPath = path.join(this.pluginsRoot, pluginName);
    const manifestPath = path.join(pluginPath, "plugin.json");

    if (!fs.existsSync(pluginPath) || !fs.statSync(pluginPath).isDirectory()) {
      return null;
    }

    if (!fs.existsSync(manifestPath)) {
      return null;
    }

    const manifest = this.readManifest(manifestPath);
    if (!manifest) {
      return null;
    }

    if (!this.isValidManifest(manifest)) {
      return null;
    }

    return { rootPath: pluginPath, manifest };
  }

  scan(): PluginSpec[] {
    if (!fs.existsSync(this.pluginsRoot)) {
      return [];
    }

    return fs.readdirSync(this.pluginsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => this.load(entry.name))
      .filter((plugin): plugin is PluginSpec => plugin !== null);
  }

  private readManifest(manifestPath: string): PluginManifest | null {
    try {
      return JSON.parse(fs.readFileSync(manifestPath, "utf8")) as PluginManifest;
    } catch {
      return null;
    }
  }

  private isValidManifest(manifest: PluginManifest): boolean {
    return (
      typeof manifest.name === "string" && manifest.name.length > 0 &&
      typeof manifest.version === "string" && manifest.version.length > 0 &&
      typeof manifest.author === "string" && manifest.author.length > 0 &&
      Array.isArray(manifest.commands) && manifest.commands.every((cmd) => typeof cmd === "string" && cmd.length > 0)
    );
  }
}
