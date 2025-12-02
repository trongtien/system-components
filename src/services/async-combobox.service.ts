import type { ComboboxItem } from '../types';
import type { AsyncComboboxConfig, AsyncComboboxState } from '../types/async-combobox.type';

interface CacheEntry {
  data: any;
  timestamp: number;
  searchQuery?: string;
  page?: number;
}

class ComboboxCache {
  private cache = new Map<string, CacheEntry>();
  
  get(key: string, ttl: number): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    const isExpired = Date.now() - entry.timestamp > ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }
  
  set(key: string, data: any, searchQuery?: string, page?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      searchQuery,
      page
    });
  }
  
  clear(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }
    
    for (const [key] of this.cache) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
  
  invalidateSearch(searchQuery: string): void {
    for (const [key, entry] of this.cache) {
      if (entry.searchQuery && entry.searchQuery !== searchQuery) {
        this.cache.delete(key);
      }
    }
  }
}

export function createAsyncComboboxService(config: AsyncComboboxConfig) {
  const cache = new ComboboxCache();
  
  // Default configuration
  const defaultConfig = {
    limit: 20,
    initialPage: 1,
    pageParam: 'page',
    limitParam: 'limit',
    searchParam: 'search',
    searchMode: 'local' as const,
    searchDebounceMs: 300,
    minSearchLength: 2,
    loadingText: 'Loading...',
    noMoreDataText: 'No more items',
    errorText: 'Failed to load data',
    enableCache: true,
    cacheTtl: 5 * 60 * 1000, // 5 minutes
    ...config
  };

  // Default response transformer
  const defaultTransformResponse = (response: any) => {
    if (Array.isArray(response)) {
      return {
        items: response,
        hasMore: false
      };
    }
    
    return {
      items: response.data || response.items || [],
      hasMore: response.hasMore || response.has_more || false,
      total: response.total || response.count
    };
  };

  // Default item transformer
  const defaultTransformItem = (item: any): ComboboxItem => {
    if (typeof item === 'string') {
      return { value: item, label: item };
    }
    
    return {
      value: item.id || item.value || item.key,
      label: item.name || item.label || item.title || String(item.value || item.id),
      group: item.group || item.category,
      disabled: item.disabled || item.inactive || false
    };
  };

  const transformResponse = config.transformResponse || defaultTransformResponse;
  const transformItem = config.transformItem || defaultTransformItem;

  async function fetchData(
    page: number = defaultConfig.initialPage,
    searchQuery: string = '',
    signal?: AbortSignal
  ): Promise<{ items: ComboboxItem[]; hasMore: boolean; total?: number }> {
    const cacheKey = `${config.cacheKey || 'combobox'}_${page}_${searchQuery}`;
    
    // Check cache first
    if (defaultConfig.enableCache) {
      const cached = cache.get(cacheKey, defaultConfig.cacheTtl);
      if (cached) {
        return cached;
      }
    }

    // Determine API URL
    const isSearch = searchQuery.length >= defaultConfig.minSearchLength;
    const apiUrl = isSearch && config.searchApiUrl ? config.searchApiUrl : config.apiUrl;
    
    if (!apiUrl) {
      throw new Error('API URL not configured');
    }

    // Build query parameters
    const params = new URLSearchParams();
    params.append(defaultConfig.pageParam, page.toString());
    params.append(defaultConfig.limitParam, defaultConfig.limit.toString());
    
    if (isSearch) {
      params.append(defaultConfig.searchParam, searchQuery);
    }

    // Build headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...defaultConfig.headers
    };
    
    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
    }

    try {
      const response = await fetch(`${apiUrl}?${params}`, {
        method: 'GET',
        headers,
        signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const transformed = transformResponse(data);
      
      // Transform items
      const items = transformed.items.map(transformItem);
      
      const result = {
        items,
        hasMore: transformed.hasMore,
        total: transformed.total
      };

      // Cache the result
      if (defaultConfig.enableCache) {
        cache.set(cacheKey, result, searchQuery, page);
      }

      return result;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw error;
      }
      throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async function loadInitialData(signal?: AbortSignal): Promise<{
    items: ComboboxItem[];
    hasMore: boolean;
    total?: number;
  }> {
    return fetchData(defaultConfig.initialPage, '', signal);
  }

  async function loadNextPage(
    currentPage: number,
    searchQuery: string = '',
    signal?: AbortSignal
  ): Promise<{ items: ComboboxItem[]; hasMore: boolean; total?: number }> {
    return fetchData(currentPage + 1, searchQuery, signal);
  }

  async function searchData(
    query: string,
    signal?: AbortSignal
  ): Promise<{ items: ComboboxItem[]; hasMore: boolean; total?: number }> {
    // Clear search cache when new search
    if (defaultConfig.enableCache) {
      cache.invalidateSearch(query);
    }
    
    return fetchData(defaultConfig.initialPage, query, signal);
  }

  function clearCache(): void {
    cache.clear();
  }

  function filterLocalItems(items: ComboboxItem[], query: string): ComboboxItem[] {
    if (!query) return items;
    
    const lowerQuery = query.toLowerCase();
    return items.filter(item =>
      item.label.toLowerCase().includes(lowerQuery) ||
      item.value.toLowerCase().includes(lowerQuery)
    );
  }

  return {
    loadInitialData,
    loadNextPage,
    searchData,
    filterLocalItems,
    clearCache,
    config: defaultConfig
  };
}