# korava-builder
The AI-powered builder for the KORAVA ecosystem.

## Architecture

KORAVA Builder uses a layered architecture with a core runtime, plugin loader, command registry, and project generation services. Plugins can extend functionality by registering commands dynamically.

## Development Workflow

- Run `npm run build` to compile the project.
- Use `npm run dev -- <command>` during development.
- Keep code small, strictly typed, and well-documented.
- Update docs when adding features.

## Sprint Workflow

1. Define a clear sprint goal.
2. Implement small, testable changes.
3. Validate with a build before commit.
4. Document architecture and behavior.
5. Mark the sprint complete only after successful build.
