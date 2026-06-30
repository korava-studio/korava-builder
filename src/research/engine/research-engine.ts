import { EventBus } from "../../kernel/events/event-bus.js";
import { SourceRegistry } from "../sources/source-registry.js";
import { ResearchScheduler } from "../scheduler/research-scheduler.js";
import { TrendAnalyzer } from "../analyzer/trend-analyzer.js";
import { ReportGenerator } from "../reports/report-generator.js";
import { KnowledgeUpdater } from "../knowledge/knowledge-updater.js";

export class ResearchEngine {
  public sources = new SourceRegistry();
  public scheduler = new ResearchScheduler();
  public analyzer = new TrendAnalyzer();
  public reporter = new ReportGenerator();
  public updater: KnowledgeUpdater;

  constructor(private bus: EventBus) {
    this.updater = new KnowledgeUpdater(this.bus);
  }

  registerSource(source: string) {
    this.sources.register(source);
  }

  async analyze(topic: string) {
    const trends = this.analyzer.analyze(topic, this.sources.list());
    const report = this.reporter.generate(topic, trends);
    await this.updater.updateKnowledge(report);
    return report;
  }
}
