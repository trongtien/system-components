import type { ComboboxItem } from '../types';

/**
 * Hook quản lý state cơ bản của combobox
 */
export function useComboboxState() {
  let isOpen = $state(false);
  let searchQuery = $state("");
  let focusedIndex = $state(-1);

  // DOM references
  let triggerElement: HTMLButtonElement | undefined = $state();
  let dropdownElement: HTMLDivElement | undefined = $state();
  let inputElement: HTMLInputElement | undefined = $state();

  return {
    // State
    get isOpen() { return isOpen; },
    get searchQuery() { return searchQuery; },
    get focusedIndex() { return focusedIndex; },
    
    // State setters
    setIsOpen: (value: boolean) => { isOpen = value; },
    setSearchQuery: (value: string) => { searchQuery = value; },
    setFocusedIndex: (value: number) => { focusedIndex = value; },

    // DOM references
    get triggerElement() { return triggerElement; },
    get dropdownElement() { return dropdownElement; },
    get inputElement() { return inputElement; },
    
    // DOM setters
    setTriggerElement: (element: HTMLButtonElement) => { triggerElement = element; },
    setDropdownElement: (element: HTMLDivElement) => { dropdownElement = element; },
    setInputElement: (element: HTMLInputElement) => { inputElement = element; }
  };
}