export class SkillManager {
  private skills = new Map<string, string[]>();

  assign(agentId: string, skills: string[]) {
    this.skills.set(agentId, [...skills]);
  }

  list(agentId: string) {
    return [...(this.skills.get(agentId) ?? [])];
  }

  hasSkill(agentId: string, skill: string) {
    return this.skills.get(agentId)?.includes(skill) ?? false;
  }
}
