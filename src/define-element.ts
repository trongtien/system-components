import Button from "./components/Button.svelte"
import Notify from "./components/Notify.svelte"
import Typography from "./components/Typography.svelte"
import Input from "./components/Input.svelte"

if (!customElements.get("system-button")) {
  customElements.define("system-button", Button as unknown as CustomElementConstructor);
}

if (!customElements.get("system-notify")) {
  customElements.define("system-notify", Notify as unknown as CustomElementConstructor);
}

if (!customElements.get("system-typography")) {
  customElements.define("system-typography", Typography as unknown as CustomElementConstructor);
}

if (!customElements.get("system-input")) {
  customElements.define("system-input", Input as unknown as CustomElementConstructor);
}
