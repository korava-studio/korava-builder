/** ServiceContainer - simple DI container for kernel services */
export class ServiceContainer {
  private services = new Map<string, unknown>();

  register<T = unknown>(name: string, instance: T) {
    if (this.services.has(name)) {
      return;
    }
    this.services.set(name, instance);
  }

  resolve<T = unknown>(name: string): T | undefined {
    return this.services.get(name) as T | undefined;
  }

  has(name: string) {
    return this.services.has(name);
  }

  list() {
    return Array.from(this.services.keys());
  }
}
