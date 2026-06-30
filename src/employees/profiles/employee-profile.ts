import { EmployeeRole, EmployeeDepartment, ExperienceLevel } from "../organization/organization-chart.js";

export interface EmployeeProfile {
  id: string;
  name: string;
  role: EmployeeRole;
  department: EmployeeDepartment;
  skills: string[];
  experienceLevel: ExperienceLevel;
  responsibilities: string[];
  goals: string[];
  kpis: string[];
  reportsTo?: string;
  reports: string[];
}

export class EmployeeProfileModel {
  constructor(public profile: EmployeeProfile) {}

  updateSkills(skills: string[]) {
    this.profile.skills = [...skills];
  }

  addGoal(goal: string) {
    this.profile.goals.push(goal);
  }

  addReport(employeeId: string) {
    this.profile.reports.push(employeeId);
  }
}
