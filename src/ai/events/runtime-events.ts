export const RuntimeEvents = {
  BOOT: "runtime.boot",
  PROVIDER_LOADED: "provider.loaded",
  TASK_CREATED: "task.created",
  TASK_COMPLETED: "task.completed",
  MEMORY_UPDATED: "memory.updated"
} as const;

export type RuntimeEvent = typeof RuntimeEvents[keyof typeof RuntimeEvents];
