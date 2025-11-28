import type { CSSProperties } from "../types";
import { convertCamelCaseToKebabCase } from "./string";

/**
 * Converts a style object or string to a CSS style string.
 * 
 * @param style 
 * @returns 
 */
export function toStyleString(style: string | CSSProperties | undefined): string | undefined {
    if (!style) return undefined;
    if (typeof style === 'string') return style;

    return Object.entries(style)
        .map(([key, value]) => {
            const kebabKey = convertCamelCaseToKebabCase(key);
            return `${kebabKey}: ${typeof value === 'number' ? `${value}px` : value}`;
        })
        .join('; ');
}