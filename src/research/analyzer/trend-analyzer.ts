export interface TrendInsight {
  topic: string;
  strength: number;
  status: string;
  category: string;
  recommendedAction: string;
}

export class TrendAnalyzer {
  analyze(topic: string, sources: string[]) {
    return sources.map((source, index) => ({
      topic,
      strength: Math.max(1, 10 - index),
      status: "Assess",
      category: "AI Models",
      recommendedAction: `Review ${topic} coverage in ${source}`
    }));
  }
}
