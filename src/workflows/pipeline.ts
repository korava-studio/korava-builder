import { WorkflowContext } from "./context.js";
import { PipelineStep } from "./step.js";
import { Logger } from "../core/logger.js";

export class Pipeline {
  constructor(private steps: PipelineStep[]) {}

  async run(context: WorkflowContext) {
    for (const step of this.steps) {
      const started = Date.now();
      Logger.info(`Starting step: ${step.name}`);
      await step.before(context);
      await step.execute(context);
      await step.after(context);
      const elapsed = Date.now() - started;
      Logger.info(`Completed step: ${step.name} in ${elapsed}ms`);
    }
  }

  async rollback(context: WorkflowContext) {
    Logger.warn("Rolling back workflow");
    for (const step of [...this.steps].reverse()) {
      await step.rollback(context);
    }
  }
}
