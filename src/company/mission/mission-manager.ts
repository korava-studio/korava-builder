export class MissionManager {
  private mission = "";

  setMission(text: string) {
    this.mission = text;
  }

  getMission() {
    return this.mission;
  }
}
