import { useFloatingUI } from './useFloatingUI';

interface FloatingUIManagerConfig {
  placement?: string;
  maxHeight?: string;
}

/**
 * Hook quản lý Floating UI cho combobox
 */
export function useComboboxFloatingUI(config: FloatingUIManagerConfig = {}) {
  const floatingUI = useFloatingUI({
    placement: config.placement as any,
    offsetDistance: 4,
    shiftPadding: 8,
    maxHeight: config.maxHeight,
  });

  function setupFloatingUI(
    triggerElement: HTMLButtonElement | undefined,
    dropdownElement: HTMLDivElement | undefined
  ) {
    if (!triggerElement || !dropdownElement) return;
    floatingUI.setup(triggerElement, dropdownElement);
  }

  function cleanupFloatingUI() {
    floatingUI.cleanup();
  }

  return {
    setupFloatingUI,
    cleanupFloatingUI,
    cleanup: cleanupFloatingUI
  };
}