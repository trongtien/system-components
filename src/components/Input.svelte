<script lang="ts">
  import type { InputProps } from "../types";
  import { toStyleString } from "../utils";
  import type { Snippet } from "svelte";

  interface Props extends InputProps {
    prefixSlot?: Snippet;
    suffixSlot?: Snippet;
  }

  let {
    type = "text",
    variant = "default",
    size = "md",
    placeholder,
    value = $bindable(),
    defaultValue,
    disabled = false,
    readonly = false,
    required = false,
    autofocus = false,
    autocomplete,
    name,
    id,
    label,
    helperText,
    error = false,
    errorMessage,
    success = false,
    successMessage,
    prefix,
    suffix,
    maxlength,
    minlength,
    pattern,
    min,
    max,
    step,
    multiple = false,
    accept,
    style,
    oninput,
    onchange,
    onfocus,
    onblur,
    onkeydown,
    onkeyup,
    prefixSlot,
    suffixSlot,
  }: Props = $props();

  // Generate unique id if not provided
  const inputId = $derived(id || `input-${Math.random().toString(36).substr(2, 9)}`);
  
  // Build class strings
  let inputClass = $derived(() => {
    const classes = ["input", `input--${variant}`, `input--${size}`];
    
    if (error) {
      classes.push("input--error");
    } else if (success) {
      classes.push("input--success");
    }
    
    if (disabled) {
      classes.push("input--disabled");
    }
    
    if (readonly) {
      classes.push("input--readonly");
    }
    
    return classes.join(" ");
  });

  let wrapperClass = $derived(() => {
    const classes = ["input-wrapper"];
    
    if (prefix || prefixSlot) {
      classes.push("input-wrapper--has-prefix");
    }
    
    if (suffix || suffixSlot) {
      classes.push("input-wrapper--has-suffix");
    }
    
    return classes.join(" ");
  });

  // Convert style to string
  let computedStyle = $derived(toStyleString(style));

  // Handle input events
  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    if (disabled || readonly) return;
    value = event.currentTarget.value;
    oninput?.(event);
  }

  function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
    if (disabled || readonly) return;
    onchange?.(event);
  }

  function handleFocus(event: FocusEvent & { currentTarget: HTMLInputElement }) {
    if (disabled) return;
    onfocus?.(event);
  }

  function handleBlur(event: FocusEvent & { currentTarget: HTMLInputElement }) {
    if (disabled) return;
    onblur?.(event);
  }

  function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
    if (disabled || readonly) return;
    onkeydown?.(event);
  }

  function handleKeyup(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
    if (disabled || readonly) return;
    onkeyup?.(event);
  }
</script>

<div class="input-field" style={computedStyle}>
  <div class={wrapperClass()}>
    {#if prefix || prefixSlot}
      <div class="input-prefix">
        {#if prefixSlot}
          {@render prefixSlot()}
        {:else if prefix}
          {prefix}
        {/if}
      </div>
    {/if}
    
    <!-- svelte-ignore a11y_autofocus -->
    <input
      {type}
      {placeholder}
      {value}
      {defaultValue}
      {disabled}
      {readonly}
      {required}
      {autofocus}
      autocomplete={autocomplete as any}
      {name}
      id={inputId}
      {maxlength}
      {minlength}
      {pattern}
      {min}
      {max}
      {step}
      {multiple}
      {accept}
      class={inputClass()}
      oninput={handleInput}
      onchange={handleChange}
      onfocus={handleFocus}
      onblur={handleBlur}
      onkeydown={handleKeydown}
      onkeyup={handleKeyup}
    />
    
    {#if suffix || suffixSlot}
      <div class="input-suffix">
        {#if suffixSlot}
          {@render suffixSlot()}
        {:else if suffix}
          {suffix}
        {/if}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .input-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-family: var(--font-family);
  }

  .input-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--foreground);
    margin-bottom: 0.25rem;

    &__required {
      color: var(--destructive);
      margin-left: 0.125rem;
    }
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    &--has-prefix .input {
      padding-left: 3.5rem;
    }

    &--has-suffix .input {
      padding-right: 3.5rem;
    }
  }

  .input {
    width: 100%;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background-color: var(--background);
    color: var(--foreground);
    font-size: 0.875rem;
    transition: all 0.2s ease-in-out;
    outline: none;

    &:focus {
      border-color: var(--ring);
      box-shadow: 0 0 0 2px var(--ring);
    }

    &::placeholder {
      color: var(--muted-foreground);
    }

    // Sizes
    &--sm {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
    }

    &--md {
      padding: 0.625rem 0.875rem;
      font-size: 0.875rem;
    }

    &--lg {
      padding: 0.75rem 1rem;
      font-size: 1rem;
    }

    // Variants
    &--default {
      background-color: var(--background);
      border: 1px solid var(--border);
    }

    &--outlined {
      background-color: transparent;
      border: 2px solid var(--border);
    }

    &--filled {
      background-color: var(--muted);
      border: 1px solid transparent;

      &:focus {
        background-color: var(--background);
        border-color: var(--ring);
      }
    }

    &--underlined {
      background-color: transparent;
      border: none;
      border-bottom: 2px solid var(--border);
      border-radius: 0;

      &:focus {
        border-bottom-color: var(--ring);
        box-shadow: none;
      }
    }

    // States
    &--error {
      border-color: var(--destructive);

      &:focus {
        border-color: var(--destructive);
        box-shadow: 0 0 0 2px oklch(from var(--destructive) l c h / 0.2);
      }
    }

    &--success {
      border-color: var(--success, #22c55e);

      &:focus {
        border-color: var(--success, #22c55e);
        box-shadow: 0 0 0 2px oklch(from var(--success, #22c55e) l c h / 0.2);
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: var(--muted);

      &:focus {
        border-color: var(--border);
        box-shadow: none;
      }
    }

    &--readonly {
      background-color: var(--muted);
      cursor: default;
    }
  }

  .input-prefix,
  .input-suffix {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 100%;
    color: var(--muted-foreground);
    font-size: 0.875rem;
    pointer-events: none;
    z-index: 2;
  }

  .input-prefix {
    left: 0.75rem;
  }

  .input-suffix {
    right: 0.75rem;
  }

  .input-helper {
    font-size: 0.75rem;
    line-height: 1.4;

    &__error {
      color: var(--destructive);
    }

    &__success {
      color: var(--success, #22c55e);
    }

    &__text {
      color: var(--muted-foreground);
    }
  }

  // File input styling
  .input[type="file"] {
    padding: 0.5rem;
    
    &::file-selector-button {
      border: none;
      background-color: var(--muted);
      color: var(--foreground);
      padding: 0.375rem 0.75rem;
      border-radius: calc(var(--radius) - 2px);
      font-size: 0.75rem;
      margin-right: 0.75rem;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: var(--accent);
      }
    }
  }
</style>