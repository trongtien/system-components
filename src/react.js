// Auto-generated React Component Wrappers for System Components
// These render native HTML elements with the same styling and behavior
// Generated at: 2025-12-01T09:52:41.681Z

import React, { forwardRef, useCallback } from 'react';

// Helper function to convert style object to string
const toStyleString = (style) => {
  if (typeof style === "string") return style;
  if (typeof style === "object" && style !== null) {
    return Object.entries(style)
      .map(([key, value]) => `${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value}`)
      .join("; ");
  }
  return "";
};

// AsyncCombobox component - renders native HTML element
export const AsyncCombobox = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('asynccombobox', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

AsyncCombobox.displayName = 'AsyncCombobox';

// SystemAsynccomboboxdropdown component - renders native HTML element
export const SystemAsynccomboboxdropdown = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('systemasynccomboboxdropdown', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

SystemAsynccomboboxdropdown.displayName = 'SystemAsynccomboboxdropdown';

// Badge component - renders native HTML element
export const Badge = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('badge', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

Badge.displayName = 'Badge';

// Button component - renders native HTML element
export const Button = forwardRef((props, ref) => {
  const {
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
  const buttonClass = `btn btn--${variant}${className ? ` ${className}` : ''}`;
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
  }, ...buttonChildren);});

Button.displayName = 'Button';

// Card component - renders native HTML element
export const Card = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('card', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

Card.displayName = 'Card';

// Combobox component - renders native HTML element
export const Combobox = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('combobox', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

Combobox.displayName = 'Combobox';

// SystemComboboxdropdown component - renders native HTML element
export const SystemComboboxdropdown = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('systemcomboboxdropdown', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

SystemComboboxdropdown.displayName = 'SystemComboboxdropdown';

// SystemComboboxgroup component - renders native HTML element
export const SystemComboboxgroup = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('systemcomboboxgroup', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

SystemComboboxgroup.displayName = 'SystemComboboxgroup';

// SystemComboboxitem component - renders native HTML element
export const SystemComboboxitem = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('systemcomboboxitem', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

SystemComboboxitem.displayName = 'SystemComboboxitem';

// SystemComboboxsearch component - renders native HTML element
export const SystemComboboxsearch = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('systemcomboboxsearch', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

SystemComboboxsearch.displayName = 'SystemComboboxsearch';

// SystemComboboxtrigger component - renders native HTML element
export const SystemComboboxtrigger = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('systemcomboboxtrigger', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

SystemComboboxtrigger.displayName = 'SystemComboboxtrigger';

// SystemInput component - renders native HTML element
export const SystemInput = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('systeminput', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

SystemInput.displayName = 'SystemInput';

// SystemLabel component - renders native HTML element
export const SystemLabel = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('systemlabel', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

SystemLabel.displayName = 'SystemLabel';

// Notify component wrapper - uses custom element due to complexity
export const Notify = forwardRef((props, ref) => {
  return React.createElement('notify-component', { ...props, ref });
});

Notify.displayName = 'Notify';

// SystemRadio component - renders native HTML element
export const SystemRadio = forwardRef((props, ref) => {
  const {
    style,
    className,
    children,
    ...rest
  } = props;

  const computedStyle = typeof style === 'object' ? style : (style || undefined);

  return React.createElement('systemradio', {
    ref,
    className,
    style: computedStyle,
    ...rest
  }, children);});

SystemRadio.displayName = 'SystemRadio';

// Typography component - renders native HTML element
export const Typography = forwardRef((props, ref) => {
  const {
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
  const typographyClass = `typography typography--${variant} typography--align-${align} typography--color-${color}${gutterBottom ? ' typography--gutter-bottom' : ''}${noWrap ? ' typography--no-wrap' : ''}${className ? ` ${className}` : ''}`;

  return React.createElement(tag, {
    ref,
    className: typographyClass,
    style: computedStyle,
    ...rest
  }, children);});

Typography.displayName = 'Typography';

