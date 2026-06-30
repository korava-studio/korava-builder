import { EventBus } from "../../kernel/events/event-bus.js";
import { AIRuntime } from "./runtime.js";
import { AIProvider } from "../providers/provider.js";
import { RuntimeEvents } from "../events/runtime-events.js";

export class RuntimeManager {
  private eventBus = new EventBus();
  public runtime = new AIRuntime(this.eventBus);

  boot() {
    this.eventBus.emit(RuntimeEvents.BOOT);
    return this;
  }

  registerProvider(provider: AIProvider) {
    this.runtime.registerProvider(provider);
    this.eventBus.emit(RuntimeEvents.PROVIDER_LOADED, provider);
    return this;
  }

  async execute(goal: string, providerName: string, userPrompt: string) {
    const task = await this.runtime.createTask(goal, providerName, userPrompt);
    return this.runtime.executeTask(task.id);
  }
}
