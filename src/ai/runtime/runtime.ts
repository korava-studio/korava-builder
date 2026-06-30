import { ProviderManager } from "./provider-manager.js";
import { ContextManager } from "./context-manager.js";
import { PromptCompiler } from "./prompt-compiler.js";
import { TaskPlanner } from "./task-planner.js";
import { MemoryManager } from "../memory/memory-manager.js";
import { AIProvider } from "../providers/provider.js";

export class AIRuntime {
  public providerManager = new ProviderManager();
  public contextManager = new ContextManager();
  public promptCompiler = new PromptCompiler(this.contextManager);
  public taskPlanner = new TaskPlanner();
  public memoryManager = new MemoryManager();

  registerProvider(provider: AIProvider) {
    this.providerManager.register(provider);
  }

  async runTask(goal: string, providerName: string) {
    const plan = this.taskPlanner.plan(goal);
    this.contextManager.setTask(goal);
    this.memoryManager.capture(goal);
    const provider = this.providerManager.get(providerName);

    if (!provider) {
      throw new Error(`Provider ${providerName} not registered`);
    }

    const prompt = this.promptCompiler.compile(
      "You are the KORAVA AI runtime.",
      "Follow the project workflow.",
      goal
    );

    await provider.connect();
    return provider.chat(prompt);
  }
}
