export interface TaskPlan {
  title: string;
  description: string;
  priority: number;
  estimateMinutes: number;
}

export class TaskPlanner {
  plan(goal: string) {
    const tasks: TaskPlan[] = [
      {
        title: "Analyze goal",
        description: `Review the goal and identify subtasks for: ${goal}`,
        priority: 1,
        estimateMinutes: 5
      },
      {
        title: "Create plan",
        description: `Split the workflow into executable tasks for: ${goal}`,
        priority: 2,
        estimateMinutes: 10
      },
      {
        title: "Validate plan",
        description: `Prioritize and estimate the task plan for: ${goal}`,
        priority: 3,
        estimateMinutes: 5
      }
    ];

    return tasks.sort((a, b) => a.priority - b.priority);
  }
}
