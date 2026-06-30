import { KnowledgeNodeType } from "../taxonomy/node-types.js";

export interface KnowledgeNodeProps {
  id: string;
  type: KnowledgeNodeType;
  title: string;
  description: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  version?: string;
}

export class KnowledgeNode {
  public tags: string[];
  public metadata: Record<string, unknown>;
  public version: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(public props: KnowledgeNodeProps) {
    this.tags = [...(props.tags ?? [])];
    this.metadata = { ...(props.metadata ?? {}) };
    this.version = props.version ?? "1.0";
    const now = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
  }

  update(description: string, tags: string[] = [], metadata: Record<string, unknown> = {}) {
    this.props.description = description;
    this.tags = [...tags];
    this.metadata = { ...metadata };
    this.updatedAt = new Date().toISOString();
    this.version = this.bumpVersion(this.version);
  }

  private bumpVersion(version: string) {
    const components = version.split(".").map((value) => parseInt(value, 10));
    const next = components.map((value) => (Number.isNaN(value) ? 0 : value));
    next[next.length - 1] = next[next.length - 1] + 1;
    return next.join(".");
  }
}
