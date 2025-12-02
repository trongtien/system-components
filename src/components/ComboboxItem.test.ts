import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import ComboboxItem from './ComboboxItem.svelte';
import type { ComboboxItem as ComboboxItemType } from '../types';

describe('ComboboxItem', () => {
  const mockItem: ComboboxItemType = {
    value: 'apple',
    label: 'Apple'
  };

  it('renders item label', () => {
    const { getByRole } = render(ComboboxItem, {
      props: {
        item: mockItem,
        index: 0,
        isSelected: false,
        isFocused: false,
        onSelect: () => {}
      }
    });

    const item = getByRole('option');
    expect(item).toHaveTextContent('Apple');
    expect(item).toHaveAttribute('data-index', '0');
  });

  it('shows selected state', () => {
    const { getByRole } = render(ComboboxItem, {
      props: {
        item: mockItem,
        index: 0,
        isSelected: true,
        isFocused: false,
        onSelect: () => {}
      }
    });

    const item = getByRole('option');
    expect(item).toHaveClass('combobox__item--selected');
    expect(item).toHaveAttribute('aria-selected', 'true');
    
    // Should show checkmark
    const checkmark = item.querySelector('svg');
    expect(checkmark).toBeInTheDocument();
  });

  it('shows focused state', () => {
    const { getByRole } = render(ComboboxItem, {
      props: {
        item: mockItem,
        index: 0,
        isSelected: false,
        isFocused: true,
        onSelect: () => {}
      }
    });

    const item = getByRole('option');
    expect(item).toHaveClass('combobox__item--focused');
  });

  it('shows disabled state', () => {
    const disabledItem: ComboboxItemType = {
      value: 'banana',
      label: 'Banana',
      disabled: true
    };

    const { getByRole } = render(ComboboxItem, {
      props: {
        item: disabledItem,
        index: 0,
        isSelected: false,
        isFocused: false,
        onSelect: () => {}
      }
    });

    const item = getByRole('option');
    expect(item).toHaveClass('combobox__item--disabled');
    expect(item).toBeDisabled();
  });

  it('calls onSelect when clicked', async () => {
    const onSelect = vi.fn();
    
    const { getByRole } = render(ComboboxItem, {
      props: {
        item: mockItem,
        index: 0,
        isSelected: false,
        isFocused: false,
        onSelect
      }
    });

    const item = getByRole('option');
    await fireEvent.click(item);

    expect(onSelect).toHaveBeenCalledWith(mockItem);
  });

  it('does not call onSelect when disabled item is clicked', async () => {
    const onSelect = vi.fn();
    const disabledItem: ComboboxItemType = {
      value: 'banana',
      label: 'Banana', 
      disabled: true
    };

    const { getByRole } = render(ComboboxItem, {
      props: {
        item: disabledItem,
        index: 0,
        isSelected: false,
        isFocused: false,
        onSelect
      }
    });

    const item = getByRole('option');
    await fireEvent.click(item);

    expect(onSelect).not.toHaveBeenCalled();
  });
});