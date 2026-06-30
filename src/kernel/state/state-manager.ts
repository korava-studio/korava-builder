export class StateManager {
  private state = new Map<string, unknown>();

  set(key: string, value: unknown) {
    this.state.set(key, value);
  }

  get<T = unknown>(key: string): T | undefined {
    return this.state.get(key) as T | undefined;
  }

  has(key: string) {
    return this.state.has(key);
  }

  all() {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of this.state.entries()) obj[k] = v;
    return obj;
  }
}
