import { Employee, EmployeeConfig } from "./Employee.js";

export class EmployeeFactory {
  create(config: EmployeeConfig) {
    return new Employee(config.id, config.name, config.role, config.department, config);
  }
}
