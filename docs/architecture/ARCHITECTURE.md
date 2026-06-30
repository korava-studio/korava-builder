# KORAVA Builder Architecture

The KORAVA Builder is organized as a layered architecture with clear separation between core runtime, plugin loading, command registration, and project generation.

Layers:
- Core: command registry, logging, and startup orchestration
- Plugin System: plugin discovery, validation, and dynamic command registration
- Services: feature-specific generators and validators
- Templates: manifest-driven scaffolding and renderers

Each layer depends only on the layer below it. This enables testability, maintainability, and safe extension through plugins.
