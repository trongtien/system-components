import type { ComboboxItem } from './combobox.type';

export interface ComboboxState {
  isOpen: boolean;
  searchQuery: string;
  focusedIndex: number;
  filteredItems: ComboboxItem[];
  groupedItems: {
    groups: { [key: string]: ComboboxItem[] };
    ungrouped: ComboboxItem[];
  };
  selectedItem: ComboboxItem | undefined;
  displayValue: string;
}

export interface ComboboxActions {
  toggleDropdown: () => void;
  closeDropdown: () => void;
  selectItem: (item: ComboboxItem) => void;
  handleSearchInput: (query: string) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  handleClickOutside: (event: MouseEvent) => void;
  scrollFocusedItemIntoView: () => void;
  setupFloatingUI: () => void;
  cleanupFloatingUI: () => void;
}

export interface ComboboxConfig {
  items: ComboboxItem[];
  value?: string;
  disabled?: boolean;
  searchable?: boolean;
  closeOnSelect?: boolean;
  maxHeight?: string;
  placement?: string;
  filterFunction?: (items: ComboboxItem[], query: string) => ComboboxItem[];
  emptyMessage?: string;
  onValueChange?: (value: string | undefined) => void;
  onOpenChange?: (open: boolean) => void;
  onSearchChange?: (search: string) => void;
}

export type ComboboxStateManager = {
  readonly isOpen: boolean;
  readonly searchQuery: string;
  readonly focusedIndex: number;
  readonly filteredItems: ComboboxItem[];
  readonly groupedItems: {
    groups: { [key: string]: ComboboxItem[] };
    ungrouped: ComboboxItem[];
  };
  readonly selectedItem: ComboboxItem | undefined;
  readonly displayValue: string;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  selectItem: (item: ComboboxItem) => void;
  handleSearchInput: (query: string) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  handleClickOutside: (event: MouseEvent) => void;
  scrollFocusedItemIntoView: () => void;
  setupFloatingUI: () => void;
  cleanupFloatingUI: () => void;
  setTriggerElement: (element: HTMLButtonElement) => void;
  setDropdownElement: (element: HTMLDivElement) => void;
  setInputElement: (element: HTMLInputElement) => void;
  cleanup: () => void;
};