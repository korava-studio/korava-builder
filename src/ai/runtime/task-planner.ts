import { TaskPlan } from "../models/task.js";

export class TaskPlanner {
  plan(goal: string, prompt: string) {
    const title = `Plan for: ${goal}`;
    const description = `${prompt}\n\nBreak down the goal into execution steps.`;
    const estimateMinutes = Math.max(1, Math.ceil(prompt.length / 50));
    return {
      title,
      description,
      priority: 1,
      estimateMinutes
    } as TaskPlan;
  }
}
