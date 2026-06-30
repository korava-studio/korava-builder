export interface PluginManifest {
  name: string;
  version: string;
  author: string;
  commands: string[];
}

export interface PluginSpec {
  rootPath: string;
  manifest: PluginManifest;
}
