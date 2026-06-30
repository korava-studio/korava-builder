export class VisionManager {
  private vision = "";

  setVision(text: string) {
    this.vision = text;
  }

  getVision() {
    return this.vision;
  }
}
