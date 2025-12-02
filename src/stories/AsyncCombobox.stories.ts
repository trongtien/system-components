import type { Meta, StoryObj } from '@storybook/svelte';
import AsyncCombobox from '../components/AsyncCombobox.svelte';
import type { AsyncComboboxConfig } from '../types/async-combobox.type';
import type { ComboboxProps } from '../types/combobox.type';

// Mock API service for demo
const mockApiService = {
  async getData(page: number, limit: number, search: string = '') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
    
    const allItems = [
      'Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry', 
      'Cherry', 'Coconut', 'Cranberry', 'Date', 'Elderberry', 'Fig', 
      'Grape', 'Grapefruit', 'Guava', 'Kiwi', 'Lemon', 'Lime', 'Mango', 
      'Melon', 'Orange', 'Papaya', 'Peach', 'Pear', 'Pineapple', 'Plum', 
      'Pomegranate', 'Raspberry', 'Strawberry', 'Tangerine', 'Watermelon'
    ].map((name, index) => ({
      id: index + 1,
      name,
      category: name.startsWith('A') || name.startsWith('B') ? 'Early Alphabet' : 
                name.startsWith('C') || name.startsWith('D') ? 'Mid Alphabet' : 'Late Alphabet'
    }));

    let filteredItems = allItems;
    if (search) {
      filteredItems = allItems.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const pageItems = filteredItems.slice(startIndex, endIndex);
    
    return {
      data: pageItems,
      hasMore: endIndex < filteredItems.length,
      total: filteredItems.length
    };
  }
};

// Mock fetch function
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = input.toString();
  const urlObj = new URL(url);
  const page = parseInt(urlObj.searchParams.get('page') || '1');
  const limit = parseInt(urlObj.searchParams.get('limit') || '20');
  const search = urlObj.searchParams.get('search') || '';
  
  const data = await mockApiService.getData(page, limit, search);
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

interface AsyncComboboxProps extends Omit<ComboboxProps, 'items'>, AsyncComboboxConfig {
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: string) => void;
}

const meta: Meta<AsyncComboboxProps> = {
  title: 'Components/AsyncCombobox',
  component: AsyncCombobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An async combobox component with infinite scroll, search API, and caching. Supports local and remote search modes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AsyncComboboxProps>;

export const LocalSearch: Story = {
  args: {
    apiUrl: 'https://api.example.com/fruits',
    placeholder: 'Search fruits (local)...',
    searchMode: 'local',
    limit: 10,
    loadingText: 'Loading fruits...',
    emptyMessage: 'No fruits found',
  },
};

export const ApiSearch: Story = {
  args: {
    apiUrl: 'https://api.example.com/fruits',
    searchApiUrl: 'https://api.example.com/fruits/search',
    placeholder: 'Search fruits (API)...',
    searchMode: 'api',
    limit: 8,
    searchDebounceMs: 500,
    minSearchLength: 2,
    loadingText: 'Loading fruits...',
    emptyMessage: 'No fruits found',
  },
};

export const InfiniteScroll: Story = {
  args: {
    apiUrl: 'https://api.example.com/fruits',
    placeholder: 'Scroll to load more...',
    searchMode: 'local',
    limit: 5, // Small limit to demo infinite scroll
    loadingText: 'Loading fruits...',
    noMoreDataText: 'All fruits loaded!',
  },
};

export const CustomTransform: Story = {
  args: {
    apiUrl: 'https://api.example.com/fruits',
    placeholder: 'Custom data transform...',
    searchMode: 'local',
    limit: 10,
    transformResponse: (response: any) => ({
      items: response.data || [],
      hasMore: response.hasMore || false,
      total: response.total
    }),
    transformItem: (item: any) => ({
      value: item.id.toString(),
      label: `🍎 ${item.name}`,
      group: item.category,
      data: item
    }),
  },
};

export const WithError: Story = {
  args: {
    apiUrl: 'https://api.example.com/error', // This will fail
    placeholder: 'Error handling demo...',
    searchMode: 'local',
    errorText: 'Oops! Something went wrong.',
  },
};

export const Cached: Story = {
  args: {
    apiUrl: 'https://api.example.com/fruits',
    placeholder: 'Cached responses...',
    searchMode: 'api',
    enableCache: true,
    cacheKey: 'fruits-cache',
    cacheTtl: 30000, // 30 seconds
    limit: 10,
  },
};

export const Disabled: Story = {
  args: {
    apiUrl: 'https://api.example.com/fruits',
    placeholder: 'Disabled combobox...',
    disabled: true,
    searchMode: 'local',
  },
};

export const Interactive: Story = {
  render: () => ({
    Component: AsyncCombobox,
    props: {
      apiUrl: 'https://api.example.com/fruits',
      placeholder: 'Interactive async combobox...',
      searchMode: 'api',
      limit: 8,
      onValueChange: (value: string | undefined) => {
        console.log('Selected value:', value);
      },
      onLoadStart: () => {
        console.log('Loading started...');
      },
      onLoadEnd: () => {
        console.log('Loading finished.');
      },
      onError: (error: string) => {
        console.error('Error occurred:', error);
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
        story: 'Check the browser console to see all event callbacks in action.',
      },
    },
  },
};

// Cleanup after stories
export const cleanup = () => {
  globalThis.fetch = originalFetch;
};