// Auto-generated React TypeScript definitions for system-components
// Generated at: 2025-11-29T17:27:45.700Z
// Components: badge-component, button-component, card-component, input-component, notify-component, typography-component

import { NotifyComponentElement } from './index';
import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  style?: string | React.CSSProperties;
  children?: React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  disabled?: boolean;
  label?: string;
  onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  permission?: boolean;
  icon?: string;
  iconPosition?: IconPosition;
  children?: React.ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  style?: string | React.CSSProperties;
  children?: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
  success?: boolean;
  prefix?: string;
  suffix?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  multiple?: boolean;
  accept?: string;
  oninput?: (e: React.FormEvent<HTMLInputElement>) => void;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onfocus?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
  onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
  onkeydown?: (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;
  onkeyup?: (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;
  children?: React.ReactNode;
}

export interface NotifyProps {
  id?: string;
  message?: string;
  type?: NotifyType;
  description?: string;
  duration?: number;
  placement?: NotifyPlacement;
  maxCount?: number;
  style?: string | React.CSSProperties;
  children?: React.ReactNode;
}

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  color?: string;
  as?: string;
  truncate?: boolean;
  noWrap?: boolean;
  children?: React.ReactNode;
}

export const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLElement>>;
export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLElement>>;
export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export const Notify: React.ForwardRefExoticComponent<NotifyProps & React.RefAttributes<NotifyComponentElement>>;
export const Typography: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLElement>>;
