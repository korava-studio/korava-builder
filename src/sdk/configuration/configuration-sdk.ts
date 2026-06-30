import * as fs from "fs/promises";
import * as path from "path";

/** ConfigurationSDK - load/save JSON configs with defaults */
export class ConfigurationSDK {
  async load<T = Record<string, unknown>>(p: string): Promise<T | null> {
    try {
      const raw = await fs.readFile(p, "utf8");
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async save(p: string, data: unknown) {
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, JSON.stringify(data, null, 2), "utf8");
  }

  merge<T extends Record<string, any>>(base: T, patch: Partial<T>) {
    return { ...base, ...patch } as T;
  }

  defaults<T extends Record<string, any>>(defaults: T) {
    return defaults;
  }
}
