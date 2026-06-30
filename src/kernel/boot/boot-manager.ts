import { Logger } from "../../core/logger.js";
import { ServiceContainer } from "../services/service-container.js";
import { ModuleLoader } from "../modules/module-loader.js";
import { PluginManager } from "../../plugins/manager.js";
import { AIRuntime } from "../../ai/runtime/runtime.js";
import { EventBus } from "../events/event-bus.js";
import { ConfigManager } from "../config/config-manager.js";
import { StateManager } from "../state/state-manager.js";
import { GovernanceManager } from "../governance/governance-manager.js";
import { SecurityManager } from "../security/security-manager.js";

export class BootManager {
  constructor(private container: ServiceContainer) {}

  async boot() {
    const started = Date.now();
    Logger.info("Boot sequence start");

    // core services
    const eventBus = new EventBus();
    const state = new StateManager();
    const config = new ConfigManager("config");
    const governance = new GovernanceManager();
    const security = new SecurityManager();

    this.container.register("eventBus", eventBus);
    this.container.register("state", state);
    this.container.register("config", config);
    this.container.register("governance", governance);
    this.container.register("security", security);

    // load modules
    const modulesRoot = process.cwd() + "/modules";
    const loader = new ModuleLoader(modulesRoot);
    const modules = loader.scan();
    this.container.register("modules", modules);

    // plugins
    const pluginRoot = process.cwd() + "/plugins";
    const pluginManager = new PluginManager(pluginRoot);
    pluginManager.loadAll();
    this.container.register("plugins", pluginManager);

    // AI runtime
    const ai = new AIRuntime(eventBus);
    this.container.register("airuntime", ai);

    const elapsed = Date.now() - started;
    Logger.success("Boot completed", `${modules.length} modules`, `${elapsed}ms`);
    return { modulesLoaded: modules.length, bootTimeMs: elapsed };
  }
}
