# Code Generation Architecture Documentation

## Overview
This document outlines the modular architecture for the React types generator system. The original large `generate-react-types.mjs` file has been split into focused, maintainable modules.

## File Structure

```
scripts/
├── generate-react-types.mjs          # Main entry point
├── utils/                            # Utility modules
│   ├── logger.mjs                    # Consistent logging
│   └── file-scanner.mjs              # Component scanning utilities
└── generators/                       # Code generation modules
    ├── interface-generator.mjs       # TypeScript interface generation
    ├── react-components.mjs          # React component wrappers
    ├── react-types.mjs              # React TypeScript definitions
    └── typescript-definitions.mjs    # Custom element definitions
```

## Module Documentation

### 📁 `utils/`

#### `logger.mjs`
**Purpose**: Provide consistent logging with proper formatting across all modules

**Functions**:
- `log.info(message)` - General information with `->` prefix
- `log.success(message)` - Success messages with `[Success]:` prefix  
- `log.error(message)` - Error messages with `[Error]:` prefix
- `log.warning(message)` - Warning messages with `[Warning]:` prefix

**Used by**: All modules requiring logging functionality

**Dependencies**: None (pure utility)

---

#### `file-scanner.mjs`  
**Purpose**: Scan and extract information from Svelte components and TypeScript type files

**Functions**:
- `extractComponentConfigs()` - Main function to scan all .svelte files and extract configurations
- `extractPropsFromTypeFile(typeContent)` - Parse TypeScript interface from .type.ts files
- `getDefaultPropsForComponent(componentName)` - Get props for a component with fallbacks
- `getManualComponentConfigs()` - Manual component configuration generation (fallback)

**Used by**: 
- `generate-react-types.mjs` (main entry point)
- All generator modules that need component scanning

**Dependencies**: 
- Node.js fs, path modules
- `./logger.mjs` for consistent logging

---

### 📁 `generators/`

#### `interface-generator.mjs`
**Purpose**: Generate TypeScript interface definitions automatically from component type files

**Functions**:
- `generateGenericInterface(componentName, baseInterface)` - Create TypeScript interface from component props with React-friendly types

**Used by**: 
- `generators/react-types.mjs` for generating React TypeScript definitions
- `generators/typescript-definitions.mjs` for component interfaces

**Dependencies**: 
- Node.js fs, path modules
- `utils/file-scanner.mjs` for prop extraction
- `utils/logger.mjs` for logging

---

#### `react-components.mjs`
**Purpose**: Generate React wrapper components that render native HTML elements

**Functions**:
- `generateReactComponents()` - Main function to generate all React component wrappers
- `generateButtonComponent(config)` - Generate Button component implementation
- `generateTypographyComponent(config)` - Generate Typography component implementation  
- `generateInputComponent(config)` - Generate Input component implementation
- `generateGenericComponent(elementType, config)` - Generate generic HTML element wrapper

**Used by**: 
- `generate-react-types.mjs` (main entry point)

**Dependencies**: 
- `utils/file-scanner.mjs` for component configurations
- `utils/logger.mjs` for logging

---

#### `react-types.mjs`
**Purpose**: Generate TypeScript definition files for React components with proper interfaces

**Functions**:
- `generateReactTypeDefs()` - Generate React TypeScript definitions (.d.ts file)

**Used by**: 
- `generate-react-types.mjs` (main entry point)

**Dependencies**: 
- `utils/file-scanner.mjs` for component configurations
- `generators/interface-generator.mjs` for TypeScript interfaces
- `utils/logger.mjs` for logging

---

#### `typescript-definitions.mjs`
**Purpose**: Generate TypeScript definition files for custom elements (JSX declarations)

**Functions**:
- `generateTypeDefinitions()` - Generate TypeScript definitions for custom elements

**Used by**: 
- `generate-react-types.mjs` (main entry point)

**Dependencies**: 
- `utils/file-scanner.mjs` for component configurations
- `utils/logger.mjs` for logging

---

### 📄 `generate-react-types.mjs` (Main Entry Point)
**Purpose**: Main orchestrator for generating React components and TypeScript definitions

**Workflow**:
1. Generate TypeScript definitions for custom elements
2. Generate React component wrappers (JavaScript)
3. Generate React TypeScript definitions

**Output Files**:
- `dist/react-types.d.ts`: TypeScript definitions for custom elements
- `src/react.js`: React component wrappers
- `src/react.d.ts`: React TypeScript definitions

**Dependencies**: 
- `generators/typescript-definitions.mjs`
- `generators/react-components.mjs`  
- `generators/react-types.mjs`
- `utils/logger.mjs`

## Benefits of Modular Architecture

### ✅ **Maintainability**
- Each module has a single responsibility
- Easier to locate and fix issues
- Clear separation of concerns

### ✅ **Reusability**
- Utility modules can be used across different generators
- Interface generator can be extended for other use cases
- Logger provides consistent output format

### ✅ **Testability**
- Each module can be unit tested independently
- Mock dependencies easily
- Focused testing scope

### ✅ **Scalability**
- Easy to add new generators without touching existing code
- New utility functions can be added to appropriate modules
- Clear extension points

### ✅ **Code Quality**
- Smaller files are easier to review
- Focused modules reduce cognitive load
- Better code organization and documentation

## Usage Examples

### Adding a New Generator
```javascript
// generators/new-feature.mjs
import { extractComponentConfigs } from '../utils/file-scanner.mjs';
import { log } from '../utils/logger.mjs';

export function generateNewFeature() {
  const configs = extractComponentConfigs();
  log.info('Generating new feature...');
  // Implementation here
}
```

### Using the Logger
```javascript
import { log } from '../utils/logger.mjs';

log.info('Processing components...');
log.success('Generation completed successfully');
log.warning('Type file not found, using defaults');
log.error('Failed to read component file');
```

### Extending File Scanner
```javascript
// Add new scanning functionality to file-scanner.mjs
export function extractNewInformation(filePath) {
  // New scanning logic
}
```