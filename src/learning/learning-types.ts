export type SkillLevel =
  | "Junior"
  | "Intermediate"
  | "Advanced"
  | "Senior"
  | "Lead"
  | "Principal"
  | "Architect"
  | "Expert";

export type EvaluationMetric =
  | "Accuracy"
  | "Speed"
  | "CodeQuality"
  | "Security"
  | "Documentation"
  | "Automation"
  | "Innovation";

export interface ExperienceRecord {
  id: string;
  employeeId: string;
  source: string;
  description: string;
  outcome: "Completed" | "Failed" | "Learned";
  xp: number;
  relatedSkills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillRecord {
  id: string;
  name: string;
  level: SkillLevel;
  experiencePoints: number;
  description: string;
  owner: string;
  lastUpdated: string;
}

export interface CourseRecord {
  id: string;
  title: string;
  category: string;
  description: string;
  durationHours: number;
  recommendedFor: string[];
  createdAt: string;
}

export interface EvaluationRecord {
  id: string;
  employeeId: string;
  metric: EvaluationMetric;
  score: number;
  notes: string;
  createdAt: string;
}
