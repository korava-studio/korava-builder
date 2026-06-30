export interface KPIEntry {
  id: string;
  name: string;
  value: number;
  unit: string;
  target?: number;
}

export class KPIEngine {
  private kpis = new Map<string, KPIEntry>();

  defineKPI(kpi: KPIEntry) {
    this.kpis.set(kpi.id, kpi);
  }

  defineCompanyKPI(kpi: KPIEntry) {
    this.defineKPI(kpi);
  }

  getKPI(id: string) {
    return this.kpis.get(id) ?? null;
  }

  listKPIs() {
    return Array.from(this.kpis.values());
  }
}
