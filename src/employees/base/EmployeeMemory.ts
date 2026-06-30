export interface EmployeeMemoryContent {
  shortTermMemory: string[];
  longTermMemory: string[];
  knowledge: string[];
  experience: string[];
}

export class EmployeeMemory {
  private memory: EmployeeMemoryContent = {
    shortTermMemory: [],
    longTermMemory: [],
    knowledge: [],
    experience: []
  };

  addShortTerm(entry: string) {
    this.memory.shortTermMemory.push(entry);
  }

  addLongTerm(entry: string) {
    this.memory.longTermMemory.push(entry);
  }

  addKnowledge(entry: string) {
    this.memory.knowledge.push(entry);
  }

  addExperience(entry: string) {
    this.memory.experience.push(entry);
  }

  recallShortTerm() {
    return [...this.memory.shortTermMemory];
  }

  recallLongTerm() {
    return [...this.memory.longTermMemory];
  }

  recallKnowledge() {
    return [...this.memory.knowledge];
  }

  recallExperience() {
    return [...this.memory.experience];
  }

  clearShortTerm() {
    this.memory.shortTermMemory = [];
  }

  export() {
    return { ...this.memory };
  }
}
