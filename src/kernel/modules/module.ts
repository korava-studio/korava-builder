export interface KernelModule {
  name: string;
  install(container: unknown): Promise<void> | void;
  boot(container: unknown): Promise<void> | void;
  start(container: unknown): Promise<void> | void;
  stop(container: unknown): Promise<void> | void;
  destroy(container: unknown): Promise<void> | void;
}

export interface ModuleSpec {
  name: string;
  path: string;
  manifest: Record<string, unknown>;
}
