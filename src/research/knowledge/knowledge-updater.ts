import { EventBus } from "../../kernel/events/event-bus.js";
import { ResearchReport } from "../reports/report-generator.js";

export class KnowledgeUpdater {
  constructor(private bus: EventBus) {}

  async updateKnowledge(report: ResearchReport) {
    this.bus.emit("knowledge.updated", report);
    return report;
  }
}
