import { WorkflowContext } from "./context.js";

export interface PipelineStep {
  name: string;
  before(context: WorkflowContext): Promise<void> | void;
  execute(context: WorkflowContext): Promise<void> | void;
  after(context: WorkflowContext): Promise<void> | void;
  rollback(context: WorkflowContext): Promise<void> | void;
}
