<script lang="ts">
  import type { LabelProps } from '../types';
  import type { Snippet } from 'svelte';

  interface Props extends LabelProps {
    children?: Snippet | string;
    for?: string;
  }

  let { required = false, className, children, for: forId }: Props = $props();
  let isStringChild = $derived(typeof children === 'string');
</script>

<label class="label {className ?? ''}" for={forId}>
  {#if children}
    {#if isStringChild}
      {children}
    {:else}
      {@render (children as Snippet)()}
    {/if}
  {/if}
  {#if required}
    <span class="label__required">*</span>
  {/if}
</label>

<style lang="scss">
  .label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary, #000);
    font-size: 1rem;

    &__required {
      color: #dc2626; // Red color for required asterisk
      margin-left: 0.25rem;
      font-weight: 700;
    }
  }
</style>
