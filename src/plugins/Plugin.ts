export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  author?: string;
  description?: string;
  main?: string;
  dependencies?: string[];
}

export interface PluginModule {
  activate?(context: unknown): Promise<void> | void;
  deactivate?(context: unknown): Promise<void> | void;
  dispose?(context: unknown): Promise<void> | void;
}

export interface PluginSpec {
  rootPath: string;
  manifest: PluginManifest;
  module?: PluginModule;
}
