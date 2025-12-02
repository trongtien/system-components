<script lang="ts">
  import type { GridContainerProps } from '../types/grid.type';
  import type { Snippet } from 'svelte';
  
  interface Props extends GridContainerProps {
    children?: Snippet;
    class?: string;
    style?: string;
  }
  
  let {
    columns = 12,
    rows,
    gap = 16,
    columnGap,
    rowGap,
    autoFlow = 'row',
    justifyItems = 'stretch',
    alignItems = 'stretch',
    justifyContent,
    alignContent,
    responsive = false,
    breakpoints,
    children,
    class: className = '',
    style = ''
  }: Props = $props();
  
  let computedStyle = $derived(() => {
    const styles: string[] = [];
    
    // Grid template
    if (typeof columns === 'number') {
      styles.push(`grid-template-columns: repeat(${columns}, 1fr)`);
    } else if (columns) {
      styles.push(`grid-template-columns: ${columns}`);
    }
    
    if (rows) {
      if (typeof rows === 'number') {
        styles.push(`grid-template-rows: repeat(${rows}, 1fr)`);
      } else {
        styles.push(`grid-template-rows: ${rows}`);
      }
    }
    
    // Gap
    if (columnGap !== undefined || rowGap !== undefined) {
      styles.push(`column-gap: ${columnGap || 0}px`);
      styles.push(`row-gap: ${rowGap || 0}px`);
    } else if (gap) {
      const gapValue = typeof gap === 'number' ? `${gap}px` : gap;
      styles.push(`gap: ${gapValue}`);
    }
    
    // Flow
    styles.push(`grid-auto-flow: ${autoFlow}`);
    
    // Alignment
    styles.push(`justify-items: ${justifyItems}`);
    styles.push(`align-items: ${alignItems}`);
    
    if (justifyContent) {
      styles.push(`justify-content: ${justifyContent}`);
    }
    if (alignContent) {
      styles.push(`align-content: ${alignContent}`);
    }
    
    return styles.join('; ') + (style ? `; ${style}` : '');
  });
</script>

<div 
  class="grid-container {className}" 
  style="display: grid; {computedStyle()}"
>
  {@render children?.()}
</div>

<style>
  .grid-container {
    width: 100%;
  }
</style>