// Auto-generated React TypeScript definitions for system-components
// Generated at: 2025-11-30T13:23:52.405Z
// Components: badge-component, button-component, card-component, system-input, system-label, notify-component, typography-component

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

export interface SystemInputProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface SystemLabelProps extends React.HTMLAttributes<HTMLElement> {
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
export const SystemInput: React.ForwardRefExoticComponent<SystemInputProps & React.RefAttributes<HTMLElement>>;
export const SystemLabel: React.ForwardRefExoticComponent<SystemLabelProps & React.RefAttributes<HTMLElement>>;
export const Notify: React.ForwardRefExoticComponent<NotifyProps & React.RefAttributes<NotifyComponentElement>>;
export const Typography: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLElement>>;
