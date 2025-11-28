import Button from "./components/Button.svelte"
import Notify from "./components/Notify.svelte"

if (!customElements.get("system-button")) {
  customElements.define("system-button", Button as unknown as CustomElementConstructor);
}

if (!customElements.get("system-notify")) {
  customElements.define("system-notify", Notify as unknown as CustomElementConstructor);
}
