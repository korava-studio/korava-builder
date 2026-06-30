import { Logger } from "../core/logger.js";
import { FileSystemSDK } from "../sdk/filesystem/filesystem-sdk.js";
import { ConfigurationSDK } from "../sdk/configuration/configuration-sdk.js";
import { WorkflowSDK } from "../sdk/workflow/workflow-sdk.js";
import { EventBus } from "../kernel/events/event-bus.js";

export class PluginContext {
  public logger = Logger;
  public fs = new FileSystemSDK();
  public config = new ConfigurationSDK();
  public workflow = new WorkflowSDK();
  public events: EventBus;

  constructor(events?: EventBus) {
    this.events = events ?? new EventBus();
  }
}
