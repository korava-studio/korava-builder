import { KnowledgeStore } from "../storage/knowledge-store.js";
import { KnowledgeNode } from "../graph/knowledge-node.js";

export class LearningEngine {
  constructor(private store: KnowledgeStore) {}

  captureDecision(node: KnowledgeNode) {
    this.store.addNode(node);
  }

  captureResearch(node: KnowledgeNode) {
    this.store.addNode(node);
  }

  captureWorkflow(node: KnowledgeNode) {
    this.store.addNode(node);
  }

  captureArchitecture(node: KnowledgeNode) {
    this.store.addNode(node);
  }

  reusableSolutions(tags: string[]) {
    return this.store.listNodes().filter((node) => tags.some((tag) => node.tags.includes(tag)));
  }
}
