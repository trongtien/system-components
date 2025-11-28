

/**
 * Convert camelCase to kebab-case (e.g., backgroundColor -> background-color)
 * 
 * @param string 
 * @returns string
 */
export function convertCamelCaseToKebabCase(value: string): string {
    const kebabKey = value.replace(/([A-Z])/g, '-$1').toLowerCase();
    return kebabKey;
}