#!/usr/bin/env node

/**
 * React Types Generator - Main Entry Point
 * 
 * PURPOSE: Main orchestrator for generating React components and TypeScript definitions
 * 
 * WORKFLOW:
 * 1. Generate TypeScript definitions for custom elements
 * 2. Generate React component wrappers (JavaScript)
 * 3. Generate React TypeScript definitions
 * 
 * OUTPUT FILES:
 * - dist/react-types.d.ts: TypeScript definitions for custom elements
 * - src/react.js: React component wrappers
 * - src/react.d.ts: React TypeScript definitions
 * 
 * DEPENDENCIES:
 * - generators/typescript-definitions.mjs
 * - generators/react-components.mjs  
 * - generators/react-types.mjs
 * - utils/logger.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateTypeDefinitions } from './generators/typescript-definitions.mjs';
import { generateReactComponents } from './generators/react-components.mjs';
import { generateReactTypeDefs } from './generators/react-types.mjs';
import { log } from './utils/logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main execution
log.info('\n=== REACT TYPES GENERATOR STARTED ===');
log.info(`Started at: ${new Date().toISOString()}`);

const outputPath = path.resolve(__dirname, '../dist/react-types.d.ts');
const reactJsPath = path.resolve(__dirname, '../src/react.js');
const reactTypeDefsPath = path.resolve(__dirname, '../src/react.d.ts');

log.info('\nOutput file paths:');
log.info(`   TypeScript definitions: ${outputPath}`);
log.info(`   React components JS: ${reactJsPath}`);
log.info(`   React types definitions: ${reactTypeDefsPath}`);

// Ensure dist directory exists
const distDir = path.dirname(outputPath);
if (!fs.existsSync(distDir)) {
  log.info(`Creating dist directory: ${distDir}`);
  fs.mkdirSync(distDir, { recursive: true });
  log.success('   Dist directory created');
} else {
  log.success('   Dist directory exists');
}

log.info('\nStep 1: Generating TypeScript definitions...');
const typeDefinitions = generateTypeDefinitions();
fs.writeFileSync(outputPath, typeDefinitions, 'utf8');
log.success('   TypeScript definitions written to file');

log.info('\nStep 2: Generating React components JavaScript...');
const reactComponents = generateReactComponents();
fs.writeFileSync(reactJsPath, reactComponents, 'utf8');
log.success('   React components JavaScript written to file');

log.info('\nStep 3: Generating React TypeScript definitions...');
const reactTypeDefs = generateReactTypeDefs();
fs.writeFileSync(reactTypeDefsPath, reactTypeDefs, 'utf8');
log.success('   React TypeScript definitions written to file');

log.success('\n=== GENERATION COMPLETED SUCCESSFULLY ===');
log.info('Summary:');
log.success(`   Generated React TypeScript definitions: ${path.basename(outputPath)}`);
log.success(`   Generated React components JavaScript: ${path.basename(reactJsPath)}`);
log.success(`   Generated React TypeScript definitions: ${path.basename(reactTypeDefsPath)}`);
log.info('\nUsage:');
log.info('   import { Button, Typography } from "@kevid/system-components/react"');
log.info(`Completed at: ${new Date().toISOString()}`);