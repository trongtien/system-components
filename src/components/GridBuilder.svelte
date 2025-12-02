<script lang="ts">
  import type { GridBuilderProps, GridTemplateConfig } from '../types/grid.type';
  import GridContainer from './GridContainer.svelte';
  import GridItem from './GridItem.svelte';
  
  interface Props extends GridBuilderProps {
    class?: string;
    style?: string;
  }
  
  let {
    initialColumns = 12,
    initialRows = 6,
    maxColumns = 24,
    maxRows = 12,
    showGrid = true,
    showGuidelines = true,
    allowResize = true,
    allowDrop = true,
    onConfigChange,
    class: className = '',
    style = ''
  }: Props = $props();
  
  let config = $state<GridTemplateConfig>({
    columns: initialColumns,
    rows: initialRows,
    gap: 16,
    items: [],
    containerProps: {}
  });
  
  let selectedItem = $state<string | null>(null);
  
  function addItem() {
    const newItem = {
      id: `item-${Date.now()}`,
      columnStart: 1,
      columnEnd: 3,
      rowStart: 1,
      rowEnd: 2
    };
    config.items = [...config.items, newItem];
    onConfigChange?.(config);
  }
  
  function removeItem(id: string) {
    config.items = config.items.filter(item => item.id !== id);
    if (selectedItem === id) {
      selectedItem = null;
    }
    onConfigChange?.(config);
  }
  
  function updateColumns(value: number) {
    config.columns = Math.min(Math.max(value, 1), maxColumns);
    onConfigChange?.(config);
  }
  
  function updateRows(value: number) {
    config.rows = Math.min(Math.max(value, 1), maxRows);
    onConfigChange?.(config);
  }
</script>

<div class="grid-builder {className}" style="{style}">
  <div class="controls">
    <div class="control-group">
      <label>Columns: 
        <input 
          type="number" 
          bind:value={config.columns} 
          min="1" 
          max={maxColumns}
          onchange={() => onConfigChange?.(config)}
        />
      </label>
      <label>Rows:
        <input 
          type="number" 
          bind:value={config.rows} 
          min="1" 
          max={maxRows}
          onchange={() => onConfigChange?.(config)}
        />
      </label>
    </div>
    
    <div class="control-group">
      <button onclick={addItem}>Add Item</button>
      <label>
        <input type="checkbox" bind:checked={showGrid} /> Show Grid
      </label>
      <label>
        <input type="checkbox" bind:checked={showGuidelines} /> Show Guidelines
      </label>
    </div>
  </div>
  
  <div class="grid-preview" class:show-grid={showGrid}>
    <GridContainer columns={config.columns} rows={config.rows} gap={config.gap}>
      {#each config.items as item (item.id)}
        <GridItem 
          columnStart={item.columnStart}
          columnEnd={item.columnEnd}
          rowStart={item.rowStart} 
          rowEnd={item.rowEnd}
          class="builder-item {selectedItem === item.id ? 'selected' : ''}"
        >
          <div class="item-content">
            <span class="item-label">{item.id}</span>
            <button class="remove-btn" onclick={() => removeItem(item.id)}>×</button>
          </div>
        </GridItem>
      {/each}
    </GridContainer>
  </div>
</div>

<style>
  .grid-builder {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background: #f9f9f9;
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
    padding: 12px;
    background: white;
    border-radius: 4px;
  }
  
  .control-group {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  
  .control-group label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }
  
  .control-group input[type="number"] {
    width: 60px;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .grid-preview {
    min-height: 300px;
    border: 2px dashed #ccc;
    border-radius: 4px;
    padding: 16px;
    background: white;
    position: relative;
  }
  
  .show-grid .grid-preview {
    background-image: 
      linear-gradient(to right, #f0f0f0 1px, transparent 1px),
      linear-gradient(to bottom, #f0f0f0 1px, transparent 1px);
    background-size: 20px 20px;
  }
  
  .builder-item {
    border: 2px solid #007acc;
    border-radius: 4px;
    background: rgba(0, 122, 204, 0.1);
    cursor: pointer;
    position: relative;
  }
  
  .builder-item.selected {
    border-color: #ff6b00;
    background: rgba(255, 107, 0, 0.1);
  }
  
  .item-content {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    min-height: 40px;
  }
  
  .item-label {
    font-size: 12px;
    font-weight: bold;
    color: #333;
  }
  
  .remove-btn {
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    line-height: 1;
  }
  
  .remove-btn:hover {
    background: #cc0000;
  }
  
  button {
    padding: 6px 12px;
    border: 1px solid #007acc;
    border-radius: 4px;
    background: #007acc;
    color: white;
    cursor: pointer;
    font-size: 14px;
  }
  
  button:hover {
    background: #005c99;
  }
</style>