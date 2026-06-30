import { Logger as CoreLogger } from "../../core/logger.js";

export class GeneratorLogger {
  static info(message: string, ...rest: unknown[]) {
    CoreLogger.info(message, ...rest);
  }

  static success(message: string, ...rest: unknown[]) {
    CoreLogger.success(message, ...rest);
  }

  static error(message: string, ...rest: unknown[]) {
    CoreLogger.error(message, ...rest);
  }
}
