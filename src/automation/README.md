# Automation Engine

The Automation Engine manages connectors, job queues, scheduling, execution, and monitoring.

## Components

- `engine/AutomationEngine` — main automation orchestrator
- `connectors/` — independent adapter connectors for external systems
- `registry/ConnectorRegistry` — connector registration and lookup
- `jobs/JobQueue` — queue and job lifecycle management
- `executors/JobExecutor` — task execution and result handling
- `scheduler/AutomationScheduler` — selects pending jobs for execution
- `monitor/AutomationMonitor` — captures execution history and errors
- `events/AutomationEvents` — connector and job lifecycle events
