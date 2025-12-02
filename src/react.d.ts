// Auto-generated React TypeScript definitions for system-components
// Generated at: 2025-12-02T07:46:15.635Z
// Components: async-combobox-component, system-asynccomboboxdropdown, badge-component, button-component, card-component, combobox-component, system-comboboxdropdown, system-comboboxgroup, system-comboboxitem, system-comboboxsearch, system-comboboxtrigger, system-gridbuilder, system-gridcontainer, system-griditem, system-input, system-label, notify-component, system-radio, typography-component

import { NotifyComponentElement } from './index';
import React from 'react';

export interface AsyncComboboxProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface SystemAsynccomboboxdropdownProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

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

export interface ComboboxProps extends React.HTMLAttributes<HTMLElement> {
  value?: string;
  label?: string;
  disabled?: boolean;
  group?: string;
  items?: ComboboxItem[];
  placeholder?: string;
  error?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  closeOnSelect?: boolean;
  maxHeight?: string;
  filterFunction?: (items: ComboboxItem[], query: string) => ComboboxItem[];
  placement?: 'bottom' | 'top' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  onValueChange?: (value: string | undefined) => void;
  onOpenChange?: (open: boolean) => void;
  onSearchChange?: (search: string) => void;
  children?: React.ReactNode;
}

export interface SystemComboboxdropdownProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface SystemComboboxgroupProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface SystemComboboxitemProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface SystemComboboxsearchProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface SystemComboboxtriggerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface SystemGridbuilderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface SystemGridcontainerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface SystemGriditemProps extends React.HTMLAttributes<HTMLElement> {
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

export interface SystemRadioProps extends React.HTMLAttributes<HTMLElement> {
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

export const AsyncCombobox: React.ForwardRefExoticComponent<AsyncComboboxProps & React.RefAttributes<HTMLElement>>;
export const SystemAsynccomboboxdropdown: React.ForwardRefExoticComponent<SystemAsynccomboboxdropdownProps & React.RefAttributes<HTMLElement>>;
export const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLElement>>;
export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLElement>>;
export const Combobox: React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLElement>>;
export const SystemComboboxdropdown: React.ForwardRefExoticComponent<SystemComboboxdropdownProps & React.RefAttributes<HTMLElement>>;
export const SystemComboboxgroup: React.ForwardRefExoticComponent<SystemComboboxgroupProps & React.RefAttributes<HTMLElement>>;
export const SystemComboboxitem: React.ForwardRefExoticComponent<SystemComboboxitemProps & React.RefAttributes<HTMLElement>>;
export const SystemComboboxsearch: React.ForwardRefExoticComponent<SystemComboboxsearchProps & React.RefAttributes<HTMLElement>>;
export const SystemComboboxtrigger: React.ForwardRefExoticComponent<SystemComboboxtriggerProps & React.RefAttributes<HTMLElement>>;
export const SystemGridbuilder: React.ForwardRefExoticComponent<SystemGridbuilderProps & React.RefAttributes<HTMLElement>>;
export const SystemGridcontainer: React.ForwardRefExoticComponent<SystemGridcontainerProps & React.RefAttributes<HTMLElement>>;
export const SystemGriditem: React.ForwardRefExoticComponent<SystemGriditemProps & React.RefAttributes<HTMLElement>>;
export const SystemInput: React.ForwardRefExoticComponent<SystemInputProps & React.RefAttributes<HTMLElement>>;
export const SystemLabel: React.ForwardRefExoticComponent<SystemLabelProps & React.RefAttributes<HTMLElement>>;
export const Notify: React.ForwardRefExoticComponent<NotifyProps & React.RefAttributes<NotifyComponentElement>>;
export const SystemRadio: React.ForwardRefExoticComponent<SystemRadioProps & React.RefAttributes<HTMLElement>>;
export const Typography: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLElement>>;
