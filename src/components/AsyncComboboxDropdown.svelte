<script lang="ts">
  import type { ComboboxItem } from "../types";
  import ComboboxSearch from "./ComboboxSearch.svelte";
  import ComboboxItemComponent from "./ComboboxItem.svelte";
  import ComboboxGroup from "./ComboboxGroup.svelte";

  interface Props {
    filteredItems: ComboboxItem[];
    groupedItems: {
      groups: { [key: string]: ComboboxItem[] };
      ungrouped: ComboboxItem[];
    };
    searchQuery: string;
    focusedIndex: number;
    selectedValue?: string;
    searchable: boolean;
    emptyMessage: string;
    onSearchInput: (value: string) => void;
    onSelectItem: (item: ComboboxItem) => void;
    onKeydown: (event: KeyboardEvent) => void;
    onScroll?: (event: Event) => void;
    
    // Async props
    isLoading?: boolean;
    isSearching?: boolean;
    isLoadingMore?: boolean;
    canLoadMore?: boolean;
    hasMore?: boolean;
    error?: string | null;
    loadingText?: string;
    noMoreDataText?: string;
    errorText?: string;
    onLoadMore?: () => Promise<void>;
    onRefresh?: () => Promise<void>;
  }

  let {
    filteredItems,
    groupedItems,
    searchQuery,
    focusedIndex,
    selectedValue,
    searchable,
    emptyMessage,
    onSearchInput,
    onSelectItem,
    onKeydown,
    onScroll,
    isLoading = false,
    isSearching = false,
    isLoadingMore = false,
    canLoadMore = false,
    hasMore = false,
    error = null,
    loadingText = "Loading...",
    noMoreDataText = "No more items",
    errorText = "Failed to load data",
    onLoadMore,
    onRefresh
  }: Props = $props();

  let dropdownElement: HTMLDivElement;
  let searchComponent: any = $state();
  let contentElement: HTMLDivElement;

  // Handle scroll for infinite loading
  function handleContentScroll(event: Event) {
    onScroll?.(event);
  }

  // Retry loading on error
  async function handleRetry() {
    if (onRefresh) {
      await onRefresh();
    }
  }

  // Load more manually
  async function handleLoadMore() {
    if (onLoadMore && canLoadMore) {
      await onLoadMore();
    }
  }

  // Expose elements to parent
  export { dropdownElement, searchComponent };
</script>

<div
  bind:this={dropdownElement}
  id="combobox-dropdown"
  class="combobox__dropdown"
  role="listbox"
  aria-label="Options"
>
  {#if searchable}
    <ComboboxSearch
      bind:this={searchComponent}
      {searchQuery}
      {onSearchInput}
      {onKeydown}
      disabled={isSearching}
    />
  {/if}

  <div 
    bind:this={contentElement}
    class="combobox__content"
    onscroll={handleContentScroll}
  >
    {#if error}
      <div class="combobox__error">
        <div class="combobox__error-message">
          {error}
        </div>
        {#if onRefresh}
          <button 
            class="combobox__retry-button"
            onclick={handleRetry}
            type="button"
          >
            Try Again
          </button>
        {/if}
      </div>
    {:else if isLoading && filteredItems.length === 0}
      <div class="combobox__loading">
        <div class="combobox__spinner"></div>
        <span>{loadingText}</span>
      </div>
    {:else if filteredItems.length === 0}
      <div class="combobox__empty">
        {emptyMessage}
      </div>
    {:else}
      {#if groupedItems.ungrouped.length > 0}
        {#each groupedItems.ungrouped as item, index (item.value)}
          <ComboboxItemComponent
            {item}
            {index}
            isSelected={item.value === selectedValue}
            isFocused={index === focusedIndex}
            onSelect={onSelectItem}
          />
        {/each}
      {/if}

      {#each Object.entries(groupedItems.groups) as [groupName, groupItems] (groupName)}
        {@const baseIndex = groupedItems.ungrouped.length + 
          Object.entries(groupedItems.groups)
            .slice(0, Object.keys(groupedItems.groups).indexOf(groupName))
            .reduce((acc, [, items]) => acc + items.length, 0)}
        <ComboboxGroup
          {groupName}
          items={groupItems}
          {baseIndex}
          selectedValue={selectedValue}
          {focusedIndex}
          onSelectItem={onSelectItem}
        />
      {/each}

      <!-- Loading more indicator -->
      {#if isLoadingMore}
        <div class="combobox__loading-more">
          <div class="combobox__spinner combobox__spinner--small"></div>
          <span>Loading more...</span>
        </div>
      {/if}

      <!-- Load more button (fallback for manual loading) -->
      {#if canLoadMore && !isLoadingMore && onLoadMore}
        <button 
          class="combobox__load-more-button"
          onclick={handleLoadMore}
          type="button"
        >
          Load More
        </button>
      {/if}

      <!-- No more data indicator -->
      {#if !hasMore && filteredItems.length > 0 && !isLoading}
        <div class="combobox__no-more">
          {noMoreDataText}
        </div>
      {/if}
    {/if}

    <!-- Search loading overlay -->
    {#if isSearching}
      <div class="combobox__search-overlay">
        <div class="combobox__spinner"></div>
        <span>Searching...</span>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .combobox__dropdown {
    position: absolute;
    z-index: 50;
    min-width: 100%;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background-color: var(--popover);
    color: var(--popover-foreground);
    box-shadow: 0 10px 15px -3px oklch(from var(--foreground) l c h / 0.1),
                0 4px 6px -4px oklch(from var(--foreground) l c h / 0.1);
    overflow: hidden;
    animation: combobox-dropdown-in 0.15s ease-out;
  }

  .combobox__content {
    max-height: inherit;
    overflow-y: auto;
    padding: 0.25rem;
    position: relative;

    &::-webkit-scrollbar {
      width: 0.375rem;
    }

    &::-webkit-scrollbar-track {
      background: var(--muted);
      border-radius: var(--radius);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: var(--radius);

      &:hover {
        background: var(--accent-foreground);
      }
    }
  }

  .combobox__empty {
    padding: 1rem 0.75rem;
    text-align: center;
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  .combobox__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 0.75rem;
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  .combobox__loading-more {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    color: var(--muted-foreground);
    font-size: 0.875rem;
    border-top: 1px solid var(--border);
    margin-top: 0.25rem;
  }

  .combobox__spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--muted);
    border-top: 2px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;

    &--small {
      width: 0.875rem;
      height: 0.875rem;
      border-width: 1.5px;
    }
  }

  .combobox__error {
    padding: 1rem 0.75rem;
    text-align: center;
  }

  .combobox__error-message {
    color: var(--destructive);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .combobox__retry-button {
    background: var(--destructive);
    color: var(--destructive-foreground);
    border: none;
    border-radius: var(--radius);
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  .combobox__load-more-button {
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-top: 1px solid var(--border);
    background: var(--muted);
    color: var(--muted-foreground);
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.25rem;

    &:hover {
      background: var(--accent);
      color: var(--accent-foreground);
    }
  }

  .combobox__no-more {
    padding: 0.75rem;
    text-align: center;
    color: var(--muted-foreground);
    font-size: 0.875rem;
    border-top: 1px solid var(--border);
    margin-top: 0.25rem;
  }

  .combobox__search-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--muted-foreground);
    font-size: 0.875rem;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes combobox-dropdown-in {
    from {
      opacity: 0;
      transform: translateY(-0.5rem) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>