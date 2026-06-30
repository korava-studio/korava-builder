import { KnowledgeStore } from "../storage/knowledge-store.js";
import { KnowledgeNode } from "../graph/knowledge-node.js";

export class KnowledgeSync {
  constructor(private store: KnowledgeStore) {}

  syncWorkspace(nodes: KnowledgeNode[]) {
    nodes.forEach((node) => {
      if (!this.store.exists(node.props.id)) {
        this.store.addNode(node);
      }
    });
  }

  syncAgents(nodes: KnowledgeNode[]) {
    this.syncWorkspace(nodes);
  }

  syncProjects(nodes: KnowledgeNode[]) {
    this.syncWorkspace(nodes);
  }

  syncMemory(nodes: KnowledgeNode[]) {
    this.syncWorkspace(nodes);
  }

  syncResearch(nodes: KnowledgeNode[]) {
    this.syncWorkspace(nodes);
  }
}
