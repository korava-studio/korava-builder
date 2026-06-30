import { ExperienceRecord, EvaluationRecord } from "../learning-types.js";

export class LearningAnalytics {
  private experienceHistory = new Map<string, ExperienceRecord[]>();
  private evaluationHistory = new Map<string, EvaluationRecord[]>();

  trackExperience(record: ExperienceRecord) {
    const history = this.experienceHistory.get(record.employeeId) ?? [];
    history.push({ ...record });
    this.experienceHistory.set(record.employeeId, history);
  }

  trackEvaluation(record: EvaluationRecord) {
    const history = this.evaluationHistory.get(record.employeeId) ?? [];
    history.push({ ...record });
    this.evaluationHistory.set(record.employeeId, history);
  }

  getEvaluations(employeeId: string) {
    return this.evaluationHistory.get(employeeId) ?? [];
  }

  progress(employeeId: string) {
    return (this.experienceHistory.get(employeeId) ?? []).reduce((sum, item) => sum + item.xp, 0);
  }

  departmentPerformance(employeeIds: string[]) {
    return employeeIds.map((employeeId) => ({
      employeeId,
      xp: this.progress(employeeId),
      score: this.averageScore(employeeId)
    }));
  }

  private averageScore(employeeId: string) {
    const evaluations = this.getEvaluations(employeeId);
    if (evaluations.length === 0) {
      return 0;
    }
    return evaluations.reduce((sum, item) => sum + item.score, 0) / evaluations.length;
  }
}
