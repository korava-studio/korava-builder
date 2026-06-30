export interface PromotionMetrics {
  performanceScore: number;
  knowledgeScore: number;
  leadershipScore: number;
  securityScore: number;
}

export interface PromotionDecision {
  employeeId: string;
  eligible: boolean;
  recommendedLevel?: string;
  reason: string;
}

export class PromotionEngine {
  evaluate(employeeId: string, metrics: PromotionMetrics) {
    const score = metrics.performanceScore + metrics.knowledgeScore + metrics.leadershipScore + metrics.securityScore;
    const eligible = score >= 340;
    return {
      employeeId,
      eligible,
      recommendedLevel: eligible ? "Senior" : "Mid",
      reason: eligible ? "High readiness" : "Continued development required"
    } as PromotionDecision;
  }
}
