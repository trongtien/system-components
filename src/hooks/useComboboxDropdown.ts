/**
 * Hook xử lý dropdown interactions (click outside, scroll focus)
 */
export function useComboboxDropdown() {
  function handleClickOutside(
    event: MouseEvent,
    triggerElement: HTMLButtonElement | undefined,
    dropdownElement: HTMLDivElement | undefined,
    isOpen: boolean,
    closeDropdown: () => void
  ) {
    if (!isOpen) return;
    
    const target = event.target as Node;
    if (
      !triggerElement?.contains(target) &&
      !dropdownElement?.contains(target)
    ) {
      closeDropdown();
    }
  }

  function scrollFocusedItemIntoView(
    focusedIndex: number,
    dropdownElement: HTMLDivElement | undefined
  ) {
    if (focusedIndex >= 0) {
      const focusedElement = dropdownElement?.querySelector(`[data-index="${focusedIndex}"]`);
      focusedElement?.scrollIntoView({ block: "nearest" });
    }
  }

  function handleScroll(
    event: Event,
    canLoadMore: boolean,
    onLoadMore: () => Promise<void>
  ) {
    const target = event.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    // Load more when scrolled near bottom
    const threshold = 100; // pixels from bottom
    if (scrollHeight - scrollTop <= clientHeight + threshold && canLoadMore) {
      onLoadMore();
    }
  }

  return {
    handleClickOutside,
    scrollFocusedItemIntoView,
    handleScroll
  };
}