<script lang="ts">
  import type { ButtonProps } from "../types";
  import { toStyleString } from "../utils";

  interface Props extends ButtonProps {}

  let {
    label = "Button",
    variant = "primary",
    disabled = false,
    permission = true,
    onclick,
    style,
  }: Props = $props();

  function handleClick(e: MouseEvent) {
    if (disabled) return;

    if (!permission) {
      alert("You do not have permission to perform this action.");
      return;
    }

    onclick?.(e);
  }

  let computedStyle = $derived(toStyleString(style));
  let buttonClass = $derived(`btn btn--${variant}`);
</script>

<button
  class={buttonClass}
  {disabled}
  {...{ onclick: handleClick, style: computedStyle }}
>
  <slot>{label}</slot>
</button>

<style lang="scss">
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border: 1px solid transparent;
    outline: none;
    padding: 0.5rem 1rem;
    font-family: var(--font-family);

    &:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--primary {
      background-color: var(--primary);
      color: var(--primary-foreground);

      &:hover:not(:disabled) {
        opacity: 0.9;
      }
    }

    &--secondary {
      background-color: var(--secondary);
      color: var(--secondary-foreground);
      border-color: var(--border);

      &:hover:not(:disabled) {
        opacity: 0.8;
      }
    }

    &--destructive {
      background-color: var(--destructive);
      color: var(--primary-foreground);

      &:hover:not(:disabled) {
        opacity: 0.9;
      }
    }

    &--outline {
      border-color: var(--border);
      background-color: transparent;
      color: var(--foreground);

      &:hover:not(:disabled) {
        background-color: var(--accent);
        color: var(--accent-foreground);
      }
    }

    &--ghost {
      background-color: transparent;
      color: var(--foreground);
      border-color: transparent;

      &:hover:not(:disabled) {
        background-color: var(--accent);
        color: var(--accent-foreground);
      }
    }
  }
</style>
