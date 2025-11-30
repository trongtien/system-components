<script lang="ts">
  import type { RadioProps, RadioOption } from '../types';
  import { toStyleString } from '../utils';

  interface Props extends RadioProps {}

  let {
    name = '',
    value,
    disabled = false,
    size = 'md',
    className = '',
    style,
    onchange,
    oninput,
    options = [],
  }: Props = $props();

  // Derived reactive values
  let radioGroupClass = $derived(`radio-group radio-group--${size} ${className ?? ''}`);
  let computedStyle = $derived(toStyleString(style));

  function handleChange(optionValue: string | number | boolean, e: Event) {
    if (disabled) return;
    onchange?.(optionValue, e);
  }

  function handleInput(optionValue: string | number | boolean, e: Event) {
    if (disabled) return;
    oninput?.(optionValue, e);
  }

  function isChecked(optionValue: string | number | boolean): boolean {
    return value === optionValue;
  }
</script>

<div class={radioGroupClass} {...{ style: computedStyle }}>
  {#each options as option (option.value)}
    <label class="radio__wrapper">
      <input
        type="radio"
        class="radio__input"
        {name}
        value={option.value}
        checked={isChecked(option.value)}
        disabled={disabled || option.disabled}
        onchange={(e) => handleChange(option.value, e)}
        oninput={(e) => handleInput(option.value, e)}
      />
      <span class="radio__indicator"></span>

      <div class="radio__content {isChecked(option.value) ? 'radio__content--checked' : ''}">
        {#if isChecked(option.value) && option.description}
          <span class="radio__description">{option.description}</span>
        {/if}

        <span class="radio__label">
          {option.label}
          {#if option.required}
            <span class="radio__required">*</span>
          {/if}
        </span>

        {#if !isChecked(option.value) && option.description}
          <span class="radio__description">{option.description}</span>
        {/if}
      </div>
    </label>
  {/each}
</div>

<style lang="scss">
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .radio {
    &__wrapper {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      gap: 0.75rem;

      &:has(.radio__input:disabled) {
        cursor: not-allowed;
        opacity: 0.6;
      }

      &:has(.radio__input:checked) {
        align-items: flex-start;
      }
    }

    &__input {
      position: absolute;
      opacity: 0;
      pointer-events: none;

      &:checked + .radio__indicator {
        border-color: var(--primary, #3b82f6);
        background-color: var(--primary, #3b82f6);

        &::after {
          opacity: 1;
          transform: scale(1);
        }
      }

      &:focus + .radio__indicator {
        outline: none;
        border: 2px solid var(--primary, #3b82f6);
      }

      &:active + .radio__indicator {
        outline: none;
        border: 2px solid var(--primary, #3b82f6);
      }

      &:disabled + .radio__indicator {
        background-color: var(--muted, #f3f4f6);
        border-color: var(--border, #d1d5db);
      }
    }

    &__indicator {
      width: 0.875rem;
      height: 0.875rem;
      border: 2px solid var(--border, #d1d5db);
      border-radius: 50%;
      background-color: var(--background, #ffffff);
      position: relative;
      flex-shrink: 0;
      transition: all 0.2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.125rem;

      &::after {
        content: '';
        width: 0;
        height: 0;
        background-color: transparent;
        border-radius: 50%;
        transform: scale(0);
        opacity: 0;
        transition: all 0.2s ease-in-out;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
      flex: 1;
      align-items: flex-start;

      &--checked {
        align-items: flex-start;
      }
    }

    &__label {
      font-weight: 500;
      font-size: 0.875rem;
      color: var(--foreground, #000);
      line-height: 1.25rem;
      margin: 0;
      display: flex;
      align-items: center;
    }


    &__description {
      font-size: 0.75rem;
      color: var(--muted-foreground, #6b7280);
      line-height: 1rem;
    }

    &__required {
      color: #dc2626;
      margin-left: 0.25rem;
      font-weight: 700;
    }

      // Size variants
      &--sm {
        .radio__indicator {
          width: 0.625rem;
          height: 0.625rem;
  
          &::after {
            width: 0;
            height: 0;
          }
        }
  
        .radio__label,
        .radio__children {
          font-size: 0.75rem;
        }
      }
  
      &--lg {
        .radio__indicator {
          width: 1rem;
          height: 1rem;
  
          &::after {
            width: 0;
            height: 0;
          }
        }
  
        .radio__label,
        .radio__children {
          font-size: 1rem;
        }
      }
    }
</style>
