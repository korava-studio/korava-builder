export interface PerformanceRecord {
  employeeId: string;
  tasksCompleted: number;
  quality: number;
  speed: number;
  security: number;
  documentation: number;
  innovation: number;
  automation: number;
}

export class PerformanceEngine {
  private records = new Map<string, PerformanceRecord>();

  recordPerformance(record: PerformanceRecord) {
    this.records.set(record.employeeId, record);
  }

  getPerformance(employeeId: string) {
    return this.records.get(employeeId) ?? null;
  }

  getScore(employeeId: string) {
    const record = this.getPerformance(employeeId);
    if (!record) return 0;
    return (
      record.tasksCompleted * 0.2 +
      record.quality * 0.2 +
      record.speed * 0.15 +
      record.security * 0.15 +
      record.documentation * 0.15 +
      record.innovation * 0.1 +
      record.automation * 0.05
    );
  }
}
