<script lang="ts">
  interface Props {
    isOpen: boolean;
    displayValue: string;
    placeholder: string;
    disabled: boolean;
    error: boolean;
    onToggle: () => void;
    onKeydown: (event: KeyboardEvent) => void;
  }

  let {
    isOpen,
    displayValue,
    placeholder,
    disabled,
    error,
    onToggle,
    onKeydown
  }: Props = $props();

  let triggerElement: HTMLButtonElement;

  // Expose element to parent
  export { triggerElement };
</script>

<button
  bind:this={triggerElement}
  class="combobox__trigger"
  class:combobox__trigger--open={isOpen}
  class:combobox__trigger--error={error}
  class:combobox__trigger--disabled={disabled}
  {disabled}
  onclick={onToggle}
  onkeydown={onKeydown}
  role="combobox"
  aria-expanded={isOpen}
  aria-controls="combobox-dropdown"
  aria-haspopup="listbox"
  aria-label={placeholder}
>
  <span class="combobox__value">
    {displayValue || placeholder}
  </span>
  <svg
    class="combobox__chevron"
    class:combobox__chevron--open={isOpen}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
</button>

<style lang="scss">
  .combobox__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: 2.5rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background-color: var(--background);
    color: var(--foreground);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    outline: none;

    &:hover:not(:disabled) {
      border-color: var(--accent-foreground);
    }

    &:focus {
      border-color: var(--ring);
      box-shadow: 0 0 0 2px oklch(from var(--ring) l c h / 0.2);
    }

    &--open {
      border-color: var(--ring);
      box-shadow: 0 0 0 2px oklch(from var(--ring) l c h / 0.2);
    }

    &--error {
      border-color: var(--destructive);

      &:focus {
        border-color: var(--destructive);
        box-shadow: 0 0 0 2px oklch(from var(--destructive) l c h / 0.2);
      }
    }

    &--error.combobox__trigger--open {
      border-color: var(--destructive);
      box-shadow: 0 0 0 2px oklch(from var(--destructive) l c h / 0.2);
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--muted);
    }
  }

  .combobox__value {
    flex: 1;
    text-align: left;
    color: var(--foreground);

    .combobox__trigger:not(:focus) &:empty::before {
      content: attr(data-placeholder);
      color: var(--muted-foreground);
    }
  }

  .combobox__chevron {
    flex-shrink: 0;
    margin-left: 0.5rem;
    color: var(--muted-foreground);
    transition: transform 0.2s ease-in-out;

    &--open {
      transform: rotate(180deg);
    }
  }
</style>