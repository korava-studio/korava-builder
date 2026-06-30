export class EncryptionManager {
  private key = "korava-security-key";

  encrypt(value: string) {
    return Buffer.from(`${value}:${this.key}`).toString("base64");
  }

  decrypt(payload: string) {
    const decoded = Buffer.from(payload, "base64").toString("utf8");
    return decoded.replace(`:${this.key}`, "");
  }
}
