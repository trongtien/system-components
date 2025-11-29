/**
 * React TypeScript Definitions Generator
 * 
 * PURPOSE: Generate TypeScript definition files for React components with proper interfaces
 * 
 * FUNCTIONS:
 * - generateReactTypeDefs(): Generate React TypeScript definitions (.d.ts file)
 * 
 * USED BY:
 * - generate-react-types.mjs (main entry point)
 * 
 * DEPENDENCIES:
 * - utils/file-scanner.mjs for component configurations
 * - generators/interface-generator.mjs for TypeScript interfaces
 * - utils/logger.mjs for logging
 */

import { extractComponentConfigs } from '../utils/file-scanner.mjs';
import { generateGenericInterface } from './interface-generator.mjs';
import { log } from '../utils/logger.mjs';

/**
 * Generate React TypeScript definitions file
 * @returns {string} Generated TypeScript definitions content
 */
export function generateReactTypeDefs() {
  log.info('\nStarting React TypeScript definitions generation...');
  const configs = extractComponentConfigs();
  
  let content = '// Auto-generated React TypeScript definitions for system-components\n';
  content += `// Generated at: ${new Date().toISOString()}\n`;
  content += `// Components: ${Object.keys(configs).join(', ')}\n\n`;
  
  content += "import { NotifyComponentElement } from './index';\n";
  content += "import React from 'react';\n\n";
  
  log.info('Generating TypeScript interfaces...');
  
  // Generate interfaces
  Object.entries(configs).forEach(([tagName, config]) => {
    const componentName = tagName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('').replace('Component', '');

    log.info(`   Generating interface for: ${componentName}`);

    if (componentName === 'Button') {
      content += generateGenericInterface('Button', 'React.ButtonHTMLAttributes<HTMLButtonElement>');
      log.success(`      Generated ButtonProps interface`);
    } else if (componentName === 'Typography') {
      content += generateGenericInterface('Typography', 'React.HTMLAttributes<HTMLElement>');
      log.success(`      Generated TypographyProps interface`);
    } else if (componentName === 'Input') {
      content += generateGenericInterface('Input', 'React.InputHTMLAttributes<HTMLInputElement>');
      log.success(`      Generated InputProps interface`);
    } else if (componentName === 'Notify') {
      content += generateGenericInterface('Notify', '');
      log.success(`      Generated NotifyProps interface`);
    } else {
      content += generateGenericInterface(componentName, 'React.HTMLAttributes<HTMLElement>');
      log.success(`      Generated ${componentName}Props interface`);
    }
  });
  
  log.info('Generating component export declarations...');
  
  // Generate component exports
  Object.entries(configs).forEach(([tagName, config]) => {
    const componentName = tagName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('').replace('Component', '');

    log.info(`   Generating export for: ${componentName}`);

    if (componentName === 'Notify') {
      content += `export const ${componentName}: React.ForwardRefExoticComponent<${componentName}Props & React.RefAttributes<NotifyComponentElement>>;\n`;
      log.success(`      Generated ${componentName} export (custom element)`);
    } else if (componentName === 'Button') {
      content += `export const ${componentName}: React.ForwardRefExoticComponent<${componentName}Props & React.RefAttributes<HTMLButtonElement>>;\n`;
      log.success(`      Generated ${componentName} export (HTMLButtonElement)`);
    } else if (componentName === 'Input') {
      content += `export const ${componentName}: React.ForwardRefExoticComponent<${componentName}Props & React.RefAttributes<HTMLInputElement>>;\n`;
      log.success(`      Generated ${componentName} export (HTMLInputElement)`);
    } else {
      content += `export const ${componentName}: React.ForwardRefExoticComponent<${componentName}Props & React.RefAttributes<HTMLElement>>;\n`;
      log.success(`      Generated ${componentName} export (HTMLElement)`);
    }
  });
  
  log.success('React TypeScript definitions generation completed');
  return content;
}