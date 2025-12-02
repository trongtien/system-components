import type { ComboboxItem } from '../types';
import type { 
  AsyncComboboxState, 
  AsyncComboboxManagerConfig 
} from '../types/async-combobox.type';
import { createAsyncComboboxService } from '../services/async-combobox.service';
import { 
  useComboboxState,
  useComboboxGrouping,
  useComboboxKeyboard,
  useComboboxDropdown,
  useComboboxFloatingUI
} from '../hooks';

export function createAsyncComboboxState(config: AsyncComboboxManagerConfig) {
  // State management hook
  const state = useComboboxState();
  
  // Async state  
  let asyncState: AsyncComboboxState = $state({
    items: [],
    currentPage: 0,
    hasMore: true,
    isLoading: false,
    isSearching: false,
    error: null,
    total: undefined,
    localItems: []
  });

  // Services
  const apiService = createAsyncComboboxService(config);
  let searchTimeout: number | null = null;
  let loadAbortController: AbortController | null = null;

  // Utility hooks
  const grouping = useComboboxGrouping();
  const floatingUI = useComboboxFloatingUI({
    placement: config.placement,
    maxHeight: config.maxHeight
  });
  const dropdown = useComboboxDropdown();

  // Computed state
  const selectedItem = $derived(
    asyncState.items.find(item => item.value === config.value)
  );

  const displayValue = $derived(selectedItem?.label || "");

  const displayItems = $derived.by(() => {
    if (config.searchMode === 'local' && state.searchQuery) {
      return apiService.filterLocalItems(asyncState.localItems.length ? asyncState.localItems : asyncState.items, state.searchQuery);
    }
    return asyncState.items;
  });

  const groupedItems = $derived.by(() => {
    return grouping.groupItems(displayItems);
  });

  // Loading states
  const isLoadingMore = $derived(asyncState.isLoading && asyncState.currentPage > 1);
  const canLoadMore = $derived(asyncState.hasMore && !asyncState.isLoading && !asyncState.error);

  // Initialize data on first open
  async function initializeData() {
    if (asyncState.items.length > 0 || asyncState.isLoading) return;
    
    await loadInitialData();
  }

  async function loadInitialData() {
    if (asyncState.isLoading) return;

    asyncState.isLoading = true;
    asyncState.error = null;
    config.onLoadStart?.();

    // Cancel any existing request
    if (loadAbortController) {
      loadAbortController.abort();
    }
    loadAbortController = new AbortController();

    try {
      const result = await apiService.loadInitialData(loadAbortController.signal);
      
      asyncState.items = result.items;
      asyncState.localItems = result.items; // Store for local search
      asyncState.currentPage = 1;
      asyncState.hasMore = result.hasMore;
      asyncState.total = result.total;
      asyncState.error = null;
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        const errorMessage = error.message || config.errorText || 'Failed to load data';
        asyncState.error = errorMessage;
        config.onError?.(errorMessage);
      }
    } finally {
      asyncState.isLoading = false;
      config.onLoadEnd?.();
    }
  }

  async function loadMore() {
    if (!canLoadMore) return;

    asyncState.isLoading = true;
    config.onLoadStart?.();

    // Cancel any existing request
    if (loadAbortController) {
      loadAbortController.abort();
    }
    loadAbortController = new AbortController();

    try {
      const result = await apiService.loadNextPage(
        asyncState.currentPage, 
        config.searchMode === 'api' ? state.searchQuery : '',
        loadAbortController.signal
      );
      
      asyncState.items = [...asyncState.items, ...result.items];
      if (config.searchMode === 'local') {
        asyncState.localItems = [...asyncState.localItems, ...result.items];
      }
      asyncState.currentPage += 1;
      asyncState.hasMore = result.hasMore;
      asyncState.total = result.total;
      asyncState.error = null;
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        const errorMessage = error.message || config.errorText || 'Failed to load more data';
        asyncState.error = errorMessage;
        config.onError?.(errorMessage);
      }
    } finally {
      asyncState.isLoading = false;
      config.onLoadEnd?.();
    }
  }

  async function performSearch(query: string) {
    if (config.searchMode === 'local') {
      // Local search - no API call needed
      return;
    }

    if (query.length < (config.minSearchLength || 2)) {
      // Reset to initial data for short queries
      await loadInitialData();
      return;
    }

    asyncState.isSearching = true;
    asyncState.error = null;
    config.onLoadStart?.();

    // Cancel any existing request
    if (loadAbortController) {
      loadAbortController.abort();
    }
    loadAbortController = new AbortController();

    try {
      const result = await apiService.searchData(query, loadAbortController.signal);
      
      asyncState.items = result.items;
      asyncState.currentPage = 1;
      asyncState.hasMore = result.hasMore;
      asyncState.total = result.total;
      asyncState.error = null;
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        const errorMessage = error.message || config.errorText || 'Search failed';
        asyncState.error = errorMessage;
        config.onError?.(errorMessage);
      }
    } finally {
      asyncState.isSearching = false;
      config.onLoadEnd?.();
    }
  }

  // Actions
  async function toggleDropdown() {
    if (config.disabled) return;
    
    const newIsOpen = !state.isOpen;
    state.setIsOpen(newIsOpen);
    config.onOpenChange?.(newIsOpen);

    if (newIsOpen) {
      await initializeData();
      floatingUI.setupFloatingUI(state.triggerElement, state.dropdownElement);
      requestAnimationFrame(() => {
        state.inputElement?.focus();
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
    
    // Cancel any ongoing requests
    if (loadAbortController) {
      loadAbortController.abort();
    }
  }

  function selectItem(item: ComboboxItem) {
    if (item.disabled) return;

    config.onValueChange?.(item.value);

    if (config.closeOnSelect) {
      closeDropdown();
    }

    state.triggerElement?.focus();
  }

  function handleSearchInput(query: string) {
    state.setSearchQuery(query);
    config.onSearchChange?.(query);
    state.setFocusedIndex(-1);

    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Debounce search for API mode
    if (config.searchMode === 'api' || config.searchMode === 'both') {
      searchTimeout = setTimeout(() => {
        performSearch(query);
      }, config.searchDebounceMs || 300);
    }
  }

  // Keyboard navigation hook
  const keyboard = useComboboxKeyboard({
    disabled: config.disabled,
    items: displayItems,
    focusedIndex: state.focusedIndex,
    isOpen: state.isOpen,
    setFocusedIndex: state.setFocusedIndex,
    toggleDropdown,
    closeDropdown,
    selectItem,
    onLoadMore: loadMore,
    canLoadMore
  });

  function handleClickOutside(event: MouseEvent) {
    dropdown.handleClickOutside(
      event,
      state.triggerElement,
      state.dropdownElement,
      state.isOpen,
      closeDropdown
    );
  }

  function scrollFocusedItemIntoView() {
    dropdown.scrollFocusedItemIntoView(
      state.focusedIndex,
      state.dropdownElement
    );
  }

  async function refresh() {
    apiService.clearCache();
    asyncState.items = [];
    asyncState.localItems = [];
    asyncState.currentPage = 0;
    asyncState.hasMore = true;
    asyncState.error = null;
    
    if (state.isOpen) {
      await loadInitialData();
    }
  }

  function setupFloatingUI() {
    floatingUI.setupFloatingUI(state.triggerElement, state.dropdownElement);
  }

  function cleanupFloatingUI() {
    floatingUI.cleanupFloatingUI();
  }

  // Handle scroll events for infinite loading
  function handleScroll(event: Event) {
    dropdown.handleScroll(event, canLoadMore, loadMore);
  }

  // Return state and actions
  return {
    // State getters
    get isOpen() { return state.isOpen; },
    get searchQuery() { return state.searchQuery; },
    get focusedIndex() { return state.focusedIndex; },
    get filteredItems() { return displayItems; },
    get groupedItems() { return groupedItems; },
    get selectedItem() { return selectedItem; },
    get displayValue() { return displayValue; },
    
    // Async state
    get asyncState() { return asyncState; },
    get isLoading() { return asyncState.isLoading; },
    get isSearching() { return asyncState.isSearching; },
    get isLoadingMore() { return isLoadingMore; },
    get canLoadMore() { return canLoadMore; },
    get error() { return asyncState.error; },
    get hasMore() { return asyncState.hasMore; },
    get total() { return asyncState.total; },

    // Actions
    toggleDropdown,
    closeDropdown,
    selectItem,
    handleSearchInput,
    handleKeydown: keyboard.handleKeydown,
    handleClickOutside,
    scrollFocusedItemIntoView,
    handleScroll,
    loadMore,
    refresh,
    setupFloatingUI,
    cleanupFloatingUI,

    // DOM setters
    setTriggerElement: state.setTriggerElement,
    setDropdownElement: state.setDropdownElement,
    setInputElement: state.setInputElement,

    // Cleanup
    cleanup: () => {
      if (loadAbortController) {
        loadAbortController.abort();
      }
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      floatingUI.cleanup();
    },
  };
}

/**
 * Example of functional composition approach
 * Demonstrates how hooks can be composed for different behaviors
 */
export function createAsyncComboboxWithComposition(config: AsyncComboboxManagerConfig) {
  // Get the original implementation
  const originalCombobox = createAsyncComboboxState(config);
  
  // Compose additional behaviors 
  const compositionUtils = {
    // Utility to get all hooks used
    getHooks: () => ({
      state: useComboboxState(),
      grouping: useComboboxGrouping(), 
      dropdown: useComboboxDropdown(),
      floatingUI: useComboboxFloatingUI({
        placement: config.placement,
        maxHeight: config.maxHeight
      })
    }),
    
    // Enhanced behaviors through composition
    enhancedBehaviors: {
      // Compose multiple actions into one
      handleDropdownInteraction: (event: MouseEvent | KeyboardEvent) => {
        if (event instanceof MouseEvent) {
          originalCombobox.handleClickOutside(event);
        } else if (event instanceof KeyboardEvent) {
          originalCombobox.handleKeydown(event);
        }
      },
      
      // Compose state changes with side effects
      selectItemWithAnalytics: (item: ComboboxItem) => {
        // Analytics or logging could be composed here
        console.log(`Item selected: ${item.label}`);
        originalCombobox.selectItem(item);
      }
    }
  };
  
  // Return enhanced combobox with composition utilities
  return {
    // Original functionality
    ...originalCombobox,
    
    // Additional composed functionality
    composition: compositionUtils,
    
    // Demonstrate functional composition 
    withBehavior: (behaviorFn: (combobox: typeof originalCombobox) => any) => {
      return behaviorFn(originalCombobox);
    }
  };
}