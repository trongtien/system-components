#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-extract component configurations from Svelte files
function extractComponentConfigs() {
  const componentsDir = path.resolve(__dirname, '../src/components');
  const typesDir = path.resolve(__dirname, '../src/types');
  
  const configs = {};
  
  try {
    // Read all .svelte files in components directory
    const svelteFiles = fs.readdirSync(componentsDir)
      .filter(file => file.endsWith('.svelte'))
      .map(file => path.join(componentsDir, file));

    svelteFiles.forEach(filePath => {
      const fileName = path.basename(filePath, '.svelte');
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract custom element name from svelte:options
      const customElementMatch = content.match(/customElement="([^"]+)"/);
      const tagName = customElementMatch ? customElementMatch[1] : `system-${fileName.toLowerCase()}`;
      
      // Extract export functions (methods that can be called via ref)
      const exportMatches = content.matchAll(/export function (\w+)\([^)]*\)(?:: ([^{]+))? \{/g);
      const methods = Array.from(exportMatches).map(match => {
        const [, funcName, returnType] = match;
        const type = returnType ? returnType.trim() : 'void';
        return `${funcName}(): ${type}`;
      });
      
      // Try to read corresponding type file
      const typeFilePath = path.join(typesDir, `${fileName.toLowerCase()}.type.ts`);
      let props = getDefaultPropsForComponent(fileName);
      
      if (fs.existsSync(typeFilePath)) {
        const typeContent = fs.readFileSync(typeFilePath, 'utf8');
        const extractedProps = extractPropsFromTypeFile(typeContent);
        if (extractedProps && Object.keys(extractedProps).length > 0) {
          props = { ...props, ...extractedProps };
        }
      }
      
      configs[tagName] = {
        interface: `System${fileName}Element`,
        methods: methods,
        props: props
      };
    });
    
    console.log(`📖 Extracted configurations for ${Object.keys(configs).length} components`);
  } catch (error) {
    console.log('⚠️  Failed to extract from source, using manual configuration');
    return getManualComponentConfigs();
  }
  
  return Object.keys(configs).length > 0 ? configs : getManualComponentConfigs();
}

function extractPropsFromTypeFile(typeContent) {
  const props = {};
  
  // Extract interface properties - handles both optional and required props
  const propMatches = typeContent.matchAll(/(\w+)(\?)?: ([^;]+);/g);
  
  for (const match of propMatches) {
    const [, propName, optional, propType] = match;
    props[propName] = propType.trim();
  }
  
  return props;
}

function getDefaultPropsForComponent(componentName) {
  const defaults = {
    'Button': {
      label: 'string',
      variant: "'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'",
      disabled: 'boolean',
      permission: 'boolean',
      onclick: '(e: MouseEvent) => void',
      style: 'string',
      icon: 'string',
      iconPosition: "'left' | 'right'",
      children: 'React.ReactNode'
    },
    'Typography': {
      variant: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption'",
      align: "'left' | 'center' | 'right' | 'justify'",
      color: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'text'",
      gutterBottom: 'boolean',
      noWrap: 'boolean',
      component: 'string',
      style: 'string',
      children: 'React.ReactNode'
    },
    'Input': {
      type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'",
      placeholder: 'string',
      value: 'string',
      disabled: 'boolean',
      readonly: 'boolean',
      required: 'boolean',
      style: 'string',
      onchange: '(e: Event) => void',
      oninput: '(e: InputEvent) => void'
    },
    'Notify': {
      type: "'success' | 'error' | 'warning' | 'info'",
      message: 'string',
      title: 'string',
      duration: 'number',
      position: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
      closable: 'boolean',
      persistent: 'boolean',
      onclose: '() => void',
      style: 'string'
    }
  };
  
  return defaults[componentName] || {
    style: 'string',
    children: 'React.ReactNode'
  };
}

function getManualComponentConfigs() {
  return {
    'system-button': {
      interface: 'SystemButtonElement',
      methods: [
        'getButtonElement(): HTMLButtonElement | null',
        'focus(): void',
        'blur(): void',
        'click(): void'
      ],
      props: getDefaultPropsForComponent('Button')
    },
    'system-typography': {
      interface: 'SystemTypographyElement',
      methods: [],
      props: getDefaultPropsForComponent('Typography')
    },
    'system-input': {
      interface: 'SystemInputElement',
      methods: [
        'getInputElement(): HTMLInputElement | null',
        'focus(): void',
        'blur(): void'
      ],
      props: getDefaultPropsForComponent('Input')
    },
    'system-notify': {
      interface: 'SystemNotifyElement',
      methods: [
        'show(): void',
        'hide(): void'
      ],
      props: getDefaultPropsForComponent('Notify')
    }
  };
}

// Generate TypeScript definitions from extracted configs
function generateTypeDefinitions() {
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

// Main execution
const outputPath = path.resolve(__dirname, '../dist/react-types.d.ts');

// Ensure dist directory exists
const distDir = path.dirname(outputPath);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const typeDefinitions = generateTypeDefinitions();
fs.writeFileSync(outputPath, typeDefinitions, 'utf8');

console.log('✅ Generated React TypeScript definitions:', outputPath);
console.log('📊 Use: import type from "@kevid/system-components/react-types"');