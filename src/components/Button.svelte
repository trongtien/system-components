<svelte:options customElement="system-button" />

<script lang="ts">
  import type { ButtonProps } from "../types";
  import { toStyleString } from "../utils";
  import type { Snippet } from "svelte";

  interface Props extends ButtonProps {
    children?: Snippet;
    prefix?: Snippet;
    suffix?: Snippet;
  }

  let {
    label = "Button",
    variant = "primary",
    disabled = false,
    permission = true,
    onclick,
    style,
    icon,
    iconPosition = "left",
    children,
    prefix,
    suffix,
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
  let hasIcon = $derived(!!icon);
  let showIconLeft = $derived(hasIcon && iconPosition === "left");
  let showIconRight = $derived(hasIcon && iconPosition === "right");

  // Expose button element reference
  let buttonElement: HTMLButtonElement;

  // Expose methods for external access
  export function getButtonElement() {
    return buttonElement;
  }

  export function focus() {
    buttonElement?.focus();
  }

  export function blur() {
    buttonElement?.blur();
  }

  export function click() {
    buttonElement?.click();
  }
</script>

<button
  bind:this={buttonElement}
  class={buttonClass}
  {disabled}
  {...{ onclick: handleClick, style: computedStyle }}
>
  {#if prefix}
    <span class="btn__prefix">
      {@render prefix()}
    </span>
  {/if}
  
  {#if showIconLeft}
    <span class="btn__icon btn__icon--left">{icon}</span>
  {/if}
  
  <span class="btn__content">
    {#if children}
      {@render children()}
    {:else}
      {label}
    {/if}
  </span>
  
  {#if showIconRight}
    <span class="btn__icon btn__icon--right">{icon}</span>
  {/if}
  
  {#if suffix}
    <span class="btn__suffix">
      {@render suffix()}
    </span>
  {/if}
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

  .btn__content {
    display: inline-flex;
    align-items: center;
  }

  .btn__icon {
    display: inline-flex;
    align-items: center;
    font-size: 1em;
    line-height: 1;

    &--left {
      margin-right: 0.5rem;
    }

    &--right {
      margin-left: 0.5rem;
    }
  }

  .btn__prefix,
  .btn__suffix {
    display: inline-flex;
    align-items: center;
  }

  .btn__prefix {
    margin-right: 0.5rem;
  }

  .btn__suffix {
    margin-left: 0.5rem;
  }
</style>
