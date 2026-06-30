export interface BusinessAnalysis {
  priorityArea: "Revenue" | "Growth" | "Performance" | "Products" | "Employees" | "Automation" | "Research";
  impactScore: number;
  resourceNeed: string;
}

export class BusinessAnalyzer {
  analyze(goal: string) {
    const area = goal.includes("research") ? "Research" : goal.includes("revenue") ? "Revenue" : "Growth";
    const impactScore = Math.min(10, Math.max(1, goal.length % 10 + 1));
    return {
      priorityArea: area,
      impactScore,
      resourceNeed: area === "Research" ? "R&D" : "Core teams"
    } as BusinessAnalysis;
  }
}
