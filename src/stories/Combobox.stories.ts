import type { Meta, StoryObj } from '@storybook/svelte';
import Combobox from '../components/Combobox.svelte';
import type { ComboboxItem, ComboboxProps } from '../types';

const fruits: ComboboxItem[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana' },
  { value: 'blackberry', label: 'Blackberry', group: 'Berries' },
  { value: 'blueberry', label: 'Blueberry', group: 'Berries' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'coconut', label: 'Coconut', disabled: true },
  { value: 'cranberry', label: 'Cranberry', group: 'Berries' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry', group: 'Berries' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon', group: 'Citrus' },
  { value: 'lime', label: 'Lime', group: 'Citrus' },
  { value: 'mango', label: 'Mango' },
  { value: 'orange', label: 'Orange', group: 'Citrus' },
  { value: 'papaya', label: 'Papaya' },
  { value: 'peach', label: 'Peach' },
  { value: 'pear', label: 'Pear' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'plum', label: 'Plum' },
  { value: 'raspberry', label: 'Raspberry', group: 'Berries' },
  { value: 'strawberry', label: 'Strawberry', group: 'Berries' },
  { value: 'watermelon', label: 'Watermelon' },
];

const countries: ComboboxItem[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'cn', label: 'China' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'ar', label: 'Argentina' },
];

const meta: Meta<ComboboxProps> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A searchable combobox component built with Floating UI. Supports keyboard navigation, grouping, and custom filtering.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ComboboxProps>;

export const Default: Story = {
  args: {
    items: fruits.slice(0, 8),
    placeholder: 'Select a fruit...',
    searchable: true,
    closeOnSelect: true,
    emptyMessage: 'No items found.',
    maxHeight: '200px',
    placement: 'bottom-start',
  },
};

export const WithValue: Story = {
  args: {
    items: fruits.slice(0, 8),
    placeholder: 'Select a fruit...',
    value: 'apple',
  },
};

export const Disabled: Story = {
  args: {
    items: fruits.slice(0, 8),
    disabled: true,
    value: 'banana',
  },
};

export const ErrorState: Story = {
  args: {
    items: fruits.slice(0, 8),
    error: true,
    placeholder: 'Please select a valid fruit...',
  },
};

export const NotSearchable: Story = {
  args: {
    items: fruits.slice(0, 8),
    searchable: false,
    placeholder: 'Choose from the list...',
  },
};

export const WithGroups: Story = {
  args: {
    items: fruits,
    placeholder: 'Select any fruit...',
  },
};

export const LargeList: Story = {
  args: {
    items: countries,
    placeholder: 'Select a country...',
    maxHeight: '300px',
  },
};

export const CustomEmpty: Story = {
  args: {
    items: [],
    placeholder: 'No options available...',
    emptyMessage: 'Sorry, no options are available at this time.',
  },
};

export const NoCloseOnSelect: Story = {
  args: {
    items: fruits.slice(0, 8),
    closeOnSelect: false,
    placeholder: 'Multiple selection mode...',
  },
};

export const TopPlacement: Story = {
  args: {
    items: fruits.slice(0, 8),
    placement: 'top',
    placeholder: 'Dropdown opens upward...',
  },
  parameters: {
    layout: 'padded',
  },
};

export const CustomFilter: Story = {
  args: {
    items: fruits,
    placeholder: 'Custom filter (starts with)...',
    filterFunction: (items: ComboboxItem[], query: string) => {
      return items.filter((item: ComboboxItem) => 
        item.label.toLowerCase().startsWith(query.toLowerCase())
      );
    },
  },
};

export const Interactive: Story = {
  render: () => ({
    Component: Combobox,
    props: {
      items: fruits,
      placeholder: 'Interactive example...',
      onValueChange: (value: string | undefined) => {
        console.log('Value changed:', value);
      },
      onOpenChange: (open: boolean) => {
        console.log('Dropdown state:', open ? 'opened' : 'closed');
      },
      onSearchChange: (search: string) => {
        console.log('Search query:', search);
      },
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Check the browser console to see event callbacks in action.',
      },
    },
  },
};