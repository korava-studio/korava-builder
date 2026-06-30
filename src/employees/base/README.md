# Employees Base

This directory provides the core Digital Workforce primitives used by the KORAVA employee architecture.

## Components

- `Employee.ts` — base employee class with lifecycle, memory, communication, and reporting.
- `EmployeeMemory.ts` — short-term, long-term, knowledge, and experience memory storage.
- `EmployeeEvents.ts` — shared employee event types and payload contract.
- `EmployeeRegistry.ts` — in-memory registry for employee lookup, filtering, and broadcast.
- `EmployeeFactory.ts` — factory for creating employee instances from configuration.
