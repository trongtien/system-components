import type { ComboboxItem } from '../types';

interface KeyboardNavigationConfig {
  disabled?: boolean;
  items: ComboboxItem[];
  focusedIndex: number;
  isOpen: boolean;
  setFocusedIndex: (index: number) => void;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  selectItem: (item: ComboboxItem) => void;
  onLoadMore?: () => Promise<void>;
  canLoadMore?: boolean;
}

/**
 * Hook xử lý keyboard navigation cho combobox
 */
export function useComboboxKeyboard(config: KeyboardNavigationConfig) {
  function handleKeydown(event: KeyboardEvent) {
    if (config.disabled) return;

    switch (event.key) {
      case "Enter":
        event.preventDefault();
        if (config.isOpen && config.focusedIndex >= 0 && config.focusedIndex < config.items.length) {
          config.selectItem(config.items[config.focusedIndex]);
        } else if (!config.isOpen) {
          config.toggleDropdown();
        }
        break;

      case "Escape":
        event.preventDefault();
        config.closeDropdown();
        break;

      case "ArrowDown":
        event.preventDefault();
        if (!config.isOpen) {
          config.toggleDropdown();
        } else {
          const newIndex = Math.min(config.focusedIndex + 1, config.items.length - 1);
          config.setFocusedIndex(newIndex);
          
          // Auto-load more when near the end (for async combobox)
          if (newIndex >= config.items.length - 3 && config.canLoadMore && config.onLoadMore) {
            config.onLoadMore();
          }
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        if (config.isOpen) {
          config.setFocusedIndex(Math.max(config.focusedIndex - 1, -1));
        }
        break;

      case "Home":
        if (config.isOpen) {
          event.preventDefault();
          config.setFocusedIndex(0);
        }
        break;

      case "End":
        if (config.isOpen) {
          event.preventDefault();
          config.setFocusedIndex(config.items.length - 1);
        }
        break;
    }
  }

  return {
    handleKeydown
  };
}