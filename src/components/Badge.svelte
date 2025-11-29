<svelte:options customElement={{ tag: "badge-component", shadow: "none" }} />

<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    children?: Snippet;
    text?: string;
    style?: string;
  }

  let {
    variant = 'default',
    size = 'md',
    children,
    text = '',
    style
  }: Props = $props();

  let badgeClass = $derived(`badge badge--${variant} badge--${size}`);
  
  // Expose methods for external access
  export function getBadgeElement() {
    return badgeElement;
  }

  let badgeElement: HTMLSpanElement;
</script>

<span
  bind:this={badgeElement}
  class={badgeClass}
  {style}
>
  {#if children}
    {@render children()}
  {:else}
    {text}
  {/if}
</span>

<style lang="scss">
  .badge {
    display: inline-flex;
    align-items: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    padding: 0.25rem 0.5rem;
    font-family: var(--font-family);

    &--default {
      background-color: var(--secondary);
      color: var(--secondary-foreground);
    }

    &--primary {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    &--success {
      background-color: #22c55e;
      color: white;
    }

    &--warning {
      background-color: #f59e0b;
      color: white;
    }

    &--error {
      background-color: var(--destructive);
      color: var(--primary-foreground);
    }

    &--sm {
      font-size: 0.625rem;
      padding: 0.125rem 0.375rem;
    }

    &--md {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
    }

    &--lg {
      font-size: 0.875rem;
      padding: 0.375rem 0.75rem;
    }
  }
</style>