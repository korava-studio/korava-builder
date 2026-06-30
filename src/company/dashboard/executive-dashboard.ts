import { ExecutiveBoard } from "../executives/executive-board.js";
import { KPIEngine } from "../kpi/kpi-engine.js";

export interface DashboardStatus {
  companyHealth: string;
  security: string;
  automation: string;
  research: string;
  projects: string;
  revenue: string;
  products: string;
  roadmap: string;
}

export class ExecutiveDashboard {
  constructor(private board: ExecutiveBoard, private kpiEngine: KPIEngine) {}

  refresh() {
    const kpis = this.kpiEngine.listKPIs();
    return {
      companyHealth: "stable",
      security: "monitored",
      automation: "active",
      research: "growing",
      projects: `${kpis.length} KPIs tracked`,
      revenue: "tracking",
      products: "roadmapped",
      roadmap: "approved"
    } as DashboardStatus;
  }
}
