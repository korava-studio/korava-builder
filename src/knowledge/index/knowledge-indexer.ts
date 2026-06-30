import { KnowledgeNode } from "../graph/knowledge-node.js";
import { KnowledgeStore } from "../storage/knowledge-store.js";

export class KnowledgeIndexer {
  private keywordIndex = new Map<string, Set<string>>();

  constructor(private store: KnowledgeStore) {}

  indexNode(node: KnowledgeNode) {
    this.removeNode(node.props.id);
    this.indexKeywords(node);
  }

  searchKeywords(keyword: string) {
    const ids = this.keywordIndex.get(keyword.toLowerCase()) ?? new Set();
    return Array.from(ids).map((id) => this.store.getNode(id)).filter((node): node is KnowledgeNode => !!node);
  }

  private indexKeywords(node: KnowledgeNode) {
    const terms = [node.props.title, node.props.description, ...(node.tags ?? [])];
    for (const term of terms) {
      term
        .split(/\W+/)
        .filter(Boolean)
        .map((value) => value.toLowerCase())
        .forEach((token) => {
          const set = this.keywordIndex.get(token) ?? new Set();
          set.add(node.props.id);
          this.keywordIndex.set(token, set);
        });
    }
  }

  private removeNode(id: string) {
    for (const [keyword, ids] of this.keywordIndex.entries()) {
      if (ids.has(id)) {
        ids.delete(id);
        if (ids.size === 0) {
          this.keywordIndex.delete(keyword);
        }
      }
    }
  }
}
