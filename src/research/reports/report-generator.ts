import { TrendInsight } from "../analyzer/trend-analyzer.js";

export interface ResearchReport {
  topic: string;
  generatedAt: string;
  insights: TrendInsight[];
  summary: string;
}

export class ReportGenerator {
  generate(topic: string, insights: TrendInsight[]) {
    return {
      topic,
      generatedAt: new Date().toISOString(),
      insights,
      summary: `Generated ${insights.length} research insights for ${topic}`
    } as ResearchReport;
  }
}
