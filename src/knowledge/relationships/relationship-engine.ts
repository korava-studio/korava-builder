import { KnowledgeStore } from "../storage/knowledge-store.js";

export interface RelationshipEdge {
  source: string;
  target: string;
  type: string;
  createdAt: string;
}

export class RelationshipEngine {
  private relationships: RelationshipEdge[] = [];

  constructor(private store: KnowledgeStore) {}

  addRelationship(source: string, target: string, type: string) {
    if (!this.store.exists(source) || !this.store.exists(target)) {
      throw new Error("Source or target node does not exist");
    }
    this.relationships.push({ source, target, type, createdAt: new Date().toISOString() });
  }

  getByType(type: string) {
    return this.relationships.filter((edge) => edge.type === type);
  }

  getByNode(id: string) {
    return this.relationships.filter((edge) => edge.source === id || edge.target === id);
  }
}
