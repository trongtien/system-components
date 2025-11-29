/**
 * Interface Generator
 * 
 * PURPOSE: Generate TypeScript interface definitions automatically from component type files
 * 
 * FUNCTIONS:
 * - generateGenericInterface(): Create TypeScript interface from component props with React-friendly types
 * 
 * USED BY:
 * - generators/react-types.mjs for generating React TypeScript definitions
 * - generators/typescript-definitions.mjs for component interfaces
 * 
 * DEPENDENCIES:
 * - Node.js fs, path modules
 * - utils/file-scanner.mjs for prop extraction
 * - utils/logger.mjs for logging
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractPropsFromTypeFile } from '../utils/file-scanner.mjs';
import { log } from '../utils/logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate generic TypeScript interface from extracted props
 * @param {string} componentName - Name of the component (e.g., 'Button')
 * @param {string} baseInterface - Base React interface to extend (e.g., 'React.ButtonHTMLAttributes<HTMLButtonElement>')
 * @returns {string} Generated TypeScript interface code
 */
export function generateGenericInterface(componentName, baseInterface) {
  const typesDir = path.resolve(__dirname, '../../src/types');
  const typeFilePath = path.join(typesDir, `${componentName.toLowerCase()}.type.ts`);
  
  let content = `export interface ${componentName}Props`;
  
  if (baseInterface) {
    content += ` extends ${baseInterface}`;
  }
  
  content += ' {\n';
  
  // Try to read and extract props from type file
  if (fs.existsSync(typeFilePath)) {
    try {
      const typeContent = fs.readFileSync(typeFilePath, 'utf8');
      const extractedProps = extractPropsFromTypeFile(typeContent);
      
      if (extractedProps && Object.keys(extractedProps).length > 0) {
        Object.entries(extractedProps).forEach(([propName, propType]) => {
          // Convert to React-friendly types
          let reactType = propType;
          if (propName === 'onclick' && componentName === 'Button') {
            reactType = '(e: React.MouseEvent<HTMLButtonElement>) => void';
          } else if (propName === 'onchange' && componentName === 'Input') {
            reactType = '(e: React.ChangeEvent<HTMLInputElement>) => void';
          } else if (propName === 'oninput' && componentName === 'Input') {
            reactType = '(e: React.FormEvent<HTMLInputElement>) => void';
          } else if (propName === 'style') {
            reactType = 'string | React.CSSProperties';
          }
          
          content += `  ${propName}?: ${reactType};\n`;
        });
      }
    } catch (error) {
      log.warning(`Failed to read type file for ${componentName}: ${error.message}`);
    }
  }
  
  // Add common React props
  if (!baseInterface || !baseInterface.includes('children')) {
    content += '  children?: React.ReactNode;\n';
  }
  
  content += '}\n\n';
  return content;
}