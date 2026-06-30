import { ServiceContainer } from "./services/service-container.js";
import { BootManager } from "./boot/boot-manager.js";
import { EventBus } from "./events/event-bus.js";
import { Logger } from "../core/logger.js";

export class Kernel {
  public container = new ServiceContainer();
  private bootManager = new BootManager(this.container);
  private startTime = Date.now();

  async start() {
    Logger.info("Kernel starting");
    const result = await this.bootManager.boot();
    Logger.info("Kernel ready");
    return result;
  }

  health() {
    const modules = this.container.resolve<any>("modules") ?? [];
    const plugins = this.container.resolve<any>("plugins");
    const mem = process.memoryUsage();
    const uptime = Date.now() - this.startTime;

    return {
      modulesLoaded: modules.length,
      pluginsLoaded: plugins ? plugins.list().length : 0,
      memory: mem,
      uptimeMs: uptime
    };
  }
}
