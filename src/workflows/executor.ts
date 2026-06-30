import * as fs from "fs";
import * as path from "path";
import { WorkflowContext } from "./context.js";
import { Pipeline } from "./pipeline.js";
import { PipelineStep } from "./step.js";
import { Logger } from "../core/logger.js";

export class WorkflowExecutor {
  constructor(private pipeline: Pipeline) {}

  async run(context: WorkflowContext) {
    try {
      await this.pipeline.run(context);
      Logger.success("Workflow completed successfully");
      return 0;
    } catch (error) {
      context.setError(error as Error);
      Logger.error("Workflow failed:", (error as Error).message);
      await this.pipeline.rollback(context);
      this.cleanupGenerated(context);
      return 1;
    }
  }

  private cleanupGenerated(context: WorkflowContext) {
    for (const generatedPath of context.state.generatedPaths) {
      try {
        if (fs.existsSync(generatedPath)) {
          if (fs.statSync(generatedPath).isDirectory()) {
            fs.rmSync(generatedPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(generatedPath);
          }
        }
      } catch {
        Logger.warn(`Unable to delete generated path: ${generatedPath}`);
      }
    }
  }
}
