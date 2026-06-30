import { Logger } from "../../core/logger.js";

export class SecurityManager {
  checkPermissions(_subject: string, _action: string) {
    // placeholder: enforced by governance policies
    Logger.info("SecurityManager: permission check (mock)");
    return true;
  }
}
