import type { ComponentBaseProps } from './base-props.type';

export interface ComboboxItem {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface ComboboxProps extends ComponentBaseProps {
  /**
   * Array of items to display in the combobox
   */
  items: ComboboxItem[];

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Whether the combobox is disabled
   */
  disabled?: boolean;

  /**
   * Whether the combobox is in an error state
   */
  error?: boolean;

  /**
   * Text to display when no items match the search
   */
  emptyMessage?: string;

  /**
   * Whether to allow filtering/searching
   */
  searchable?: boolean;

  /**
   * Whether to close the dropdown after selection
   */
  closeOnSelect?: boolean;

  /**
   * Maximum height of the dropdown
   */
  maxHeight?: string;

  /**
   * Custom filter function
   */
  filterFunction?: (items: ComboboxItem[], query: string) => ComboboxItem[];

  /**
   * Position of the dropdown
   */
  placement?: 'bottom' | 'top' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

  /**
   * Event callbacks
   */
  onValueChange?: (value: string | undefined) => void;
  onOpenChange?: (open: boolean) => void;
  onSearchChange?: (search: string) => void;
}