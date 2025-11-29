/**
 * React Component Generator
 * 
 * PURPOSE: Generate React wrapper components that render native HTML elements
 * 
 * FUNCTIONS:
 * - generateReactComponents(): Main function to generate all React component wrappers
 * - generateButtonComponent(): Generate Button component implementation
 * - generateTypographyComponent(): Generate Typography component implementation  
 * - generateInputComponent(): Generate Input component implementation
 * - generateGenericComponent(): Generate generic HTML element wrapper
 * 
 * USED BY:
 * - generate-react-types.mjs (main entry point)
 * 
 * DEPENDENCIES:
 * - utils/file-scanner.mjs for component configurations
 * - utils/logger.mjs for logging
 */

import { extractComponentConfigs } from '../utils/file-scanner.mjs';
import { log } from '../utils/logger.mjs';

/**
 * Generate React wrapper components JavaScript code
 * @returns {string} Generated JavaScript code for all React components
 */
export function generateReactComponents() {
  log.info('\nStarting React components generation...');
  const configs = extractComponentConfigs();
  
  let content = '// Auto-generated React Component Wrappers for System Components\n';
  content += '// These render native HTML elements with the same styling and behavior\n';
  content += `// Generated at: ${new Date().toISOString()}\n\n`;
  
  content += "import React, { forwardRef, useCallback } from 'react';\n\n";
  
  // Helper functions
  content += '// Helper function to convert style object to string\n';
  content += 'const toStyleString = (style) => {\n';
  content += '  if (typeof style === "string") return style;\n';
  content += '  if (typeof style === "object" && style !== null) {\n';
  content += '    return Object.entries(style)\n';
  content += '      .map(([key, value]) => `${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value}`)\n';
  content += '      .join("; ");\n';
  content += '  }\n';
  content += '  return "";\n';
  content += '};\n\n';

  log.info('Generating React wrapper components...');

  Object.entries(configs).forEach(([tagName, config]) => {
    const componentName = tagName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('').replace('Component', '');

    log.info(`   Generating wrapper for: ${componentName}`);

    if (componentName === 'Notify') {
      // Special handling for complex components - keep as custom element
      log.info(`      Using custom element wrapper (complex component)`);
      content += `// ${componentName} component wrapper - uses custom element due to complexity\n`;
      content += `export const ${componentName} = forwardRef((props, ref) => {\n`;
      content += `  return React.createElement('${tagName}', { ...props, ref });\n`;
      content += '});\n\n';
      content += `${componentName}.displayName = '${componentName}';\n\n`;
      log.success(`      Generated ${componentName} custom element wrapper`);
      return;
    }

    content += `// ${componentName} component - renders native HTML element\n`;
    content += `export const ${componentName} = forwardRef((props, ref) => {\n`;
    
    if (componentName === 'Button') {
      content += generateButtonComponent(config);
      log.success(`      Generated ${componentName} native HTML wrapper (button)`);
    } else if (componentName === 'Typography') {
      content += generateTypographyComponent(config);
      log.success(`      Generated ${componentName} native HTML wrapper (dynamic tag)`);
    } else if (componentName === 'Input') {
      content += generateInputComponent(config);
      log.success(`      Generated ${componentName} native HTML wrapper (input)`);
    } else {
      // Generic component
      content += generateGenericComponent(componentName.toLowerCase(), config);
      log.success(`      Generated ${componentName} generic HTML wrapper (${componentName.toLowerCase()})`);
    }
    
    content += '});\n\n';
    content += `${componentName}.displayName = '${componentName}';\n\n`;
  });

  log.success('React components generation completed');
  return content;
}

/**
 * Generate Button component implementation
 * @param {Object} config - Component configuration object
 * @returns {string} Button component JavaScript code
 */
export function generateButtonComponent(config) {
  return `  const {
    label = "Button",
    variant = "primary",
    disabled = false,
    permission = true,
    onclick,
    style,
    icon,
    iconPosition = "left",
    children,
    className,
    ...rest
  } = props;

  const handleClick = useCallback((e) => {
    if (disabled) return;

    if (!permission) {
      alert("You do not have permission to perform this action.");
      return;
    }

    onclick?.(e);
  }, [disabled, permission, onclick]);

  const computedStyle = typeof style === 'object' ? style : (style || undefined);
  const buttonClass = \`btn btn--\${variant}\${className ? \` \${className}\` : ''}\`;
  const hasIcon = !!icon;
  const showIconLeft = hasIcon && iconPosition === "left";
  const showIconRight = hasIcon && iconPosition === "right";

  const buttonChildren = [];
  
  if (showIconLeft) {
    buttonChildren.push(React.createElement('span', { 
      key: 'icon-left', 
      className: 'btn__icon btn__icon--left' 
    }, icon));
  }
  
  buttonChildren.push(React.createElement('span', { 
    key: 'content', 
    className: 'btn__content' 
  }, children || label));
  
  if (showIconRight) {
    buttonChildren.push(React.createElement('span', { 
      key: 'icon-right', 
      className: 'btn__icon btn__icon--right' 
    }, icon));
  }

  return React.createElement('button', {
    ref,
    className: buttonClass,
    disabled,
    onClick: handleClick,
    style: computedStyle,
    ...rest
  }, ...buttonChildren);`;
}

/**
 * Generate Typography component implementation
 * @param {Object} config - Component configuration object
 * @returns {string} Typography component JavaScript code
 */
export function generateTypographyComponent(config) {
  return `  const {
    variant = 'body1',
    align = 'left',
    color = 'text',
    gutterBottom = false,
    noWrap = false,
    component,
    style,
    children,
    className,
    ...rest
  } = props;

  const tagMapping = {
    h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
    body1: 'p', body2: 'p', subtitle1: 'p', subtitle2: 'p', caption: 'span'
  };

  const tag = component || tagMapping[variant] || 'p';
  const computedStyle = typeof style === 'object' ? style : (style || undefined);
  const typographyClass = \`typography typography--\${variant} typography--align-\${align} typography--color-\${color}\${gutterBottom ? ' typography--gutter-bottom' : ''}\${noWrap ? ' typography--no-wrap' : ''}\${className ? \` \${className}\` : ''}\`;

  return React.createElement(tag, {
    ref,
    className: typographyClass,
    style: computedStyle,
    ...rest
  }, children);`;
}

/**
 * Generate Input component implementation
 * @param {Object} config - Component configuration object
 * @returns {string} Input component JavaScript code
 */
export function generateInputComponent(config) {
  return `  const {
    type = 'text',
    placeholder,
    value,
    disabled = false,
    readonly = false,
    required = false,
    style,
    onchange,
    oninput,
    className,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);
  const inputClass = \`input\${className ? \` \${className}\` : ''}\`;

  return React.createElement('input', {
    ref,
    type,
    placeholder,
    value,
    disabled,
    readOnly: readonly,
    required,
    className: inputClass,
    style: computedStyle,
    onChange: onchange,
    onInput: oninput,
    ...rest
  });`;
}

/**
 * Generate generic HTML element component
 * @param {string} elementType - HTML element type (e.g., 'div', 'span')
 * @param {Object} config - Component configuration object  
 * @returns {string} Generic component JavaScript code
 */
export function generateGenericComponent(elementType, config) {
  return `  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('${elementType}', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);`;
}