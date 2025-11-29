/**
 * File Scanner Utilities
 * 
 * PURPOSE: Scan and extract information from Svelte components and TypeScript type files
 * 
 * FUNCTIONS:
 * - extractComponentConfigs(): Main function to scan all .svelte files and extract configurations
 * - extractPropsFromTypeFile(): Parse TypeScript interface from .type.ts files
 * - getDefaultPropsForComponent(): Get props for a component from its type file with fallbacks
 * 
 * USED BY:
 * - generate-react-types.mjs (main entry point)
 * - All generator modules that need component scanning
 * 
 * DEPENDENCIES:
 * - Node.js fs, path modules
 * - ./logger.mjs for consistent logging
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from './logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Auto-extract component configurations from Svelte files
 * @returns {Object} Component configurations object
 */
export function extractComponentConfigs() {
  const componentsDir = path.resolve(__dirname, '../../src/components');
  const configs = {};
  
  log.info('Starting component auto-discovery process...');
  log.info(`Scanning components directory: ${componentsDir}`);
  
  try {
    // Read all .svelte files in components directory
    const svelteFiles = fs.readdirSync(componentsDir)
      .filter(file => file.endsWith('.svelte'))
      .map(file => path.join(componentsDir, file));

    log.info(`Found ${svelteFiles.length} Svelte components: [${svelteFiles.map(f => path.basename(f)).join(', ')}]`);

    svelteFiles.forEach((filePath, index) => {
      const fileName = path.basename(filePath, '.svelte');
      log.info(`\n[${index + 1}/${svelteFiles.length}] Processing component: ${fileName}`);
      
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract custom element name from svelte:options - support new object syntax
      const customElementMatchObj = content.match(/customElement=\{\{\s*tag:\s*"([^"]+)"/);  
      const customElementMatchStr = content.match(/customElement="([^"]+)"/);  
      const tagName = customElementMatchObj ? customElementMatchObj[1] : 
                     customElementMatchStr ? customElementMatchStr[1] : 
                     `system-${fileName.toLowerCase()}`;
      
      log.info(`   Custom element tag: ${tagName}`);
      
      // Extract export functions (methods that can be called via ref)
      const exportMatches = content.matchAll(/export function (\w+)\([^)]*\)(?:: ([^{]+))? \{/g);
      const methods = Array.from(exportMatches).map(match => {
        const [, funcName, returnType] = match;
        const type = returnType ? returnType.trim() : 'void';
        return `${funcName}(): ${type}`;
      });
      
      if (methods.length > 0) {
        log.info(`   Exported methods: [${methods.map(m => m.split('(')[0]).join(', ')}]`);
      } else {
        log.info(`   No exported methods found`);
      }
      
      // Get props for this component
      let props = getDefaultPropsForComponent(fileName);
      
      // Generate more user-friendly interface name
      const interfaceName = tagName.split('-').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join('') + 'Element';
      
      log.info(`   Interface name: ${interfaceName}`);
      
      configs[tagName] = {
        interface: interfaceName,
        methods: methods,
        props: props
      };
      
      log.success(`   Component ${fileName} processed successfully`);
    });
    
    log.success(`\nSuccessfully extracted configurations for ${Object.keys(configs).length} components`);
    log.info(`Generated configs: [${Object.keys(configs).join(', ')}]`);
  } catch (error) {
    log.error(`Failed to extract from source: ${error.message}`);
    log.info('Falling back to manual configuration...');
    return getManualComponentConfigs();
  }
  
  return Object.keys(configs).length > 0 ? configs : getManualComponentConfigs();
}

/**
 * Extract props from TypeScript interface file
 * @param {string} typeContent - Content of the .type.ts file
 * @returns {Object} Extracted props object
 */
export function extractPropsFromTypeFile(typeContent) {
  const props = {};
  
  // Extract interface properties - handles both optional and required props
  const propMatches = typeContent.matchAll(/(\w+)(\?)?: ([^;]+);/g);
  
  for (const match of propMatches) {
    const [, propName, optional, propType] = match;
    props[propName] = propType.trim();
  }
  
  return props;
}

/**
 * Get default props for a component from its type file
 * @param {string} componentName - Name of the component
 * @returns {Object} Props object with fallbacks
 */
export function getDefaultPropsForComponent(componentName) {
  log.info(`Processing props for component: ${componentName}`);
  
  // Always try to auto-generate from type file first
  const typesDir = path.resolve(__dirname, '../../src/types');
  const typeFilePath = path.join(typesDir, `${componentName.toLowerCase()}.type.ts`);
  
  if (fs.existsSync(typeFilePath)) {
    try {
      log.info(`Reading type file: ${path.basename(typeFilePath)}`);
      const typeContent = fs.readFileSync(typeFilePath, 'utf8');
      const extractedProps = extractPropsFromTypeFile(typeContent);
      
      if (extractedProps && Object.keys(extractedProps).length > 0) {
        log.success(`Extracted ${Object.keys(extractedProps).length} props for ${componentName}: [${Object.keys(extractedProps).join(', ')}]`);
        return { 
          ...extractedProps, 
          style: 'string',
          children: 'React.ReactNode' 
        };
      } else {
        log.warning(`No props found in type file for ${componentName}`);
      }
    } catch (error) {
      log.error(`Failed to read type file for ${componentName}: ${error.message}`);
    }
  } else {
    log.info(`No type file found for ${componentName}, using basic defaults`);
  }
  
  // Fallback to basic props
  const basicProps = {
    style: 'string',
    children: 'React.ReactNode'
  };
  
  log.info(`Using fallback props for ${componentName}: [${Object.keys(basicProps).join(', ')}]`);
  return basicProps;
}

/**
 * Manual component configuration generation (fallback)
 * @returns {Object} Component configurations
 */
export function getManualComponentConfigs() {
  log.info('Executing fallback manual configuration generation...');
  
  // Auto-generate configs for all components as fallback
  const componentsDir = path.resolve(__dirname, '../../src/components');
  const configs = {};
  
  try {
    const svelteFiles = fs.readdirSync(componentsDir)
      .filter(file => file.endsWith('.svelte'))
      .map(file => path.basename(file, '.svelte'));

    log.info(`Fallback processing ${svelteFiles.length} components: [${svelteFiles.join(', ')}]`);

    svelteFiles.forEach(fileName => {
      log.info(`Generating fallback config for: ${fileName}`);
      
      const tagName = `${fileName.toLowerCase()}-component`;
      const componentName = fileName;
      
      // Generate interface name
      const interfaceName = tagName.split('-').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join('') + 'Element';
      
      // Basic method detection based on component type
      let methods = [];
      if (['Button', 'Input'].includes(componentName)) {
        methods = [
          `get${componentName}Element(): HTML${componentName}Element | null`,
          'focus(): void',
          'blur(): void'
        ];
        if (componentName === 'Button') {
          methods.push('click(): void');
        }
        log.info(`   Added interactive methods: [${methods.map(m => m.split('(')[0]).join(', ')}]`);
      } else if (componentName === 'Notify') {
        methods = [
          'show(): void',
          'hide(): void'
        ];
        log.info(`   Added notification methods: [${methods.map(m => m.split('(')[0]).join(', ')}]`);
      } else {
        log.info(`   No special methods for ${componentName}`);
      }
      
      configs[tagName] = {
        interface: interfaceName,
        methods: methods,
        props: getDefaultPropsForComponent(componentName)
      };
      
      log.success(`   Fallback config generated for ${fileName}`);
    });
    
    log.success(`Fallback generation completed: ${Object.keys(configs).length} components configured`);
    return configs;
    
  } catch (error) {
    log.error(`Critical error in fallback generation: ${error.message}`);
    log.warning('Using empty configuration as last resort');
    return {};
  }
}