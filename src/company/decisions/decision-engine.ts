import { BusinessAnalysis } from "../strategy/business-analyzer.js";

export interface DecisionPlan {
  goal: string;
  summary: string;
  costEstimate: number;
  riskEstimate: number;
  timeEstimateDays: number;
  department: string;
  steps: string[];
}

export class DecisionEngine {
  receiveGoal(goal: string) {
    return { goal, receivedAt: new Date().toISOString() };
  }

  analyze(goal: string, analysis: BusinessAnalysis) {
    return `${goal} requires focus on ${analysis.priorityArea}`;
  }

  estimateCost(goal: string, analysis: BusinessAnalysis) {
    return Math.max(10, Math.min(100, analysis.impactScore * 10));
  }

  estimateRisk(goal: string, analysis: BusinessAnalysis) {
    return Math.max(1, Math.min(10, analysis.impactScore / 2));
  }

  estimateTime(goal: string, analysis: BusinessAnalysis) {
    return Math.ceil(analysis.impactScore * 7);
  }

  assignDepartment(goal: string, analysis: BusinessAnalysis) {
    return analysis.priorityArea === "Research" ? "Research" : "Operations";
  }

  createExecutionPlan(goal: string, analysis: BusinessAnalysis): DecisionPlan {
    return {
      goal,
      summary: this.analyze(goal, analysis),
      costEstimate: this.estimateCost(goal, analysis),
      riskEstimate: this.estimateRisk(goal, analysis),
      timeEstimateDays: this.estimateTime(goal, analysis),
      department: this.assignDepartment(goal, analysis),
      steps: ["Validate objectives", "Align stakeholders", "Launch execution", "Review outcomes"]
    };
  }
}
