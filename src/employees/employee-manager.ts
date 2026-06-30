import { EmployeeProfileModel } from "./profiles/employee-profile.js";
import { PerformanceEngine } from "./performance/performance-engine.js";
import { TrainingEngine } from "./training/training-engine.js";
import { AcademyEngine } from "./academy/academy-engine.js";
import { PromotionEngine } from "./promotion/promotion-engine.js";
import { CareerManager } from "./career/career-manager.js";
import { ReviewManager } from "./reviews/review-manager.js";
import { OrganizationChart, OrganizationNode } from "./organization/organization-chart.js";

export class EmployeeManager {
  private employees = new Map<string, EmployeeProfileModel>();

  constructor(
    public performance: PerformanceEngine,
    public training: TrainingEngine,
    public academy: AcademyEngine,
    public promotion: PromotionEngine,
    public career: CareerManager,
    public reviews: ReviewManager,
    public organization: OrganizationChart
  ) {}

  addEmployee(profile: EmployeeProfileModel) {
    this.employees.set(profile.profile.id, profile);
    this.organization.addNode({
      id: profile.profile.id,
      name: profile.profile.name,
      role: profile.profile.role,
      department: profile.profile.department,
      reportsTo: profile.profile.reportsTo,
      reports: profile.profile.reports
    });
  }

  getEmployee(id: string) {
    return this.employees.get(id) ?? null;
  }

  listEmployees() {
    return Array.from(this.employees.values());
  }

  createEmployee(profile: EmployeeProfileModel) {
    this.addEmployee(profile);
    return profile;
  }
}
