import Button from "./Button.svelte";

// Chỉ define nếu chưa tồn tại
if (!customElements.get("system-button")) {
  customElements.define("system-button", Button as unknown as CustomElementConstructor);
}
