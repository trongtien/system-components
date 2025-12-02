import type { ComboboxItem } from '../types';

export interface GroupedItems {
  groups: { [key: string]: ComboboxItem[] };
  ungrouped: ComboboxItem[];
}

/**
 * Hook xử lý việc nhóm items theo group
 */
export function useComboboxGrouping() {
  function groupItems(items: ComboboxItem[]): GroupedItems {
    const groups: { [key: string]: ComboboxItem[] } = {};
    const ungrouped: ComboboxItem[] = [];

    items.forEach(item => {
      if (item.group) {
        if (!groups[item.group]) groups[item.group] = [];
        groups[item.group].push(item);
      } else {
        ungrouped.push(item);
      }
    });

    return { groups, ungrouped };
  }

  return {
    groupItems
  };
}