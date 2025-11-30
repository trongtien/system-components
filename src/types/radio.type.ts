import type { ComponentBaseProps } from "./base-props.type";

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioOption {
  label: string; // Option label text
  value: string | number | boolean; // Option value
  description?: string; // Optional helper text
  required?: boolean; // Optional required indicator for this option
  disabled?: boolean; // Optional disabled state for this option
}

export interface RadioProps extends ComponentBaseProps {
  name?: string; // Radio group name
  value?: string | number | boolean; // Currently selected value
  disabled?: boolean; // Disable entire group
  size?: RadioSize; // Size variant
  options: RadioOption[]; // Array of radio options to render
  onchange?: (value: string | number | boolean, e: Event) => void; // Change event handler with value
  oninput?: (value: string | number | boolean, e: Event) => void; // Input event handler with value
}