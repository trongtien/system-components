import { render, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import Combobox from './Combobox.svelte';
import type { ComboboxItem } from '../types';

const mockItems: ComboboxItem[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', disabled: true },
  { value: 'elderberry', label: 'Elderberry', group: 'Berries' },
  { value: 'fig', label: 'Fig' },
];

describe('Combobox', () => {
  it('renders with placeholder', () => {
    render(Combobox, { 
      props: { 
        items: mockItems, 
        placeholder: 'Select a fruit...' 
      } 
    });
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select a fruit...')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    render(Combobox, { props: { items: mockItems } });
    
    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    render(Combobox, { props: { items: mockItems } });
    
    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    // Click outside
    await fireEvent.click(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects item when clicked', async () => {
    const onValueChange = vi.fn();
    render(Combobox, { 
      props: { 
        items: mockItems, 
        onValueChange 
      } 
    });
    
    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    
    const appleOption = screen.getByText('Apple');
    await fireEvent.click(appleOption);
    
    expect(onValueChange).toHaveBeenCalledWith('apple');
  });

  it('shows selected value in trigger', async () => {
    render(Combobox, { 
      props: { 
        items: mockItems, 
        value: 'apple' 
      } 
    });
    
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('filters items when searching', async () => {
    render(Combobox, { 
      props: { 
        items: mockItems, 
        searchable: true 
      } 
    });
    
    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    await fireEvent.input(searchInput, { target: { value: 'app' } });
    
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });

  it('shows empty message when no items match', async () => {
    render(Combobox, { 
      props: { 
        items: mockItems, 
        searchable: true,
        emptyMessage: 'No fruits found'
      } 
    });
    
    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    await fireEvent.input(searchInput, { target: { value: 'xyz' } });
    
    expect(screen.getByText('No fruits found')).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    render(Combobox, { props: { items: mockItems } });
    
    const trigger = screen.getByRole('combobox');
    
    // Open with Enter
    await fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    // Navigate with Arrow Down
    await fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    await fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    
    // Close with Escape
    await fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('disables interaction when disabled prop is true', async () => {
    render(Combobox, { 
      props: { 
        items: mockItems, 
        disabled: true 
      } 
    });
    
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
    
    await fireEvent.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('does not select disabled items', async () => {
    const onValueChange = vi.fn();
    render(Combobox, { 
      props: { 
        items: mockItems, 
        onValueChange 
      } 
    });
    
    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    
    const dateOption = screen.getByText('Date');
    await fireEvent.click(dateOption);
    
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('groups items correctly', async () => {
    render(Combobox, { props: { items: mockItems } });
    
    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    
    expect(screen.getByText('Berries')).toBeInTheDocument();
    expect(screen.getByText('Elderberry')).toBeInTheDocument();
  });

  it('calls onOpenChange callback', async () => {
    const onOpenChange = vi.fn();
    render(Combobox, { 
      props: { 
        items: mockItems, 
        onOpenChange 
      } 
    });
    
    const trigger = screen.getByRole('combobox');
    await fireEvent.click(trigger);
    
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});