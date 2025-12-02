import type { ComboboxItem } from '../types';

interface ComboboxActionsConfig {
  disabled?: boolean;
  searchable?: boolean;
  closeOnSelect?: boolean;
  onValueChange?: (value: string | undefined) => void;
  onOpenChange?: (open: boolean) => void;
  onSearchChange?: (search: string) => void;
}

interface ComboboxActionsState {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setSearchQuery: (value: string) => void;
  setFocusedIndex: (value: number) => void;
  triggerElement: HTMLButtonElement | undefined;
  inputElement: HTMLInputElement | undefined;
}

interface ComboboxActionsFloatingUI {
  setupFloatingUI: (trigger: HTMLButtonElement | undefined, dropdown: HTMLDivElement | undefined) => void;
  cleanupFloatingUI: () => void;
}

/**
 * Hook xử lý các actions chung của combobox
 */
export function useComboboxActions(
  config: ComboboxActionsConfig,
  state: ComboboxActionsState,
  floatingUI: ComboboxActionsFloatingUI,
  onInitialize?: () => Promise<void>
) {
  async function toggleDropdown() {
    if (config.disabled) return;
    
    const newIsOpen = !state.isOpen;
    state.setIsOpen(newIsOpen);
    config.onOpenChange?.(newIsOpen);

    if (newIsOpen) {
      await onInitialize?.();
      floatingUI.setupFloatingUI(state.triggerElement, undefined);
      requestAnimationFrame(() => {
        if (config.searchable) {
          state.inputElement?.focus();
        }
      });
    } else {
      floatingUI.cleanupFloatingUI();
      state.setFocusedIndex(-1);
    }
  }

  function closeDropdown() {
    if (!state.isOpen) return;
    
    state.setIsOpen(false);
    config.onOpenChange?.(false);
    floatingUI.cleanupFloatingUI();
    state.setFocusedIndex(-1);
    state.setSearchQuery("");
    config.onSearchChange?.("");
  }

  function selectItem(item: ComboboxItem) {
    if (item.disabled) return;

    config.onValueChange?.(item.value);

    if (config.closeOnSelect) {
      closeDropdown();
    }

    state.triggerElement?.focus();
  }

  return {
    toggleDropdown,
    closeDropdown,
    selectItem
  };
}