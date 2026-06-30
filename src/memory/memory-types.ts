export type MemoryType =
  | "WorkingMemory"
  | "ShortTermMemory"
  | "LongTermMemory"
  | "SemanticMemory"
  | "ProceduralMemory"
  | "SharedMemory"
  | "WorkspaceMemory"
  | "CompanyMemory";

export type Visibility = "Private" | "Internal" | "Public";

export type ImportanceLevel = "Critical" | "High" | "Medium" | "Low" | "Temporary";

export interface MemoryEntry {
  id: string;
  title: string;
  content: string;
  summary: string;
  embedding?: number[];
  tags: string[];
  importance: ImportanceLevel;
  createdAt: string;
  updatedAt: string;
  owner: string;
  visibility: Visibility;
  type: MemoryType;
  archived?: boolean;
}
