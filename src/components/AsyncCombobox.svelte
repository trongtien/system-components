<svelte:options customElement={{ tag: "async-combobox-component", shadow: "none" }} />

<script lang="ts">
  import type { ComboboxProps } from "../types";
  import type { AsyncComboboxConfig } from "../types/async-combobox.type";
  import { toStyleString } from "../utils";
  import { createAsyncComboboxState } from "../amp/async-combobox.amp.svelte";
  import type { Snippet } from "svelte";
  import ComboboxTrigger from "./ComboboxTrigger.svelte";
  import AsyncComboboxDropdown from "./AsyncComboboxDropdown.svelte";

  interface Props extends Omit<ComboboxProps, 'items'>, AsyncComboboxConfig {
    children?: Snippet;
    onLoadStart?: () => void;
    onLoadEnd?: () => void;
    onError?: (error: string) => void;
  }

  let {
    // Combobox props
    value = $bindable(),
    placeholder = "Select an item...",
    disabled = false,
    error = false,
    emptyMessage = "No items found.",
    closeOnSelect = true,
    maxHeight = "200px",
    placement = "bottom-start",
    style,
    onValueChange,
    onOpenChange,
    onSearchChange,
    
    // AsyncCombobox specific props
    apiUrl,
    searchApiUrl,
    apiKey,
    headers,
    limit = 20,
    initialPage = 1,
    pageParam = 'page',
    limitParam = 'limit', 
    searchParam = 'search',
    searchMode = 'local',
    searchDebounceMs = 300,
    minSearchLength = 2,
    loadingText = "Loading...",
    noMoreDataText = "No more items",
    errorText = "Failed to load data",
    transformResponse,
    transformItem,
    enableCache = true,
    cacheKey,
    cacheTtl = 5 * 60 * 1000,
    
    // Event handlers
    onLoadStart,
    onLoadEnd,
    onError,
    children,
  }: Props = $props();

  // Create async state manager
  const asyncComboboxState = createAsyncComboboxState({
    // Base config
    value,
    disabled,
    closeOnSelect,
    maxHeight,
    placement,
    emptyMessage,
    onValueChange: (newValue: string | undefined) => {
      value = newValue;
      onValueChange?.(newValue);
    },
    onOpenChange,
    onSearchChange,
    
    // Async config
    apiUrl,
    searchApiUrl,
    apiKey,
    headers,
    limit,
    initialPage,
    pageParam,
    limitParam,
    searchParam,
    searchMode,
    searchDebounceMs,
    minSearchLength,
    loadingText,
    noMoreDataText,
    errorText,
    transformResponse,
    transformItem,
    enableCache,
    cacheKey,
    cacheTtl,
    onLoadStart,
    onLoadEnd,
    onError,
  });

  // Component references
  let triggerComponent: any = $state();
  let dropdownComponent: any = $state();

  let computedStyle = $derived(toStyleString(style));

  // Set DOM references when elements are available
  $effect(() => {
    if (triggerComponent?.triggerElement) {
      asyncComboboxState.setTriggerElement(triggerComponent.triggerElement);
    }
    if (dropdownComponent?.dropdownElement) {
      asyncComboboxState.setDropdownElement(dropdownComponent.dropdownElement);
    }
    if (dropdownComponent?.searchComponent?.inputElement) {
      asyncComboboxState.setInputElement(dropdownComponent.searchComponent.inputElement);
    }
  });

  // Watch for focused index changes to scroll
  $effect(() => {
    asyncComboboxState.scrollFocusedItemIntoView();
  });

  // Setup click outside listener
  $effect(() => {
    if (asyncComboboxState.isOpen) {
      document.addEventListener("click", asyncComboboxState.handleClickOutside);
      return () => {
        document.removeEventListener("click", asyncComboboxState.handleClickOutside);
      };
    }
  });

  // Cleanup on destroy
  $effect(() => {
    return () => {
      asyncComboboxState.cleanup();
    };
  });
</script>

<div class="combobox" style={computedStyle}>
  <ComboboxTrigger
    bind:this={triggerComponent}
    isOpen={asyncComboboxState.isOpen}
    displayValue={asyncComboboxState.displayValue}
    {placeholder}
    {disabled}
    {error}
    onToggle={asyncComboboxState.toggleDropdown}
    onKeydown={asyncComboboxState.handleKeydown}
  />

  {#if asyncComboboxState.isOpen}
    <AsyncComboboxDropdown
      bind:this={dropdownComponent}
      filteredItems={asyncComboboxState.filteredItems}
      groupedItems={asyncComboboxState.groupedItems}
      searchQuery={asyncComboboxState.searchQuery}
      focusedIndex={asyncComboboxState.focusedIndex}
      selectedValue={value}
      searchable={searchMode !== 'local' || true}
      onSearchInput={asyncComboboxState.handleSearchInput}
      onSelectItem={asyncComboboxState.selectItem}
      onKeydown={asyncComboboxState.handleKeydown}
      onScroll={asyncComboboxState.handleScroll}
      isLoading={asyncComboboxState.isLoading}
      isSearching={asyncComboboxState.isSearching}
      isLoadingMore={asyncComboboxState.isLoadingMore}
      canLoadMore={asyncComboboxState.canLoadMore}
      hasMore={asyncComboboxState.hasMore}
      error={asyncComboboxState.error}
      onLoadMore={asyncComboboxState.loadMore}
      onRefresh={asyncComboboxState.refresh}
      {loadingText}
      {noMoreDataText}
      {errorText}
      {emptyMessage}
    />
  {/if}
</div>

<style lang="scss">
  .combobox {
    position: relative;
    display: inline-block;
    width: 100%;
    font-family: var(--font-family);
  }
</style>