import * as path from "path";
import * as fs from "fs";
import { PluginLoader } from "./PluginLoader.js";
import { PluginRegistry } from "./PluginRegistry.js";
import { PluginSpec } from "./Plugin.js";
import { Logger } from "../core/logger.js";

export class PluginManager {
  private registry = new PluginRegistry();
  private enabled = new Set<string>();

  constructor(private root: string) {}

  loadAll() {
    const loader = new PluginLoader(this.root);
    const specs = loader.scan();
    for (const spec of specs) {
      this.registry.register(spec);
    }
    return this.registry.list();
  }

  list() {
    return this.registry.list().map((s) => ({ manifest: s.manifest, enabled: this.enabled.has(s.manifest.id) }));
  }

  install(srcPath: string) {
    const name = path.basename(srcPath);
    const dest = path.join(this.root, name);
    if (!fs.existsSync(srcPath)) throw new Error("Source plugin not found");
    if (fs.existsSync(dest)) throw new Error("Plugin already installed");
    // copy directory
    fs.cpSync(srcPath, dest, { recursive: true });
    Logger.info(`Installed plugin ${name}`);
    this.loadAll();
  }

  uninstall(id: string) {
    const spec = this.registry.get(id);
    if (!spec) throw new Error("Plugin not found");
    fs.rmSync(spec.rootPath, { recursive: true, force: true });
    Logger.info(`Uninstalled plugin ${id}`);
    this.loadAll();
  }

  enable(id: string) {
    const spec = this.registry.get(id);
    if (!spec) throw new Error("Plugin not found");
    this.enabled.add(id);
    Logger.info(`Enabled plugin ${id}`);
  }

  disable(id: string) {
    this.enabled.delete(id);
    Logger.info(`Disabled plugin ${id}`);
  }

  reload(id: string) {
    // simple reload: re-scan and re-register
    this.loadAll();
    Logger.info(`Reloaded plugins`);
  }
}
