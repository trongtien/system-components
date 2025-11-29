# @kevid/system-components

Reusable system components built with Svelte for use in turbo monorepos.

## Installation

```bash
npm install @kevid/system-components
# or
pnpm add @kevid/system-components
# or
yarn add @kevid/system-components
```

## Usage

### In a Turbo Repo

1. Add this package to your turbo repo's `packages` directory:

```json
// In your root package.json
{
  "workspaces": ["packages/*", "apps/*"]
}
```

2. Reference it in other packages:

```json
// In your app's package.json
{
  "dependencies": {
    "@kevid/system-components": "workspace:*"
  }
}
```

3. Use the components:

```svelte
<script>
  import { Button, Input, Typography } from '@kevid/system-components';
</script>

<Button variant="primary" on:click={() => console.log('clicked')}>
  Click me
</Button>
```

### Standalone Development

```bash
# Install dependencies
pnpm install

# Start Storybook for development
pnpm dev

# Build the library
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Available Components

- `Button` - Customizable button component
- `Input` - Form input component
- `Typography` - Text styling component
- `Notify` - Notification component

## Development

### Scripts

- `pnpm dev` - Start Storybook development server
- `pnpm dev:lib` - Build library in watch mode
- `pnpm build` - Build the library for production
- `pnpm test` - Run tests
- `pnpm lint` - Lint code
- `pnpm format` - Format code with Prettier

### Project Structure

```
src/
├── components/         # Svelte components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── styles/            # Global styles
└── index.ts          # Main export file
```

## Turbo Configuration

This package includes `turbo.json` configuration for optimal caching and task orchestration in turbo monorepos.

## Peer Dependencies

- `svelte`: ^5.0.0

## License

MIT