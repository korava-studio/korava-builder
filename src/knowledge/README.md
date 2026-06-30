# Knowledge Graph Engine

The Knowledge Graph Engine stores nodes, relationships, search indices, and learning artifacts for KORAVA.

## Components

- `graph/KnowledgeGraph` — orchestrates graph operations
- `storage/KnowledgeStore` — stores nodes and version history
- `search/KnowledgeSearch` — keyword/tag/type/relationship search
- `index/KnowledgeIndexer` — extracts keywords and builds search index
- `relationships/RelationshipEngine` — maintains typed edges
- `learning/LearningEngine` — captures decisions, research, and reusable insights
- `sync/KnowledgeSync` — syncs nodes across workspace/agents/projects/research
- `taxonomy/` — domain node and relationship types
