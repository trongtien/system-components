import type { ComboboxItem } from '../types';

interface SearchConfig {
  searchable?: boolean;
  filterFunction?: (items: ComboboxItem[], query: string) => ComboboxItem[];
}

/**
 * Hook xử lý search và filtering cho combobox
 */
export function useComboboxSearch(config: SearchConfig = {}) {
  function filterItems(items: ComboboxItem[], searchQuery: string): ComboboxItem[] {
    if (!config.searchable || !searchQuery) return items;
    
    if (config.filterFunction) {
      return config.filterFunction(items, searchQuery);
    }

    return items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  function handleSearchInput(
    query: string,
    setSearchQuery: (query: string) => void,
    setFocusedIndex: (index: number) => void,
    onSearchChange?: (query: string) => void
  ) {
    setSearchQuery(query);
    onSearchChange?.(query);
    setFocusedIndex(-1);
  }

  return {
    filterItems,
    handleSearchInput
  };
}