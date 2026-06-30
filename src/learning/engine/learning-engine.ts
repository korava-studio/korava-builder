import { KnowledgeStore } from "../../knowledge/storage/knowledge-store.js";
import { ExperienceRecord } from "../learning-types.js";
import { MemoryEngine } from "../../memory/core/memory-engine.js";
import { ExperienceManager } from "../experience/experience-manager.js";
import { SkillManager } from "../skills/skill-manager.js";
import { RecommendationEngine } from "../recommendation/recommendation-engine.js";
import { LearningAnalytics } from "../analytics/learning-analytics.js";

export class LearningEngine {
  constructor(
    private experienceManager: ExperienceManager,
    private skillManager: SkillManager,
    private recommendationEngine: RecommendationEngine,
    private analytics: LearningAnalytics,
    private knowledgeStore: KnowledgeStore,
    private memoryEngine: MemoryEngine
  ) {}

  ingestExperience(record: ExperienceRecord) {
    const stored = this.experienceManager.record(record);
    this.skillManager.applyExperience(record.employeeId, record.relatedSkills, record.xp);
    this.analytics.trackExperience(record);
    this.memoryEngine.remember({
      id: record.id,
      title: `Experience ${record.id}`,
      content: record.description,
      summary: record.outcome,
      tags: record.relatedSkills,
      importance: record.xp >= 50 ? "High" : "Medium",
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      owner: record.employeeId,
      visibility: "Internal" as const,
      type: "ProceduralMemory"
    });
    return stored;
  }

  evaluate(employeeId: string) {
    const evaluations = this.analytics.getEvaluations(employeeId);
    return this.recommendationEngine.suggest(employeeId, evaluations);
  }

  learnFromKnowledge() {
    return this.knowledgeStore.listNodes().map((node) => node.props.title);
  }
}
