import { computePosition, autoUpdate, offset, flip, shift, size, type Placement, type Middleware } from '@floating-ui/dom';

export interface UseFloatingUIOptions {
  /**
   * Position of the floating element relative to the reference element
   */
  placement?: Placement;

  /**
   * Offset distance between reference and floating elements
   */
  offsetDistance?: number;

  /**
   * Padding from viewport edges when shifting
   */
  shiftPadding?: number;

  /**
   * Maximum height for the floating element
   */
  maxHeight?: string;

  /**
   * Whether to enable flip behavior when there's not enough space
   */
  flip?: boolean;

  /**
   * Whether to enable shift behavior to keep element in viewport
   */
  shift?: boolean;

  /**
   * Whether to enable size adjustment based on available space
   */
  autoSize?: boolean;

  /**
   * Custom middleware to add to the positioning
   */
  middleware?: Middleware[];

  /**
   * Callback when position is computed
   */
  onPositionUpdate?: (x: number, y: number) => void;
}

export interface UseFloatingUIReturn {
  /**
   * Setup floating UI positioning between reference and floating elements
   */
  setup: (referenceElement: Element, floatingElement: HTMLElement) => void;

  /**
   * Cleanup floating UI listeners and positioning
   */
  cleanup: () => void;

  /**
   * Manually update position
   */
  update: () => void;
}

/**
 * Custom hook for managing Floating UI positioning
 * Provides automatic positioning, collision detection, and size adjustment
 */
export function useFloatingUI(options: UseFloatingUIOptions = {}): UseFloatingUIReturn {
  const {
    placement = 'bottom-start',
    offsetDistance = 4,
    shiftPadding = 8,
    maxHeight = '200px',
    flip: enableFlip = true,
    shift: enableShift = true,
    autoSize = true,
    middleware: customMiddleware = [],
    onPositionUpdate,
  } = options;

  let cleanupFn: (() => void) | null = null;
  let referenceEl: Element | null = null;
  let floatingEl: HTMLElement | null = null;

  /**
   * Build middleware stack based on options
   */
  function buildMiddleware(): Middleware[] {
    const middlewareStack: Middleware[] = [
      offset(offsetDistance),
    ];

    if (enableFlip) {
      middlewareStack.push(flip());
    }

    if (enableShift) {
      middlewareStack.push(shift({ padding: shiftPadding }));
    }

    if (autoSize) {
      middlewareStack.push(
        size({
          apply({ availableHeight, elements }) {
            if (floatingEl) {
              const maxHeightValue = parseInt(maxHeight);
              const computedMaxHeight = Math.min(availableHeight - shiftPadding, maxHeightValue);
              floatingEl.style.maxHeight = `${computedMaxHeight}px`;
            }
          },
        })
      );
    }

    // Add custom middleware
    middlewareStack.push(...customMiddleware);

    return middlewareStack;
  }

  /**
   * Update position of floating element
   */
  async function updatePosition() {
    if (!referenceEl || !floatingEl) return;

    try {
      const { x, y } = await computePosition(referenceEl, floatingEl, {
        placement,
        middleware: buildMiddleware(),
      });

      floatingEl.style.left = `${x}px`;
      floatingEl.style.top = `${y}px`;

      onPositionUpdate?.(x, y);
    } catch (error) {
      console.warn('Failed to update floating position:', error);
    }
  }

  /**
   * Setup auto-updating positioning
   */
  function setup(referenceElement: Element, floatingElement: HTMLElement) {
    // Clean up previous setup
    cleanup();

    referenceEl = referenceElement;
    floatingEl = floatingElement;

    // Ensure floating element has absolute positioning
    floatingElement.style.position = 'absolute';

    // Setup auto-update with cleanup
    cleanupFn = autoUpdate(referenceElement, floatingElement, updatePosition);

    // Initial position update
    updatePosition();
  }

  /**
   * Cleanup listeners and references
   */
  function cleanup() {
    if (cleanupFn) {
      cleanupFn();
      cleanupFn = null;
    }
    referenceEl = null;
    floatingEl = null;
  }

  return {
    setup,
    cleanup,
    update: updatePosition,
  };
}