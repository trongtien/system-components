import type { ComponentBaseProps } from "./base-props.type";

export type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'p' 
  | 'span' 
  | 'label' 
  | 'small' 
  | 'strong' 
  | 'em' 
  | 'code' 
  | 'blockquote';

export type TypographySize = 
  | 'xs' 
  | 'sm' 
  | 'base' 
  | 'lg' 
  | 'xl' 
  | '2xl' 
  | '3xl' 
  | '4xl' 
  | '5xl' 
  | '6xl';

export type TypographyWeight = 
  | 'thin' 
  | 'light' 
  | 'normal' 
  | 'medium' 
  | 'semibold' 
  | 'bold' 
  | 'extrabold' 
  | 'black';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export interface TypographyProps extends ComponentBaseProps {
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  color?: string;
  as?: string; // Custom HTML element override
  truncate?: boolean; // Truncate text with ellipsis
  noWrap?: boolean; // Prevent text wrapping
}

