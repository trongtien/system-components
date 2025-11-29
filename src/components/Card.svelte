<svelte:options customElement={{ tag: "card-component", shadow: "none" }} />

<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title?: string;
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'sm' | 'md' | 'lg';
    children?: Snippet;
    header?: Snippet;
    footer?: Snippet;
    style?: string;
  }

  let {
    title = '',
    variant = 'default',
    padding = 'md',
    children,
    header,
    footer,
    style
  }: Props = $props();

  let cardClass = $derived(`card card--${variant} card--padding-${padding}`);
  
  // Expose methods for external access
  export function getCardElement() {
    return cardElement;
  }

  let cardElement: HTMLDivElement;
</script>

<div
  bind:this={cardElement}
  class={cardClass}
  {style}
>
  {#if header || title}
    <div class="card__header">
      {#if header}
        {@render header()}
      {:else if title}
        <h3 class="card__title">{title}</h3>
      {/if}
    </div>
  {/if}
  
  {#if children}
    <div class="card__content">
      {@render children()}
    </div>
  {/if}
  
  {#if footer}
    <div class="card__footer">
      {@render footer()}
    </div>
  {/if}
</div>

<style lang="scss">
  .card {
    border-radius: var(--radius);
    font-family: var(--font-family);
    transition: all 0.2s ease-in-out;

    &--default {
      background-color: var(--card);
      border: 1px solid var(--border);
    }

    &--elevated {
      background-color: var(--card);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    &--outlined {
      background-color: var(--card);
      border: 2px solid var(--border);
    }

    &--padding-sm {
      padding: 0.75rem;
    }

    &--padding-md {
      padding: 1rem;
    }

    &--padding-lg {
      padding: 1.5rem;
    }
  }

  .card__header {
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
  }

  .card__title {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--card-foreground);
  }

  .card__content {
    color: var(--card-foreground);
  }

  .card__footer {
    margin-top: 1rem;
    border-top: 1px solid var(--border);
    padding-top: 0.5rem;
  }
</style>