import type { NotifyConfig, NotifyItem, NotifyPlacement, NotifyProps } from "../types";
import { toStyleString } from "../utils";

export class NotifyAmp {
    #maxCount: number = 5;
    #placement: NotifyPlacement = "topRight";
    #style: NotifyProps['style'];
    items = $state<NotifyItem[]>([]);

    constructor(props?: { maxCount?: number; placement?: NotifyPlacement; style?: NotifyProps['style'] }) {
        if (props?.maxCount !== undefined) {
            this.#maxCount = props.maxCount;
        }
        if (props?.placement !== undefined) {
            this.#placement = props.placement;
        }

        this.#style = props?.style;
    }

    // Update props method
    updateProps(props: { maxCount?: number; placement?: NotifyPlacement; style?: NotifyProps['style'] }): void {
        if (props.maxCount !== undefined) {
            this.#maxCount = props.maxCount;
        }
        if (props.placement !== undefined) {
            this.#placement = props.placement;
        }
        this.#style = props.style;
    }

    // Getters
    get computedStyle(): string {
        return toStyleString(this.#style) ?? "";
    }

    get placementClass(): string {
        const classes: Record<NotifyPlacement, string> = {
            topRight: "top-right",
            topLeft: "top-left",
            bottomRight: "bottom-right",
            bottomLeft: "bottom-left",
            topCenter: "top-center",
            bottomCenter: "bottom-center",
        };
        return classes[this.#placement] || "top-right";
    }

    get maxCount(): number {
        return this.#maxCount;
    }

    get placement(): NotifyPlacement {
        return this.#placement;
    }

    close(id: string) {
        this.items = this.items.filter((item) => item.id !== id);
    }

    closeAll() {
        this.items = [];
    }

    show(config: NotifyConfig) {
        const id = crypto.randomUUID();
        const newItem: NotifyItem = {
            id,
            message: config.message,
            type: config.type || "info",
            description: config.description,
            duration: config.duration ?? 3000,
        };

        // Limit max count
        if (this.items.length >= this.#maxCount) {
            this.items = this.items.slice(1);
        }

        this.items = [...this.items, newItem];

        // Auto remove after duration
        if (newItem.duration > 0) {
            setTimeout(() => {
                this.close(id);
            }, newItem.duration);
        }

        return id;
    }

    // Convenience methods for different notification types
    info(message: string, duration?: number): string {
        return this.show({ message, type: "info", duration });
    }

    success(message: string, duration?: number): string {
        return this.show({ message, type: "success", duration });
    }

    error(message: string, duration?: number): string {
        return this.show({ message, type: "error", duration });
    }

    warning(message: string, duration?: number): string {
        return this.show({ message, type: "warning", duration });
    }

    getIcon(type: string): string {
        const icons: Record<string, string> = {
            info: "ℹ️",
            success: "✅",
            error: "❌",
            warning: "⚠️",
        };
        return icons[type] || "ℹ️";
    }

    getContainerAttributes(): Record<string, any> {
        return {
            class: `notify-container ${this.placementClass}`,
            style: this.computedStyle
        };
    }

    getState(): Readonly<{
        maxCount: number;
        placement: NotifyPlacement;
        itemCount: number;
        computedStyle: string;
    }> {
        return {
            maxCount: this.#maxCount,
            placement: this.#placement,
            itemCount: this.items.length,
            computedStyle: this.computedStyle
        };
    }
}