import { EvaluationRecord } from "../learning-types.js";

export class EvaluationEngine {
  private records = new Map<string, EvaluationRecord[]>();

  evaluate(record: EvaluationRecord) {
    const current = this.records.get(record.employeeId) ?? [];
    current.push({ ...record });
    this.records.set(record.employeeId, current);
    return record;
  }

  list(employeeId: string) {
    return this.records.get(employeeId) ?? [];
  }

  averageScore(employeeId: string) {
    const records = this.list(employeeId);
    if (records.length === 0) {
      return 0;
    }
    return records.reduce((sum, item) => sum + item.score, 0) / records.length;
  }
}
