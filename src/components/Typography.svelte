<svelte:options customElement={{ tag: "typography-component", shadow: "none" }} />

<script lang="ts">
  import type { TypographyProps, TypographyVariant } from "../types";
  import { toStyleString } from "../utils";
  import type { Snippet } from "svelte";

  interface Props extends TypographyProps {
    children?: Snippet | string;
  }

  let {
    variant = "p",
    size,
    weight,
    align,
    color,
    as,
    truncate = false,
    noWrap = false,
    style,
    children,
  }: Props = $props();

  // Map variant to default HTML element if 'as' is not provided
  const variantToElement: Record<TypographyVariant, string> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
    span: "span",
    label: "label",
    small: "small",
    strong: "strong",
    em: "em",
    code: "code",
    blockquote: "blockquote",
  };

  const element = $derived(as || variantToElement[variant as TypographyVariant] || "p");
  
  // Build class string
  let typographyClass = $derived(() => {
    const classes = ["typography", `typography--${variant}`];
    
    if (size) {
      classes.push(`typography--size-${size}`);
    }
    
    if (weight) {
      classes.push(`typography--weight-${weight}`);
    }
    
    if (align) {
      classes.push(`typography--align-${align}`);
    }
    
    if (truncate) {
      classes.push("typography--truncate");
    }
    
    if (noWrap) {
      classes.push("typography--nowrap");
    }
    
    return classes.join(" ");
  });

  // Build inline styles object
  let inlineStyles = $derived(() => {
    const styles: Record<string, string> = {};
    
    if (color) {
      styles.color = color;
    }
    
    return styles;
  });

  // Combine style prop with inline styles and convert to string
  let finalStyle = $derived(() => {
    const inlineStylesObj = inlineStyles();
    const hasInlineStyles = Object.keys(inlineStylesObj).length > 0;
    
    // If we have both style prop and inline styles, merge them
    if (style && hasInlineStyles) {
      // If style is an object, merge with inline styles
      if (typeof style === 'object') {
        const mergedStyle = { ...style, ...inlineStylesObj };
        return toStyleString(mergedStyle);
      }
      // If style is a string, append inline styles
      if (typeof style === 'string') {
        const inlineStyleStr = toStyleString(inlineStylesObj);
        return inlineStyleStr ? `${style}; ${inlineStyleStr}` : style;
      }
    }
    
    // If only style prop exists, use toStyleString
    if (style) {
      return toStyleString(style);
    }
    
    // If only inline styles exist, use toStyleString
    if (hasInlineStyles) {
      return toStyleString(inlineStylesObj);
    }
    
    return undefined;
  });

</script>

<svelte:element this={element} class={typographyClass()} style={finalStyle()}>
  {#if children !== undefined && children !== null}
    {#if typeof children === 'function'}
      {@render children()}
    {:else if typeof children === 'string'}
      {children}
    {:else}
      {children}
    {/if}
  {/if}
</svelte:element>

<style lang="scss">
  .typography {
    margin: 0;
    font-family: var(--font-family, inherit);
    line-height: 1.5;
    color: var(--foreground, currentColor);

    // Variants
    &--h1 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }

    &--h2 {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.3;
      margin-bottom: 0.5rem;
    }

    &--h3 {
      font-size: 1.75rem;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 0.5rem;
    }

    &--h4 {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 0.5rem;
    }

    &--h5 {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.5;
      margin-bottom: 0.5rem;
    }

    &--h6 {
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.5;
      margin-bottom: 0.5rem;
    }

    &--p {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }

    &--span {
      font-size: inherit;
      font-weight: inherit;
    }

    &--label {
      font-size: 0.875rem;
      font-weight: 500;
      display: block;
      margin-bottom: 0.5rem;
    }

    &--small {
      font-size: 0.875rem;
      font-weight: 400;
    }

    &--strong {
      font-weight: 700;
    }

    &--em {
      font-style: italic;
    }

    &--code {
      font-family: 'Courier New', monospace;
      font-size: 0.875em;
      background-color: var(--muted, rgba(0, 0, 0, 0.1));
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
    }

    &--blockquote {
      font-size: 1.125rem;
      font-style: italic;
      border-left: 4px solid var(--border, #e5e7eb);
      padding-left: 1rem;
      margin: 1rem 0;
      color: var(--muted-foreground, #6b7280);
    }

    // Sizes
    &--size-xs {
      font-size: 0.75rem;
    }

    &--size-sm {
      font-size: 0.875rem;
    }

    &--size-base {
      font-size: 1rem;
    }

    &--size-lg {
      font-size: 1.125rem;
    }

    &--size-xl {
      font-size: 1.25rem;
    }

    &--size-2xl {
      font-size: 1.5rem;
    }

    &--size-3xl {
      font-size: 1.875rem;
    }

    &--size-4xl {
      font-size: 2.25rem;
    }

    &--size-5xl {
      font-size: 3rem;
    }

    &--size-6xl {
      font-size: 3.75rem;
    }

    // Weights
    &--weight-thin {
      font-weight: 100;
    }

    &--weight-light {
      font-weight: 300;
    }

    &--weight-normal {
      font-weight: 400;
    }

    &--weight-medium {
      font-weight: 500;
    }

    &--weight-semibold {
      font-weight: 600;
    }

    &--weight-bold {
      font-weight: 700;
    }

    &--weight-extrabold {
      font-weight: 800;
    }

    &--weight-black {
      font-weight: 900;
    }

    // Alignment
    &--align-left {
      text-align: left;
    }

    &--align-center {
      text-align: center;
    }

    &--align-right {
      text-align: right;
    }

    &--align-justify {
      text-align: justify;
    }

    // Utilities
    &--truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &--nowrap {
      white-space: nowrap;
    }
  }
</style>

