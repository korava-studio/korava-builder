import { KnowledgeNode } from "./knowledge-node.js";
import { KnowledgeStore } from "../storage/knowledge-store.js";
import { KnowledgeIndexer } from "../index/knowledge-indexer.js";
import { KnowledgeSearch } from "../search/knowledge-search.js";
import { RelationshipEngine } from "../relationships/relationship-engine.js";
import { LearningEngine } from "../learning/learning-engine.js";
import { KnowledgeSync } from "../sync/knowledge-sync.js";

export class KnowledgeGraph {
  public store = new KnowledgeStore();
  public indexer = new KnowledgeIndexer(this.store);
  public search = new KnowledgeSearch(this.store, this.indexer);
  public relationships = new RelationshipEngine(this.store);
  public learning = new LearningEngine(this.store);
  public sync = new KnowledgeSync(this.store);

  addNode(node: KnowledgeNode) {
    this.store.addNode(node);
    this.indexer.indexNode(node);
  }

  updateNode(node: KnowledgeNode) {
    this.store.updateNode(node);
    this.indexer.indexNode(node);
  }

  link(sourceId: string, targetId: string, type: string) {
    this.relationships.addRelationship(sourceId, targetId, type);
  }
}
