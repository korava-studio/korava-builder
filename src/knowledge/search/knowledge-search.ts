import { KnowledgeStore } from "../storage/knowledge-store.js";
import { KnowledgeIndexer } from "../index/knowledge-indexer.js";
import { RelationshipEngine } from "../relationships/relationship-engine.js";
import { KnowledgeNode } from "../graph/knowledge-node.js";

export class KnowledgeSearch {
  constructor(private store: KnowledgeStore, private indexer: KnowledgeIndexer) {}

  keyword(query: string) {
    return this.indexer.searchKeywords(query);
  }

  type(type: string) {
    return this.store.listByType(type);
  }

  tag(tag: string) {
    return this.store.searchByTag(tag);
  }

  relationship(type: string) {
    const edges = this.relationships.getByType(type);
    return edges.map((edge) => this.store.getNode(edge.source)!).filter((node): node is KnowledgeNode => !!node);
  }

  semantic(query: string) {
    return this.keyword(query);
  }

  private get relationships() {
    return (this.store as any).relationships as RelationshipEngine;
  }
}
