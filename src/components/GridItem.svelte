<script lang="ts">
  import type { GridItemProps } from '../types/grid.type';
  import type { Snippet } from 'svelte';
  
  interface Props extends Omit<GridItemProps, 'id'> {
    children?: Snippet;
    class?: string;
    style?: string;
  }
  
  let {
    columnStart,
    columnEnd,
    columnSpan,
    rowStart,
    rowEnd,
    rowSpan,
    justifySelf,
    alignSelf,
    order,
    children,
    class: className = '',
    style = ''
  }: Props = $props();
  
  let computedStyle = $derived(() => {
    const styles: string[] = [];
    
    // Column positioning
    if (columnStart !== undefined) {
      styles.push(`grid-column-start: ${columnStart}`);
    }
    if (columnEnd !== undefined) {
      styles.push(`grid-column-end: ${columnEnd}`);
    }
    if (columnSpan !== undefined) {
      styles.push(`grid-column: span ${columnSpan}`);
    }
    
    // Row positioning
    if (rowStart !== undefined) {
      styles.push(`grid-row-start: ${rowStart}`);
    }
    if (rowEnd !== undefined) {
      styles.push(`grid-row-end: ${rowEnd}`);
    }
    if (rowSpan !== undefined) {
      styles.push(`grid-row: span ${rowSpan}`);
    }
    
    // Self alignment
    if (justifySelf) {
      styles.push(`justify-self: ${justifySelf}`);
    }
    if (alignSelf) {
      styles.push(`align-self: ${alignSelf}`);
    }
    
    // Order
    if (order !== undefined) {
      styles.push(`order: ${order}`);
    }
    
    return styles.join('; ') + (style ? `; ${style}` : '');
  });
</script>

<div 
  class="grid-item {className}" 
  style={computedStyle()}
>
  {@render children?.()}
</div>

<style>
  .grid-item {
    box-sizing: border-box;
  }
</style>