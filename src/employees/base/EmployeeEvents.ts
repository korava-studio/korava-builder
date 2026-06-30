export enum EmployeeEventType {
  EmployeeCreated = "EmployeeCreated",
  EmployeeStarted = "EmployeeStarted",
  EmployeeFinishedTask = "EmployeeFinishedTask",
  EmployeeFailedTask = "EmployeeFailedTask",
  EmployeePromoted = "EmployeePromoted",
  EmployeeRetired = "EmployeeRetired"
}

export interface EmployeeEventPayload {
  employeeId: string;
  timestamp: string;
  detail?: string;
  task?: string;
  reason?: string;
}

export type EmployeeEventListener = (payload: EmployeeEventPayload) => void;
