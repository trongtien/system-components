declare module "*.svelte" {
  import type { SvelteComponent } from "svelte";
  
  export default class extends SvelteComponent<any, any, any> {}
}

// Specific component declarations
declare module "../components/Button.svelte" {
  import type { SvelteComponent } from "svelte";
  import type { ButtonProps } from "../types";
  
  export default class Button extends SvelteComponent<ButtonProps> {}
}

declare module "../components/Notify.svelte" {
  import type { SvelteComponent } from "svelte";
  import type { NotifyProps } from "../types";
  
  export default class Notify extends SvelteComponent<NotifyProps> {
    show(config: any): string;
    info(message: string, duration?: number): string;
    success(message: string, duration?: number): string;
    error(message: string, duration?: number): string;
    warning(message: string, duration?: number): string;
    close(id: string): void;
    closeAll(): void;
  }
}