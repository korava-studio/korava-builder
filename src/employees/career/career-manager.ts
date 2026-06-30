import { EmployeeProfileModel } from "../profiles/employee-profile.js";

export class CareerManager {
  updateCareerPath(employee: EmployeeProfileModel, nextLevel: string) {
    employee.profile.experienceLevel = nextLevel as typeof employee.profile.experienceLevel;
  }
}
