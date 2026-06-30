import { PluginManager } from "../../plugins/manager.js";

/** PluginSDK - wrapper for plugin discovery and listing */
export class PluginSDK {
  private manager: PluginManager;

  constructor(rootPath: string) {
    this.manager = new PluginManager(rootPath);
    this.manager.loadAll();
  }

  list() {
    return this.manager.getInstalledPlugins();
  }
}
