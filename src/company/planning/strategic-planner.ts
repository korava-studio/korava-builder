export interface PlanningHorizon {
  period: string;
  goals: string[];
}

export class StrategicPlanner {
  planQuarterly(goals: string[]) {
    return { period: "quarterly", goals } as PlanningHorizon;
  }

  planAnnual(goals: string[]) {
    return { period: "annual", goals } as PlanningHorizon;
  }

  planFiveYear(goals: string[]) {
    return { period: "five-year", goals } as PlanningHorizon;
  }

  prioritize(goals: string[]) {
    return [...goals].sort((a, b) => a.length - b.length);
  }
}
