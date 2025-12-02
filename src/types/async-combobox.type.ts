import type { ComboboxItem } from './combobox.type';

export interface AsyncComboboxConfig {
  // API Configuration
  apiUrl?: string;
  searchApiUrl?: string;
  apiKey?: string;
  headers?: Record<string, string>;
  
  // Pagination Settings
  limit?: number;
  initialPage?: number;
  pageParam?: string;
  limitParam?: string;
  searchParam?: string;
  
  // Search Mode
  searchMode?: 'local' | 'api' | 'both';
  searchDebounceMs?: number;
  minSearchLength?: number;
  
  // Loading States
  loadingText?: string;
  noMoreDataText?: string;
  errorText?: string;
  
  // Data Transformation
  transformResponse?: (response: any) => {
    items: any[];
    hasMore: boolean;
    total?: number;
  };
  transformItem?: (item: any) => ComboboxItem;
  
  // Cache Settings
  enableCache?: boolean;
  cacheKey?: string;
  cacheTtl?: number; // milliseconds
}

export interface AsyncComboboxState {
  items: ComboboxItem[];
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;
  total?: number;
  localItems: ComboboxItem[]; // For local search mode
}

export interface AsyncComboboxActions {
  toggleDropdown: () => void;
  closeDropdown: () => void;
  selectItem: (item: ComboboxItem) => void;
  handleSearchInput: (query: string) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  handleClickOutside: (event: MouseEvent) => void;
  scrollFocusedItemIntoView: () => void;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  setupFloatingUI: () => void;
  cleanupFloatingUI: () => void;
  handleScroll: (event: Event) => void;
}

export interface AsyncComboboxManagerConfig extends AsyncComboboxConfig {
  value?: string;
  disabled?: boolean;
  closeOnSelect?: boolean;
  maxHeight?: string;
  placement?: string;
  emptyMessage?: string;
  onValueChange?: (value: string | undefined) => void;
  onOpenChange?: (open: boolean) => void;
  onSearchChange?: (search: string) => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: string) => void;
}

export type AsyncComboboxStateManager = {
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
  readonly asyncState: AsyncComboboxState;
  readonly isLoading: boolean;
  readonly isSearching: boolean;
  readonly isLoadingMore: boolean;
  readonly canLoadMore: boolean;
  readonly error: string | null;
  readonly hasMore: boolean;
  readonly total?: number;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  selectItem: (item: ComboboxItem) => void;
  handleSearchInput: (query: string) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  handleClickOutside: (event: MouseEvent) => void;
  scrollFocusedItemIntoView: () => void;
  handleScroll: (event: Event) => void;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  setupFloatingUI: () => void;
  cleanupFloatingUI: () => void;
  setTriggerElement: (element: HTMLButtonElement) => void;
  setDropdownElement: (element: HTMLDivElement) => void;
  setInputElement: (element: HTMLInputElement) => void;
  cleanup: () => void;
};