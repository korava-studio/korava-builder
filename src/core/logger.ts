const colors = {
  reset: "\x1b[0m",
  success: "\x1b[32m",
  error: "\x1b[31m",
  warn: "\x1b[33m",
  info: "\x1b[36m"
};

export class Logger {
  static success(message: string, ...rest: unknown[]) {
    console.log(`${colors.success}[SUCCESS]${colors.reset} ${message}`, ...rest);
  }

  static error(message: string, ...rest: unknown[]) {
    console.error(`${colors.error}[ERROR]${colors.reset} ${message}`, ...rest);
  }

  static warn(message: string, ...rest: unknown[]) {
    console.warn(`${colors.warn}[WARN]${colors.reset} ${message}`, ...rest);
  }

  static info(message: string, ...rest: unknown[]) {
    console.log(`${colors.info}[INFO]${colors.reset} ${message}`, ...rest);
  }
}
