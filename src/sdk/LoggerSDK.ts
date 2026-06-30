import { Logger } from "../core/logger.js";

export class LoggerSDK {
  info(message: string, ...rest: unknown[]) {
    Logger.info(message, ...rest);
  }
  success(message: string, ...rest: unknown[]) {
    Logger.success(message, ...rest);
  }
  error(message: string, ...rest: unknown[]) {
    Logger.error(message, ...rest);
  }
  warn(message: string, ...rest: unknown[]) {
    Logger.warn(message, ...rest);
  }
}
