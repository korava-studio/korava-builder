import { AcademyManager } from "../academy/academy-manager.js";
import { EvaluationRecord } from "../learning-types.js";

export class RecommendationEngine {
  constructor(private academy: AcademyManager) {}

  suggest(employeeId: string, evaluations: EvaluationRecord[]) {
    const weakMetrics = evaluations.filter((record) => record.score < 75).map((record) => record.metric);
    return this.academy
      .listCourses()
      .filter((course) => weakMetrics.some((metric) => course.category.toLowerCase().includes(metric.toLowerCase())));
  }
}
