import { SkillRecord } from "../learning-types.js";

export class SkillManager {
  private skills = new Map<string, Map<string, SkillRecord>>();

  assignSkill(employeeId: string, skill: SkillRecord) {
    const skills = this.skills.get(employeeId) ?? new Map();
    skills.set(skill.id, { ...skill });
    this.skills.set(employeeId, skills);
    return skill;
  }

  listSkills(employeeId: string) {
    return Array.from(this.skills.get(employeeId)?.values() ?? []);
  }

  applyExperience(employeeId: string, skillNames: string[], xp: number) {
    const skills = this.skills.get(employeeId) ?? new Map();
    skillNames.forEach((name) => {
      const skill = Array.from(skills.values()).find((item) => item.name === name);
      if (skill) {
        skill.experiencePoints += xp;
        skill.level = this.promote(skill.experiencePoints);
        skill.lastUpdated = new Date().toISOString();
      }
    });
    this.skills.set(employeeId, skills);
  }

  private promote(xp: number) {
    if (xp >= 1000) return "Expert";
    if (xp >= 750) return "Architect";
    if (xp >= 500) return "Principal";
    if (xp >= 300) return "Lead";
    if (xp >= 180) return "Senior";
    if (xp >= 100) return "Advanced";
    if (xp >= 40) return "Intermediate";
    return "Junior";
  }
}
