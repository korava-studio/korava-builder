import { KnowledgeNode } from "../graph/knowledge-node.js";

export class KnowledgeStore {
  private nodes = new Map<string, KnowledgeNode>();
  private history = new Map<string, KnowledgeNode[]>();

  addNode(node: KnowledgeNode) {
    if (this.exists(node.props.id)) {
      throw new Error(`Node ${node.props.id} already exists`);
    }
    this.nodes.set(node.props.id, node);
    this.history.set(node.props.id, [node]);
  }

  updateNode(node: KnowledgeNode) {
    const existing = this.getNode(node.props.id);
    if (!existing) {
      throw new Error(`Node ${node.props.id} not found`);
    }
    this.nodes.set(node.props.id, node);
    const versions = this.history.get(node.props.id) ?? [];
    versions.push(node);
    this.history.set(node.props.id, versions);
  }

  getNode(id: string) {
    return this.nodes.get(id) ?? null;
  }

  listNodes() {
    return Array.from(this.nodes.values());
  }

  listByType(type: string) {
    return this.listNodes().filter((node) => node.props.type === type);
  }

  searchByTag(tag: string) {
    return this.listNodes().filter((node) => node.tags.includes(tag));
  }

  versionHistory(id: string) {
    return this.history.get(id) ?? [];
  }

  exists(id: string) {
    return this.nodes.has(id);
  }
}
