import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ComboboxTrigger from './ComboboxTrigger.svelte';

describe('ComboboxTrigger', () => {
  it('renders with placeholder', () => {
    const { getByRole } = render(ComboboxTrigger, {
      props: {
        isOpen: false,
        displayValue: '',
        placeholder: 'Select item',
        disabled: false,
        error: false,
        onToggle: () => {},
        onKeydown: () => {}
      }
    });

    const trigger = getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Select item');
  });

  it('shows display value when provided', () => {
    const { getByRole } = render(ComboboxTrigger, {
      props: {
        isOpen: false,
        displayValue: 'Apple',
        placeholder: 'Select item',
        disabled: false,
        error: false,
        onToggle: () => {},
        onKeydown: () => {}
      }
    });

    const trigger = getByRole('combobox');
    expect(trigger).toHaveTextContent('Apple');
  });

  it('applies disabled state correctly', () => {
    const { getByRole } = render(ComboboxTrigger, {
      props: {
        isOpen: false,
        displayValue: '',
        placeholder: 'Select item',
        disabled: true,
        error: false,
        onToggle: () => {},
        onKeydown: () => {}
      }
    });

    const trigger = getByRole('combobox');
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveClass('combobox__trigger--disabled');
  });

  it('applies error state correctly', () => {
    const { getByRole } = render(ComboboxTrigger, {
      props: {
        isOpen: false,
        displayValue: '',
        placeholder: 'Select item',
        disabled: false,
        error: true,
        onToggle: () => {},
        onKeydown: () => {}
      }
    });

    const trigger = getByRole('combobox');
    expect(trigger).toHaveClass('combobox__trigger--error');
  });

  it('applies open state correctly', () => {
    const { getByRole } = render(ComboboxTrigger, {
      props: {
        isOpen: true,
        displayValue: '',
        placeholder: 'Select item',
        disabled: false,
        error: false,
        onToggle: () => {},
        onKeydown: () => {}
      }
    });

    const trigger = getByRole('combobox');
    expect(trigger).toHaveClass('combobox__trigger--open');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});