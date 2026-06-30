import { ExperienceRecord } from "../learning-types.js";

export class ExperienceManager {
  private experiences = new Map<string, ExperienceRecord>();

  record(record: ExperienceRecord) {
    if (this.experiences.has(record.id)) {
      throw new Error(`Experience ${record.id} already exists`);
    }
    this.experiences.set(record.id, { ...record });
    return record;
  }

  list(employeeId: string) {
    return Array.from(this.experiences.values()).filter((experience) => experience.employeeId === employeeId);
  }
}
