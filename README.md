# korava-builder
The AI-powered builder for the KORAVA ecosystem.

## Architecture

KORAVA Builder uses a layered architecture with a core runtime, plugin loader, command registry, and project generation services. Plugins can extend functionality by registering commands dynamically.

## Development Workflow


## Sprint Workflow

1. Define a clear sprint goal.
2. Implement small, testable changes.
3. Validate with a build before commit.
4. Document architecture and behavior.
5. Mark the sprint complete only after successful build.

## Kernel

The KORAVA Kernel is the operating core that boots the system, loads configuration, services, modules, plugins and the AI runtime. Use the `Kernel` class in `src/kernel/kernel.ts` to start the system programmatically.

## SDK

The internal SDKs are located under `src/sdk/` and provide injectable, single-responsibility services used across the codebase: filesystem, templates, workflow, plugins, configuration and validation.

## Quick Start

Build the project:

```bash
npm run build
```

Run the CLI (development mode):

```bash
npm run dev -- plugins
```

For module authors: add a `modules/<name>/module.json` and register modules via the Kernel's service container.
