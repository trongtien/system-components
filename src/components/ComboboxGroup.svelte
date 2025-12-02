<script lang="ts">
  import type { ComboboxItem } from "../types";
  import ComboboxItemComponent from "./ComboboxItem.svelte";

  interface Props {
    groupName: string;
    items: ComboboxItem[];
    baseIndex: number;
    selectedValue?: string;
    focusedIndex: number;
    onSelectItem: (item: ComboboxItem) => void;
  }

  let { groupName, items, baseIndex, selectedValue, focusedIndex, onSelectItem }: Props = $props();
</script>

<div class="combobox__group">
  <div class="combobox__group-label">
    {groupName}
  </div>
  {#each items as item, groupIndex (item.value)}
    {@const index = baseIndex + groupIndex}
    <ComboboxItemComponent
      {item}
      {index}
      isSelected={item.value === selectedValue}
      isFocused={index === focusedIndex}
      onSelect={onSelectItem}
    />
  {/each}
</div>

<style lang="scss">
  .combobox__group {
    &:not(:first-child) {
      border-top: 1px solid var(--border);
      margin-top: 0.25rem;
      padding-top: 0.25rem;
    }
  }

  .combobox__group-label {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--muted-foreground);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>