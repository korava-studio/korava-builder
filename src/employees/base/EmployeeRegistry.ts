import { Employee } from "./Employee.js";

export class EmployeeRegistry {
  private employees = new Map<string, Employee>();

  register(employee: Employee) {
    this.employees.set(employee.id, employee);
    return employee;
  }

  remove(id: string) {
    return this.employees.delete(id);
  }

  find(id: string) {
    return this.employees.get(id) ?? null;
  }

  findByRole(role: string) {
    return Array.from(this.employees.values()).filter((employee) => employee.role === role);
  }

  findByDepartment(department: string) {
    return Array.from(this.employees.values()).filter((employee) => employee.department === department);
  }

  broadcast(message: string) {
    for (const employee of this.employees.values()) {
      employee.learn(message);
    }
  }

  list() {
    return Array.from(this.employees.values());
  }
}
