import type { ComponentBaseProps } from "./base-props.type";

export type InputType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'search' 
  | 'date' 
  | 'time' 
  | 'datetime-local' 
  | 'file' 
  | 'hidden';

export type InputVariant = 
  | 'default' 
  | 'outlined' 
  | 'filled' 
  | 'underlined';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends ComponentBaseProps {
  type?: InputType;
  variant?: InputVariant;
  size?: InputSize;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  autofocus?: boolean;
  autocomplete?: string;
  name?: string;
  id?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
  successMessage?: string;
  prefix?: string;
  suffix?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  multiple?: boolean; // for file input
  accept?: string; // for file input
  oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
  onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
  onfocus?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
  onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
  onkeydown?: (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;
  onkeyup?: (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;
}