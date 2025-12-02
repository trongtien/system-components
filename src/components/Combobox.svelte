<svelte:options customElement={{ tag: "combobox-component", shadow: "none" }} />

<script lang="ts">
  import type { ComboboxProps, ComboboxItem } from "../types";
  import { toStyleString } from "../utils";
  import { createComboboxState } from "../amp/combobox.amp.svelte";
  import type { Snippet } from "svelte";
  import ComboboxTrigger from "./ComboboxTrigger.svelte";
  import ComboboxDropdown from "./ComboboxDropdown.svelte";

  interface Props extends ComboboxProps {
    children?: Snippet;
  }

  let {
    items = [],
    value = $bindable(),
    placeholder = "Select an item...",
    disabled = false,
    error = false,
    emptyMessage = "No items found.",
    searchable = true,
    closeOnSelect = true,
    maxHeight = "200px",
    filterFunction,
    placement = "bottom-start",
    style,
    onValueChange,
    onOpenChange,
    onSearchChange,
    children,
  }: Props = $props();

  // Create state manager
  const comboboxState = createComboboxState({
    items,
    value,
    disabled,
    searchable,
    closeOnSelect,
    maxHeight,
    placement,
    filterFunction,
    emptyMessage,
    onValueChange: (newValue) => {
      value = newValue;
      onValueChange?.(newValue);
    },
    onOpenChange,
    onSearchChange,
  });

  // Component references
  let triggerComponent: any = $state();
  let dropdownComponent: any = $state();

  let computedStyle = $derived(toStyleString(style));

  // Set DOM references when elements are available
  $effect(() => {
    if (triggerComponent?.triggerElement) {
      comboboxState.setTriggerElement(triggerComponent.triggerElement);
    }
    if (dropdownComponent?.dropdownElement) {
      comboboxState.setDropdownElement(dropdownComponent.dropdownElement);
    }
    if (dropdownComponent?.searchComponent?.inputElement) {
      comboboxState.setInputElement(dropdownComponent.searchComponent.inputElement);
    }
  });

  // Watch for focused index changes to scroll
  $effect(() => {
    comboboxState.scrollFocusedItemIntoView();
  });

  // Setup click outside listener
  $effect(() => {
    if (comboboxState.isOpen) {
      document.addEventListener("click", comboboxState.handleClickOutside);
      return () => {
        document.removeEventListener("click", comboboxState.handleClickOutside);
      };
    }
  });

  // Cleanup on destroy
  $effect(() => {
    return () => {
      comboboxState.cleanup();
    };
  });
</script>

<div class="combobox" style={computedStyle}>
  <ComboboxTrigger
    bind:this={triggerComponent}
    isOpen={comboboxState.isOpen}
    displayValue={comboboxState.displayValue}
    {placeholder}
    {disabled}
    {error}
    onToggle={comboboxState.toggleDropdown}
    onKeydown={comboboxState.handleKeydown}
  />

  {#if comboboxState.isOpen}
    <ComboboxDropdown
      bind:this={dropdownComponent}
      filteredItems={comboboxState.filteredItems}
      groupedItems={comboboxState.groupedItems}
      searchQuery={comboboxState.searchQuery}
      focusedIndex={comboboxState.focusedIndex}
      selectedValue={value}
      {searchable}
      {emptyMessage}
      onSearchInput={comboboxState.handleSearchInput}
      onSelectItem={comboboxState.selectItem}
      onKeydown={comboboxState.handleKeydown}
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