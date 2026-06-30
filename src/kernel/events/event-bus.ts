import { Logger } from "../../core/logger.js";

type Listener = (...args: unknown[]) => void | Promise<void>;

export class EventBus {
  private listeners = new Map<string, Set<Listener>>();

  on(event: string, listener: Listener) {
    const set = this.listeners.get(event) ?? new Set();
    set.add(listener);
    this.listeners.set(event, set);
  }

  off(event: string, listener?: Listener) {
    if (!listener) {
      this.listeners.delete(event);
      return;
    }
    const set = this.listeners.get(event);
    set?.delete(listener);
  }

  once(event: string, listener: Listener) {
    const wrapper: Listener = async (...args) => {
      try {
        await listener(...args);
      } finally {
        this.off(event, wrapper);
      }
    };
    this.on(event, wrapper);
  }

  async emit(event: string, ...args: unknown[]) {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const listener of Array.from(set)) {
      try {
        await listener(...args);
      } catch (err) {
        Logger.warn(`Event listener error for ${event}:`, (err as Error).message);
      }
    }
  }

  list() {
    return Array.from(this.listeners.keys());
  }
}
