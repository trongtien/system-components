<script lang="ts">
  import type { NotifyItem, NotifyConfig, NotifyPlacement, NotifyProps } from "../types";
  import { toStyleString } from "../utils";

  interface Props extends NotifyProps {}

  let {
    placement = "topRight",
    maxCount = 5,
    style,
  }: Props = $props();

  let items = $state<NotifyItem[]>([]);

  // Expose methods for external use
  export function show(config: NotifyConfig) {
    const id = crypto.randomUUID();
    const newItem: NotifyItem = {
      id,
      message: config.message,
      type: config.type || "info",
      description: config.description,
      duration: config.duration ?? 3000,
    };

    // Limit max count
    if (items.length >= maxCount) {
      items = items.slice(1);
    }

    items = [...items, newItem];

    // Auto remove after duration
    if (newItem.duration > 0) {
      setTimeout(() => {
        close(id);
      }, newItem.duration);
    }

    return id;
  }

  export function info(message: string, duration?: number) {
    return show({ message, type: "info", duration });
  }

  export function success(message: string, duration?: number) {
    return show({ message, type: "success", duration });
  }

  export function error(message: string, duration?: number) {
    return show({ message, type: "error", duration });
  }

  export function warning(message: string, duration?: number) {
    return show({ message, type: "warning", duration });
  }

  export function close(id: string) {
    items = items.filter((item) => item.id !== id);
  }

  export function closeAll() {
    items = [];
  }

  let computedStyle = $derived(toStyleString(style));

  function getPlacementClass(placement: NotifyPlacement): string {
    const classes: Record<NotifyPlacement, string> = {
      topRight: "top-right",
      topLeft: "top-left",
      bottomRight: "bottom-right",
      bottomLeft: "bottom-left",
      topCenter: "top-center",
      bottomCenter: "bottom-center",
    };
    return classes[placement] || "top-right";
  }

  function getIcon(type: string): string {
    const icons: Record<string, string> = {
      info: "ℹ️",
      success: "✅",
      error: "❌",
      warning: "⚠️",
    };
    return icons[type] || "ℹ️";
  }
</script>

<div
  class="notify-container {getPlacementClass(placement)}"
  style={computedStyle}
>
  {#each items as item (item.id)}
    <div class="notify notify-{item.type}">
      <span class="notify-icon">{getIcon(item.type)}</span>
      <div class="notify-content">
        <div class="notify-message">{item.message}</div>
        {#if item.description}
          <div class="notify-description">{item.description}</div>
        {/if}
      </div>
      <button class="notify-close" onclick={() => close(item.id)}>×</button>
    </div>
  {/each}
</div>

<style>
  :host {
    display: block;
  }

  .notify-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 99999;
    pointer-events: none;
    max-width: 384px;
    width: 100%;
  }

  /* Placement positions */
  .top-right {
    top: 24px;
    right: 24px;
  }

  .top-left {
    top: 24px;
    left: 24px;
  }

  .bottom-right {
    bottom: 24px;
    right: 24px;
  }

  .bottom-left {
    bottom: 24px;
    left: 24px;
  }

  .top-center {
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
  }

  .bottom-center {
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
  }

  .notify {
    pointer-events: auto;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: #fff;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    animation: slideIn 0.3s ease-out forwards;
    border-left: 4px solid;
  }

  .notify-info {
    border-left-color: #1677ff;
  }

  .notify-success {
    border-left-color: #52c41a;
  }

  .notify-error {
    border-left-color: #ff4d4f;
  }

  .notify-warning {
    border-left-color: #faad14;
  }

  .notify-icon {
    font-size: 20px;
    line-height: 1;
    flex-shrink: 0;
  }

  .notify-content {
    flex: 1;
    min-width: 0;
  }

  .notify-message {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.5;
    word-wrap: break-word;
  }

  .notify-description {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 4px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .notify-close {
    background: none;
    border: none;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    padding: 0;
    line-height: 1;
    flex-shrink: 0;
    transition: color 0.2s;
  }

  .notify-close:hover {
    color: rgba(0, 0, 0, 0.88);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Animation for different placements */
  .top-left .notify,
  .bottom-left .notify {
    animation-name: slideInLeft;
  }

  .top-center .notify,
  .bottom-center .notify {
    animation-name: slideInCenter;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInCenter {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
