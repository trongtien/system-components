/**
 * TypeScript Definitions Generator
 * 
 * PURPOSE: Generate TypeScript definition files for custom elements (JSX declarations)
 * 
 * FUNCTIONS:
 * - generateTypeDefinitions(): Generate TypeScript definitions for custom elements
 * 
 * USED BY:
 * - generate-react-types.mjs (main entry point)
 * 
 * DEPENDENCIES:
 * - utils/file-scanner.mjs for component configurations
 * - utils/logger.mjs for logging
 */

import { extractComponentConfigs } from '../utils/file-scanner.mjs';

/**
 * Generate TypeScript definitions from extracted configs
 * @returns {string} Generated TypeScript definitions content
 */
export function generateTypeDefinitions() {
  const configs = extractComponentConfigs();
  
  let content = '// Auto-generated TypeScript definitions for system-components\n';
  content += `// Generated at: ${new Date().toISOString()}\n`;
  content += `// Components: ${Object.keys(configs).join(', ')}\n\n`;

  // Generate interfaces for components with methods
  Object.entries(configs).forEach(([tagName, config]) => {
    if (config.methods && config.methods.length > 0) {
      content += `interface ${config.interface} extends HTMLElement {\n`;
      config.methods.forEach(method => {
        content += `  ${method};\n`;
      });
      content += '}\n\n';
    }
  });

  // Generate JSX declarations
  content += 'declare global {\n';
  content += '  namespace JSX {\n';
  content += '    interface IntrinsicElements {\n';

  Object.entries(configs).forEach(([tagName, config]) => {
    const hasInterface = config.methods && config.methods.length > 0;
    
    if (hasInterface) {
      content += `      '${tagName}': React.DetailedHTMLProps<React.HTMLAttributes<${config.interface}>, ${config.interface}> & {\n`;
      content += `        ref?: React.Ref<${config.interface}>;\n`;
    } else {
      content += `      '${tagName}': {\n`;
    }

    // Add props
    if (config.props) {
      Object.entries(config.props).forEach(([prop, type]) => {
        const isRequired = ['message'].includes(prop);
        const optional = isRequired ? '' : '?';
        content += `        ${prop}${optional}: ${type};\n`;
      });
    }

    content += '      };\n';
  });

  content += '    }\n';
  content += '  }\n';
  content += '}\n\n';
  content += 'export {};\n';

  return content;
}