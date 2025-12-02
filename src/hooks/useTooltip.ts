import { useFloatingUI, type UseFloatingUIOptions } from './useFloatingUI';

export interface UseTooltipOptions extends Omit<UseFloatingUIOptions, 'autoSize' | 'flip' | 'shift'> {
  /**
   * Delay before showing tooltip (ms)
   */
  showDelay?: number;

  /**
   * Delay before hiding tooltip (ms)
   */
  hideDelay?: number;

  /**
   * Whether tooltip should be disabled
   */
  disabled?: boolean;
}

export interface UseTooltipReturn {
  /**
   * Setup tooltip for a reference element
   */
  setup: (referenceElement: Element, tooltipElement: HTMLElement) => void;

  /**
   * Show the tooltip
   */
  show: () => void;

  /**
   * Hide the tooltip
   */
  hide: () => void;

  /**
   * Toggle tooltip visibility
   */
  toggle: () => void;

  /**
   * Cleanup tooltip
   */
  cleanup: () => void;
}

/**
 * Custom hook for tooltip functionality using Floating UI
 * Provides hover/focus behavior with configurable delays
 */
export function useTooltip(options: UseTooltipOptions = {}): UseTooltipReturn {
  const {
    showDelay = 500,
    hideDelay = 0,
    disabled = false,
    placement = 'top',
    offsetDistance = 8,
    ...floatingOptions
  } = options;

  let isVisible = false;
  let showTimeout: number | null = null;
  let hideTimeout: number | null = null;
  let referenceEl: Element | null = null;
  let tooltipEl: HTMLElement | null = null;

  // Create floating UI instance
  const floatingUI = useFloatingUI({
    ...floatingOptions,
    placement,
    offsetDistance,
    autoSize: false, // Tooltips usually don't need auto-sizing
    flip: true,
    shift: true,
  });

  function clearTimeouts() {
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  }

  function show() {
    if (disabled || !tooltipEl) return;

    clearTimeouts();
    
    if (showDelay > 0) {
      showTimeout = setTimeout(() => {
        isVisible = true;
        tooltipEl!.style.visibility = 'visible';
        tooltipEl!.style.opacity = '1';
      }, showDelay);
    } else {
      isVisible = true;
      tooltipEl.style.visibility = 'visible';
      tooltipEl.style.opacity = '1';
    }
  }

  function hide() {
    if (!tooltipEl) return;

    clearTimeouts();

    if (hideDelay > 0) {
      hideTimeout = setTimeout(() => {
        isVisible = false;
        tooltipEl!.style.visibility = 'hidden';
        tooltipEl!.style.opacity = '0';
      }, hideDelay);
    } else {
      isVisible = false;
      tooltipEl.style.visibility = 'hidden';
      tooltipEl.style.opacity = '0';
    }
  }

  function toggle() {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }

  function setup(referenceElement: Element, tooltipElement: HTMLElement) {
    referenceEl = referenceElement;
    tooltipEl = tooltipElement;

    // Setup floating UI
    floatingUI.setup(referenceElement, tooltipElement);

    // Initial styles
    tooltipElement.style.visibility = 'hidden';
    tooltipElement.style.opacity = '0';
    tooltipElement.style.transition = 'opacity 0.2s ease-in-out';
    tooltipElement.style.pointerEvents = 'none';
    tooltipElement.style.zIndex = '9999';

    // Event listeners
    referenceElement.addEventListener('mouseenter', show);
    referenceElement.addEventListener('mouseleave', hide);
    referenceElement.addEventListener('focus', show);
    referenceElement.addEventListener('blur', hide);
  }

  function cleanup() {
    clearTimeouts();
    floatingUI.cleanup();

    if (referenceEl) {
      referenceEl.removeEventListener('mouseenter', show);
      referenceEl.removeEventListener('mouseleave', hide);
      referenceEl.removeEventListener('focus', show);
      referenceEl.removeEventListener('blur', hide);
    }

    referenceEl = null;
    tooltipEl = null;
    isVisible = false;
  }

  return {
    setup,
    show,
    hide,
    toggle,
    cleanup,
  };
}