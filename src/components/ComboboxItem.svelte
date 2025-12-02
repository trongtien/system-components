<script lang="ts">
  import type { ComboboxItem } from "../types";

  interface Props {
    item: ComboboxItem;
    index: number;
    isSelected: boolean;
    isFocused: boolean;
    onSelect: (item: ComboboxItem) => void;
  }

  let { item, index, isSelected, isFocused, onSelect }: Props = $props();
</script>

<button
  class="combobox__item"
  class:combobox__item--selected={isSelected}
  class:combobox__item--focused={isFocused}
  class:combobox__item--disabled={item.disabled}
  disabled={item.disabled}
  data-index={index}
  onclick={() => onSelect(item)}
  role="option"
  aria-selected={isSelected}
>
  {item.label}
  {#if isSelected}
    <svg
      class="combobox__check"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  {/if}
</button>

<style lang="scss">
  .combobox__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: calc(var(--radius) - 4px);
    background: none;
    color: var(--foreground);
    font-size: 0.875rem;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    outline: none;

    &:hover:not(:disabled) {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }

    &--focused {
      background-color: var(--accent);
      color: var(--accent-foreground);
    }

    &--selected {
      background-color: var(--primary);
      color: var(--primary-foreground);

      &:hover {
        background-color: var(--primary);
        color: var(--primary-foreground);
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        background: none;
        color: var(--foreground);
      }
    }
  }

  .combobox__check {
    flex-shrink: 0;
    margin-left: 0.5rem;
  }
</style>