import { PluginSpec } from "./Plugin.js";
import { Logger } from "../core/logger.js";

export class PluginRegistry {
  private map = new Map<string, PluginSpec>();

  register(spec: PluginSpec) {
    if (this.map.has(spec.manifest.id)) {
      Logger.warn(`Plugin id ${spec.manifest.id} already registered, skipping`);
      return false;
    }
    this.map.set(spec.manifest.id, spec);
    return true;
  }

  get(id: string) {
    return this.map.get(id);
  }

  list() {
    return Array.from(this.map.values());
  }

  resolveOrder(): PluginSpec[] {
    // simple resolution: topological by dependencies
    const resolved: PluginSpec[] = [];
    const temp = new Set<string>();
    const perm = new Set<string>();

    const visit = (id: string) => {
      if (perm.has(id)) return;
      if (temp.has(id)) throw new Error(`Cyclic dependency detected: ${id}`);
      temp.add(id);
      const spec = this.map.get(id);
      if (spec && spec.manifest.dependencies) {
        for (const dep of spec.manifest.dependencies) visit(dep);
      }
      perm.add(id);
      resolved.push(spec!);
    };

    for (const id of this.map.keys()) visit(id);
    return resolved;
  }
}
