import { ContextManager } from "./context-manager.js";

export class PromptCompiler {
  constructor(private context: ContextManager) {}

  compile(systemPrompt: string, developerPrompt: string, userPrompt: string) {
    const context = this.context.getWindow();
    return [
      `SYSTEM: ${systemPrompt}`,
      `DEVELOPER: ${developerPrompt}`,
      `WORKSPACE: ${context.workspace}`,
      `PROJECT: ${context.project}`,
      `USER: ${context.user}`,
      `TASK: ${context.task}`,
      `INPUT: ${userPrompt}`
    ].join("\n\n");
  }
}
