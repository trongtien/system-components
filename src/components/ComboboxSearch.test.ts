import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import ComboboxSearch from './ComboboxSearch.svelte';

describe('ComboboxSearch', () => {
  it('renders search input', () => {
    const { getByPlaceholderText } = render(ComboboxSearch, {
      props: {
        searchQuery: '',
        onSearchInput: () => {},
        onKeydown: () => {}
      }
    });

    const input = getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('displays search query value', () => {
    const { getByDisplayValue } = render(ComboboxSearch, {
      props: {
        searchQuery: 'apple',
        onSearchInput: () => {},
        onKeydown: () => {}
      }
    });

    const input = getByDisplayValue('apple');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearchInput when typing', async () => {
    const onSearchInput = vi.fn();
    
    const { getByPlaceholderText } = render(ComboboxSearch, {
      props: {
        searchQuery: '',
        onSearchInput,
        onKeydown: () => {}
      }
    });

    const input = getByPlaceholderText('Search...');
    await fireEvent.input(input, { target: { value: 'app' } });

    expect(onSearchInput).toHaveBeenCalledWith('app');
  });

  it('calls onKeydown when key is pressed', async () => {
    const onKeydown = vi.fn();
    
    const { getByPlaceholderText } = render(ComboboxSearch, {
      props: {
        searchQuery: '',
        onSearchInput: () => {},
        onKeydown
      }
    });

    const input = getByPlaceholderText('Search...');
    await fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(onKeydown).toHaveBeenCalled();
    expect(onKeydown.mock.calls[0][0].key).toBe('ArrowDown');
  });
});