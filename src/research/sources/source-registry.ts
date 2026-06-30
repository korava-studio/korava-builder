export type ResearchSource = string;

export class SourceRegistry {
  private sources = new Set<ResearchSource>();

  register(source: ResearchSource) {
    this.sources.add(source);
  }

  list() {
    return Array.from(this.sources.values());
  }

  exists(source: ResearchSource) {
    return this.sources.has(source);
  }
}
