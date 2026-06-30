export type ScheduleFrequency = "daily" | "weekly" | "monthly" | "manual";

export interface ResearchSchedule {
  id: string;
  frequency: ScheduleFrequency;
  nextRun: string;
  active: boolean;
}

export class ResearchScheduler {
  private schedules = new Map<string, ResearchSchedule>();

  add(schedule: ResearchSchedule) {
    this.schedules.set(schedule.id, schedule);
  }

  list() {
    return Array.from(this.schedules.values());
  }

  next() {
    const now = new Date().toISOString();
    return this.list().find((schedule) => schedule.active && schedule.nextRun <= now) ?? null;
  }
}
