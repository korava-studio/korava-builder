import { EmployeeMemory } from "./EmployeeMemory.js";
import { EmployeeEventType, EmployeeEventListener } from "./EmployeeEvents.js";

export type EmployeeRole = string;
export type EmployeeDepartment = string;
export type EmployeePermission = string;
export type EmployeeStatus =
  | "initialized"
  | "ready"
  | "running"
  | "completed"
  | "failed"
  | "retired";

export interface EmployeeConfig {
  id: string;
  name: string;
  role: EmployeeRole;
  department: EmployeeDepartment;
  skills?: string[];
  status?: EmployeeStatus;
  version?: string;
  goals?: string[];
  permissions?: EmployeePermission[];
}

export class Employee {
  public skills: string[];
  public status: EmployeeStatus;
  public version: string;
  public memory: EmployeeMemory;
  public goals: string[];
  public permissions: EmployeePermission[];
  private listeners = new Map<EmployeeEventType, EmployeeEventListener[]>();

  constructor(public id: string, public name: string, public role: EmployeeRole, public department: EmployeeDepartment, config?: Partial<EmployeeConfig>) {
    this.skills = config?.skills ?? [];
    this.status = config?.status ?? "initialized";
    this.version = config?.version ?? "1.0.0";
    this.goals = config?.goals ?? [];
    this.permissions = config?.permissions ?? [];
    this.memory = new EmployeeMemory();
  }

  initialize() {
    this.status = "ready";
    this.emit(EmployeeEventType.EmployeeCreated, { employeeId: this.id, timestamp: new Date().toISOString() });
    return this;
  }

  execute(task: string) {
    this.status = "running";
    this.memory.addShortTerm(`Executing ${task}`);
    this.emit(EmployeeEventType.EmployeeStarted, { employeeId: this.id, timestamp: new Date().toISOString(), task });
    const result = `Task ${task} executed by ${this.name}`;
    this.memory.addExperience(result);
    this.memory.addKnowledge(task);
    this.status = "completed";
    this.emit(EmployeeEventType.EmployeeFinishedTask, { employeeId: this.id, timestamp: new Date().toISOString(), task });
    return result;
  }

  learn(result: string) {
    this.memory.addKnowledge(result);
    this.memory.addLongTerm(result);
    return this;
  }

  communicate(employee: Employee) {
    employee.receiveCommunication(this.id);
    return true;
  }

  report() {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      department: this.department,
      status: this.status,
      version: this.version,
      goals: [...this.goals],
      skills: [...this.skills],
      permissions: [...this.permissions],
      memory: this.memory.export()
    };
  }

  shutdown() {
    this.status = "retired";
    this.emit(EmployeeEventType.EmployeeRetired, { employeeId: this.id, timestamp: new Date().toISOString() });
    return this;
  }

  on(event: EmployeeEventType, listener: EmployeeEventListener) {
    const set = this.listeners.get(event) ?? [];
    set.push(listener);
    this.listeners.set(event, set);
  }

  private emit(event: EmployeeEventType, payload: { employeeId: string; timestamp: string; task?: string; reason?: string }) {
    const listeners = this.listeners.get(event) ?? [];
    for (const listener of listeners) {
      listener(payload);
    }
  }

  private receiveCommunication(senderId: string) {
    this.memory.addShortTerm(`Received communication from ${senderId}`);
  }
}
