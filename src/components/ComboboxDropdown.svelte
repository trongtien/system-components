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
    onKeydown
  }: Props = $props();

  let dropdownElement: HTMLDivElement;
  let searchComponent: any = $state();

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
    />
  {/if}

  <div class="combobox__content">
    {#if filteredItems.length === 0}
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