import { ExecutiveBoard } from "../executives/executive-board.js";
import { DecisionEngine } from "../decisions/decision-engine.js";
import { StrategicPlanner } from "../planning/strategic-planner.js";
import { BusinessAnalyzer } from "../strategy/business-analyzer.js";
import { KPIEngine } from "../kpi/kpi-engine.js";
import { VisionManager } from "../vision/vision-manager.js";
import { MissionManager } from "../mission/mission-manager.js";
import { ExecutiveDashboard } from "../dashboard/executive-dashboard.js";

export class CompanyBrain {
  constructor(
    public board: ExecutiveBoard,
    public decisionEngine: DecisionEngine,
    public strategicPlanner: StrategicPlanner,
    public businessAnalyzer: BusinessAnalyzer,
    public kpiEngine: KPIEngine,
    public visionManager: VisionManager,
    public missionManager: MissionManager,
    public dashboard: ExecutiveDashboard
  ) {}

  initialize(companyName: string) {
    this.visionManager.setVision(`${companyName} will lead sustainable innovation`);
    this.missionManager.setMission(`Deliver customer-first AI solutions with secure, compliant operations.`);
    this.board.registerExecutives();
  }

  executeStrategy(goal: string) {
    const analysis = this.businessAnalyzer.analyze(goal);
    const plan = this.decisionEngine.createExecutionPlan(goal, analysis);
    this.kpiEngine.defineCompanyKPI({ id: "company-growth", name: "Company Growth", value: 1.0, unit: "%" });
    this.dashboard.refresh();
    return plan;
  }
}
