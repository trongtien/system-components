import type { ComponentBaseProps } from "./base-props.type";
import type { Snippet } from "svelte";

export interface LabelProps extends ComponentBaseProps {
  // Label is a simple component that wraps content in a <label> element
  // Uses Svelte 5 children snippet instead of deprecated slot
  required?: boolean; // Show red asterisk (*) when true
  children?: Snippet | string; // Content to render inside the label - can be snippet or string
}