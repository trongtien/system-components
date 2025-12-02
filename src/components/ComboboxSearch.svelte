<script lang="ts">
  interface Props {
    searchQuery: string;
    onSearchInput: (value: string) => void;
    onKeydown: (event: KeyboardEvent) => void;
    disabled?: boolean;
  }

  let { searchQuery, onSearchInput, onKeydown, disabled = false }: Props = $props();

  let inputElement: HTMLInputElement;

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    onSearchInput(event.currentTarget.value);
  }

  // Expose element to parent
  export { inputElement };
</script>

<div class="combobox__search">
  <input
    bind:this={inputElement}
    class="combobox__search-input"
    class:combobox__search-input--disabled={disabled}
    type="text"
    placeholder="Search..."
    bind:value={searchQuery}
    {disabled}
    oninput={handleInput}
    onkeydown={onKeydown}
  />
</div>

<style lang="scss">
  .combobox__search {
    padding: 0.5rem;
    border-bottom: 1px solid var(--border);
  }

  .combobox__search-input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: calc(var(--radius) - 2px);
    background-color: var(--background);
    color: var(--foreground);
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.2s ease-in-out;

    &:focus {
      border-color: var(--ring);
    }

    &::placeholder {
      color: var(--muted-foreground);
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
</style>