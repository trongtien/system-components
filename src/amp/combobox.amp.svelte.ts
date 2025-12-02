import type { 
  ComboboxConfig 
} from '../types/combobox-state.type';
import { 
  useComboboxState,
  useComboboxGrouping,
  useComboboxKeyboard,
  useComboboxDropdown,
  useComboboxFloatingUI,
  useComboboxSearch,
  useComboboxActions,
} from '../hooks';

export function createComboboxState(config: ComboboxConfig) {
  // State management hook
  const state = useComboboxState();
  
  // Utility hooks
  const grouping = useComboboxGrouping();
  const floatingUI = useComboboxFloatingUI({
    placement: config.placement,
    maxHeight: config.maxHeight
  });
  const search = useComboboxSearch({
    searchable: config.searchable,
    filterFunction: config.filterFunction
  });
  const dropdown = useComboboxDropdown();

  // Computed state
  const selectedItem = $derived(
    config.items.find(item => item.value === config.value)
  );

  const displayValue = $derived(selectedItem?.label || "");

  const filteredItems = $derived.by(() => {
    return search.filterItems(config.items, state.searchQuery);
  });

  const groupedItems = $derived.by(() => {
    return grouping.groupItems(filteredItems);
  });

  // Actions using hooks
  const actions = useComboboxActions(
    {
      disabled: config.disabled,
      searchable: config.searchable,
      closeOnSelect: config.closeOnSelect,
      onValueChange: config.onValueChange,
      onOpenChange: config.onOpenChange,
      onSearchChange: config.onSearchChange
    },
    {
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
      setSearchQuery: state.setSearchQuery,
      setFocusedIndex: state.setFocusedIndex,
      triggerElement: state.triggerElement,
      inputElement: state.inputElement
    },
    {
      setupFloatingUI: (trigger, dropdown) => floatingUI.setupFloatingUI(trigger, dropdown || state.dropdownElement),
      cleanupFloatingUI: floatingUI.cleanupFloatingUI
    }
  );

  // Keyboard navigation hook
  // Create keyboard handler that updates with reactive values
  let keyboard = $state(useComboboxKeyboard({
    disabled: config.disabled,
    items: [],
    focusedIndex: state.focusedIndex,
    isOpen: state.isOpen,
    setFocusedIndex: state.setFocusedIndex,
    toggleDropdown: actions.toggleDropdown,
    closeDropdown: actions.closeDropdown,
    selectItem: actions.selectItem
  }));
  
  $effect(() => {
    keyboard = useComboboxKeyboard({
      disabled: config.disabled,
      items: filteredItems,
      focusedIndex: state.focusedIndex,
      isOpen: state.isOpen,
      setFocusedIndex: state.setFocusedIndex,
      toggleDropdown: actions.toggleDropdown,
      closeDropdown: actions.closeDropdown,
      selectItem: actions.selectItem
    });
  });

  function handleSearchInput(query: string) {
    search.handleSearchInput(
      query,
      state.setSearchQuery,
      state.setFocusedIndex,
      config.onSearchChange
    );
  }

  function handleClickOutside(event: MouseEvent) {
    dropdown.handleClickOutside(
      event,
      state.triggerElement,
      state.dropdownElement,
      state.isOpen,
      actions.closeDropdown
    );
  }

  function scrollFocusedItemIntoView() {
    dropdown.scrollFocusedItemIntoView(
      state.focusedIndex,
      state.dropdownElement
    );
  }

  function setupFloatingUI() {
    floatingUI.setupFloatingUI(state.triggerElement, state.dropdownElement);
  }

  function cleanupFloatingUI() {
    floatingUI.cleanupFloatingUI();
  }

  // Return state and actions
  return {
    // State getters
    get isOpen() { return state.isOpen; },
    get searchQuery() { return state.searchQuery; },
    get focusedIndex() { return state.focusedIndex; },
    get filteredItems() { return filteredItems; },
    get groupedItems() { return groupedItems; },
    get selectedItem() { return selectedItem; },
    get displayValue() { return displayValue; },

    // Actions
    toggleDropdown: actions.toggleDropdown,
    closeDropdown: actions.closeDropdown,
    selectItem: actions.selectItem,
    handleSearchInput,
    handleKeydown: (event: KeyboardEvent) => keyboard.handleKeydown(event),
    handleClickOutside,
    scrollFocusedItemIntoView,
    setupFloatingUI,
    cleanupFloatingUI,

    // DOM setters
    setTriggerElement: state.setTriggerElement,
    setDropdownElement: state.setDropdownElement,
    setInputElement: state.setInputElement,

    // Cleanup
    cleanup: () => {
      floatingUI.cleanup();
    },
  };
}

// Export type is now defined in types/combobox-state.type.ts