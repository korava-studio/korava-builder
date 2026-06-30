export interface TrainingProgram {
  id: string;
  title: string;
  type: "course" | "book" | "research" | "internal" | "bestPractice";
  completed: boolean;
}

export class TrainingEngine {
  private programs = new Map<string, TrainingProgram[]>();

  assignTraining(employeeId: string, program: TrainingProgram) {
    const current = this.programs.get(employeeId) ?? [];
    current.push(program);
    this.programs.set(employeeId, current);
  }

  getTraining(employeeId: string) {
    return this.programs.get(employeeId) ?? [];
  }

  completeTraining(employeeId: string, programId: string) {
    const current = this.programs.get(employeeId) ?? [];
    const program = current.find((item) => item.id === programId);
    if (program) {
      program.completed = true;
    }
  }
}
