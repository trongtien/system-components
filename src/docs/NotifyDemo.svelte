<script lang="ts">
  import type { NotifyPlacement, NotifyItem, NotifyConfig } from "../types";

  interface Props {
    placement?: NotifyPlacement;
    maxCount?: number;
  }

  let { placement = "topRight", maxCount = 5 }: Props = $props();

  let items = $state<NotifyItem[]>([]);

  function show(config: NotifyConfig) {
    const id = crypto.randomUUID();
    const newItem: NotifyItem = {
      id,
      message: config.message,
      type: config.type || "info",
      description: config.description,
      duration: config.duration ?? 3000,
    };

    if (items.length >= maxCount) {
      items = items.slice(1);
    }

    items = [...items, newItem];

    if (newItem.duration > 0) {
      setTimeout(() => {
        close(id);
      }, newItem.duration);
    }

    return id;
  }

  function close(id: string) {
    items = items.filter((item) => item.id !== id);
  }

  function showInfo() {
    show({ message: "This is an info notification!", type: "info" });
  }

  function showSuccess() {
    show({ message: "Operation completed successfully!", type: "success" });
  }

  function showError() {
    show({ message: "Something went wrong!", type: "error" });
  }

  function showWarning() {
    show({ message: "Please be careful!", type: "warning" });
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

<div class="demo-wrapper">
  <div class="button-group">
    <button class="btn btn-info" onclick={showInfo}>Info</button>
    <button class="btn btn-success" onclick={showSuccess}>Success</button>
    <button class="btn btn-error" onclick={showError}>Error</button>
    <button class="btn btn-warning" onclick={showWarning}>Warning</button>
  </div>
  
  <div class="preview-box">
    <div class="preview-label">Preview Area - Placement: {placement}</div>
    
    <div class="notify-container {placement}">
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
  </div>
</div>

<style>
  .demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .button-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .btn:hover {
    opacity: 0.85;
  }

  .btn-info {
    background-color: #1677ff;
    color: white;
  }

  .btn-success {
    background-color: #52c41a;
    color: white;
  }

  .btn-error {
    background-color: #ff4d4f;
    color: white;
  }

  .btn-warning {
    background-color: #faad14;
    color: white;
  }

  .preview-box {
    position: relative;
    height: 350px;
    border: 2px dashed #d9d9d9;
    border-radius: 8px;
    background: linear-gradient(135deg, #f5f5f5 25%, transparent 25%),
                linear-gradient(225deg, #f5f5f5 25%, transparent 25%),
                linear-gradient(45deg, #f5f5f5 25%, transparent 25%),
                linear-gradient(315deg, #f5f5f5 25%, #fff 25%);
    background-size: 20px 20px;
    background-position: 0 0, 10px 0, 10px -10px, 0px 10px;
    overflow: hidden;
  }

  .preview-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #bfbfbf;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    pointer-events: none;
  }

  .notify-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 320px;
    width: calc(100% - 32px);
    z-index: 10;
  }

  /* Placement positions */
  .topRight {
    top: 16px;
    right: 16px;
  }

  .topLeft {
    top: 16px;
    left: 16px;
  }

  .bottomRight {
    bottom: 16px;
    right: 16px;
  }

  .bottomLeft {
    bottom: 16px;
    left: 16px;
  }

  .topCenter {
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .bottomCenter {
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .notify {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: #fff;
    padding: 12px 16px;
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
    font-size: 18px;
    line-height: 1;
    flex-shrink: 0;
  }

  .notify-content {
    flex: 1;
    min-width: 0;
  }

  .notify-message {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.88);
    line-height: 1.4;
    word-wrap: break-word;
  }

  .notify-description {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 4px;
    line-height: 1.4;
  }

  .notify-close {
    background: none;
    border: none;
    font-size: 16px;
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
  .topLeft .notify,
  .bottomLeft .notify {
    animation-name: slideInLeft;
  }

  .topCenter .notify,
  .bottomCenter .notify {
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
