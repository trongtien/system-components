<script lang="ts">
  import type { CSSProperties } from "../../types";
  import { toStyleString } from "../../utils";
  interface Props {
    label?: string;
    variant?: "primary" | "secondary";
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    style?: string | CSSProperties;
  }

  let {
    label = "Button",
    variant = "primary",
    disabled = false,
    onclick,
    style,
  }: Props = $props();

  function handleClick(e: MouseEvent) {
    if (disabled) return;
    onclick?.(e);
  }

  let computedStyle = $derived(toStyleString(style));
</script>

<button
  class={variant}
  {disabled}
  {...{ onclick: handleClick, style: computedStyle }}
>
  <slot>{label}</slot>
</button>

<style>
  :host {
    display: inline-block;
  }

  button {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }

  button.primary {
    background-color: var(--button-primary, #4f46e5);
    color: white;
  }

  button.secondary {
    background-color: var(--button-secondary, #e5e7eb);
    color: black;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
