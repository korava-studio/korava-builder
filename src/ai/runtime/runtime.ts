import { ProviderManager } from "./provider-manager.js";
import { ContextManager } from "./context-manager.js";
import { PromptCompiler } from "./prompt-compiler.js";
import { TaskPlanner } from "./task-planner.js";
import { MemoryManager } from "../memory/memory-manager.js";
import { AIProvider } from "../providers/provider.js";
import { TaskQueue } from "../tasks/task-queue.js";
import { RuntimeEvents } from "../events/runtime-events.js";
import { EventBus } from "../../kernel/events/event-bus.js";

export class AIRuntime {
  public providerManager = new ProviderManager();
  public contextManager = new ContextManager();
  public promptCompiler = new PromptCompiler(this.contextManager);
  public taskPlanner = new TaskPlanner();
  public memoryManager = new MemoryManager();
  public taskQueue = new TaskQueue();

  constructor(private eventBus: EventBus) {}

  registerProvider(provider: AIProvider) {
    this.providerManager.register(provider);
  }

  async createTask(goal: string, providerName: string, userPrompt: string) {
    const memoryContext = this.memoryManager.getSnapshot()?.conversation ?? "";
    const compiledPrompt = this.promptCompiler.compile(
      "You are the KORAVA AI runtime.",
      "Follow the project workflow.",
      userPrompt,
      memoryContext
    );
    const plan = this.taskPlanner.plan(goal, compiledPrompt);
    const task = this.taskQueue.enqueue({
      goal,
      prompt: plan.description,
      provider: providerName
    });
    await this.eventBus.emit(RuntimeEvents.TASK_CREATED, task);
    return task;
  }

  async executeTask(taskId: string) {
    const task = this.taskQueue.start(taskId);
    if (!task) throw new Error(`Task ${taskId} not found or not pending`);
    const provider = this.providerManager.get(task.provider);
    if (!provider) throw new Error(`Provider ${task.provider} not registered`);

    await provider.connect();
    try {
      const response = await provider.chat(task.description);
      const completed = this.taskQueue.complete(taskId, response.text);
      this.memoryManager.captureConversation(response.text);
      await this.eventBus.emit(RuntimeEvents.TASK_COMPLETED, completed);
      await provider.disconnect();
      await this.eventBus.emit(RuntimeEvents.MEMORY_UPDATED, this.memoryManager.getSnapshot());
      return completed;
    } catch (err) {
      const failed = this.taskQueue.fail(taskId, (err as Error).message);
      await this.eventBus.emit(RuntimeEvents.TASK_COMPLETED, failed);
      await provider.disconnect();
      throw err;
    }
  }
}
