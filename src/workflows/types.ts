import { Command } from "../core/registry.js";
import { PluginManifest } from "../plugins/types.js";
import { TemplateFile, TemplateSpec } from "../templates/types.js";

export interface WorkflowConfig {
  commandName: string;
  args: string[];
  templateRoot: string;
  projectRoot: string;
  pluginRoot: string;
  configRoot: string;
}

export interface WorkflowState {
  command?: Command;
  templateName?: string;
  projectName?: string;
  config: Record<string, unknown>;
  plugins: PluginManifest[];
  templateSpec?: TemplateSpec;
  renderedFiles: TemplateFile[];
  generatedPaths: string[];
  error?: Error;
}
