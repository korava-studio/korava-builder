export interface TemplateVariableSet {
  PROJECT_NAME: string;
  AUTHOR: string;
  DATE: string;
  VERSION: string;
  DESCRIPTION: string;
}

export interface TemplateFile {
  relativePath: string;
  content: string;
}

export interface TemplateManifest {
  name: string;
  description: string;
  variables: string[];
}

export interface TemplateSpec {
  manifest: TemplateManifest;
  files: TemplateFile[];
}
