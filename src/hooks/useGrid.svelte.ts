import type { 
  GridContainerProps, 
  GridItemProps, 
  GridBuilderContext,
  GridTemplateConfig 
} from '../types/grid.type';

/**
 * Hook for Grid Container management
 */
export function useGridContainer(props: GridContainerProps = {}) {
  const {
    columns = 12,
    gap = '1rem',
    rowGap,
    columnGap,
    breakpoints = {
      xs: '0px',
      sm: '576px', 
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px'
    },
    container = false,
    justify = 'start',
    align = 'stretch',
    flow = 'row'
  } = props;

  // Generate CSS custom properties for grid
  const cssVariables = $derived.by(() => {
    const vars: Record<string, string> = {
      '--grid-columns': columns.toString(),
      '--grid-gap': typeof gap === 'number' ? `${gap}px` : gap,
      '--grid-justify': justify,
      '--grid-align': align,
      '--grid-flow': flow
    };

    if (rowGap) {
      vars['--grid-row-gap'] = typeof rowGap === 'number' ? `${rowGap}px` : rowGap;
    }
    if (columnGap) {
      vars['--grid-column-gap'] = typeof columnGap === 'number' ? `${columnGap}px` : columnGap;
    }

    // Add breakpoint variables
    Object.entries(breakpoints).forEach(([key, value]) => {
      vars[`--grid-bp-${key}`] = value;
    });

    return vars;
  });

  // Generate CSS classes
  const containerClasses = $derived.by(() => {
    const classes = ['grid-container'];
    
    if (container) {
      classes.push(container === 'fluid' ? 'grid-container-fluid' : 'grid-container-fixed');
    }
    
    if (props.class) {
      classes.push(props.class);
    }
    
    return classes.join(' ');
  });

  return {
    cssVariables,
    containerClasses,
    config: {
      columns,
      gap,
      rowGap,
      columnGap,
      breakpoints,
      container,
      justify,
      align,
      flow
    }
  };
}

/**
 * Hook for Grid Item management  
 */
export function useGridItem(props: GridItemProps = {}) {
  const {
    span,
    offset,
    order,
    xs, sm, md, lg, xl, xxl,
    flex,
    alignSelf,
    justifySelf
  } = props;

  // Generate responsive classes and styles
  const itemClasses = $derived.by(() => {
    const classes = ['grid-item'];
    
    // Base span and offset
    if (span) classes.push(`grid-span-${span}`);
    if (offset) classes.push(`grid-offset-${offset}`);
    
    // Responsive classes
    const breakpoints = { xs, sm, md, lg, xl, xxl };
    Object.entries(breakpoints).forEach(([bp, config]) => {
      if (config) {
        if (typeof config === 'number') {
          classes.push(`grid-${bp}-${config}`);
        } else {
          if (config.span) classes.push(`grid-${bp}-${config.span}`);
          if (config.offset) classes.push(`grid-${bp}-offset-${config.offset}`);
          if (config.order) classes.push(`grid-${bp}-order-${config.order}`);
          if (config.push) classes.push(`grid-${bp}-push-${config.push}`);
          if (config.pull) classes.push(`grid-${bp}-pull-${config.pull}`);
        }
      }
    });
    
    if (props.class) {
      classes.push(props.class);
    }
    
    return classes.join(' ');
  });

  // Generate inline styles
  const itemStyles = $derived.by(() => {
    const styles: Record<string, string> = {};
    
    if (order !== undefined) styles.order = order.toString();
    if (flex !== undefined) {
      if (typeof flex === 'boolean') {
        styles.flex = flex ? '1' : 'none';
      } else {
        styles.flex = flex.toString();
      }
    }
    if (alignSelf) styles['align-self'] = alignSelf;
    if (justifySelf) styles['justify-self'] = justifySelf;
    
    return styles;
  });

  return {
    itemClasses,
    itemStyles,
    config: props
  };
}

/**
 * Hook for Grid Builder functionality
 */
export function useGridBuilder(initialConfig?: GridTemplateConfig) {
  let config: GridTemplateConfig = $state(initialConfig || {
    container: { columns: 12 },
    items: []
  });

  let context: GridBuilderContext = $state({
    mode: 'design',
    selectedItem: undefined,
    dragItem: undefined
  });

  // Add new grid item
  function addItem(item: GridTemplateConfig['items'][0]) {
    config.items = [...config.items, {
      ...item,
      id: item.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }];
    context.onAddItem?.(item);
  }

  // Update existing item
  function updateItem(id: string, updates: Partial<GridItemProps>) {
    config.items = config.items.map(item => 
      item.id === id 
        ? { ...item, props: { ...item.props, ...updates } }
        : item
    );
    context.onUpdateItem?.(id, updates);
  }

  // Delete item
  function deleteItem(id: string) {
    config.items = config.items.filter(item => item.id !== id);
    if (context.selectedItem === id) {
      context.selectedItem = undefined;
    }
    context.onDeleteItem?.(id);
  }

  // Select item
  function selectItem(id: string) {
    context.selectedItem = id;
    context.onSelectItem?.(id);
  }

  // Duplicate item
  function duplicateItem(id: string) {
    const item = config.items.find(i => i.id === id);
    if (item) {
      const newItem = {
        ...item,
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      config.items = [...config.items, newItem];
    }
  }

  // Move item
  function moveItem(fromIndex: number, toIndex: number) {
    const items = [...config.items];
    const [removed] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, removed);
    config.items = items;
  }

  // Toggle mode
  function toggleMode() {
    context.mode = context.mode === 'design' ? 'preview' : 'design';
  }

  // Export configuration
  function exportConfig(): GridTemplateConfig {
    return JSON.parse(JSON.stringify(config));
  }

  // Import configuration
  function importConfig(newConfig: GridTemplateConfig) {
    config = { ...newConfig };
    context.selectedItem = undefined;
  }

  // Reset grid
  function reset() {
    config = {
      container: { columns: 12 },
      items: []
    };
    context.selectedItem = undefined;
  }

  return {
    // State
    get config() { return config; },
    get context() { return context; },
    get selectedItem() { 
      return config.items.find(item => item.id === context.selectedItem);
    },

    // Actions  
    addItem,
    updateItem,
    deleteItem,
    selectItem,
    duplicateItem,
    moveItem,
    toggleMode,
    exportConfig,
    importConfig,
    reset,

    // Utilities
    getItemById: (id: string) => config.items.find(item => item.id === id),
    getItemIndex: (id: string) => config.items.findIndex(item => item.id === id),
    getItemsCount: () => config.items.length,

    // Context setters
    setContext: (updates: Partial<GridBuilderContext>) => {
      Object.assign(context, updates);
    }
  };
}