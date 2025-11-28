import type { CSSProperties } from "./base-props.type";

export type NotifyType = "info" | "success" | "error" | "warning";

export type NotifyPlacement = "topRight" | "topLeft" | "bottomRight" | "bottomLeft" | "topCenter" | "bottomCenter";

export interface NotifyItem {
  id: string;
  message: string;
  type: NotifyType;
  description?: string;
  duration: number;
}

export interface NotifyConfig {
  message: string;
  type?: NotifyType;
  description?: string;
  duration?: number;
}

export interface NotifyProps {
  placement?: NotifyPlacement;
  maxCount?: number;
  style?: string | CSSProperties;
}
