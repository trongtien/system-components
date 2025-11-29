import type { ComponentBaseProps } from "./base-props.type";

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
export type IconPosition = 'left' | 'right';

export interface ButtonProps extends ComponentBaseProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  label?: string;
  onclick?: (e: MouseEvent) => void;
  permission?: boolean;
  icon?: string;
  iconPosition?: IconPosition;
}
