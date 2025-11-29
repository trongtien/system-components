import type { Meta, StoryObj } from '@storybook/svelte';
import Input from '../components/Input.svelte';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local', 'file']
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'filled', 'underlined']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    readonly: {
      control: { type: 'boolean' }
    },
    required: {
      control: { type: 'boolean' }
    },
    error: {
      control: { type: 'boolean' }
    },
    success: {
      control: { type: 'boolean' }
    },
    placeholder: {
      control: { type: 'text' }
    },
    label: {
      control: { type: 'text' }
    },
    helperText: {
      control: { type: 'text' }
    },
    errorMessage: {
      control: { type: 'text' }
    },
    successMessage: {
      control: { type: 'text' }
    },
    prefix: {
      control: { type: 'text' }
    },
    suffix: {
      control: { type: 'text' }
    }
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...'
  }
};

export const WithError: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    error: true
  }
};

export const WithSuccess: Story = {
  args: {
    placeholder: 'Enter username',
    success: true
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'This input is disabled',
    disabled: true
  }
};

export const Readonly: Story = {
  args: {
    value: 'This value cannot be changed',
    readonly: true
  }
};

export const WithPrefix: Story = {
  args: {
    type: 'url',
    placeholder: 'example.com',
    prefix: 'https://'
  }
};

export const WithSuffix: Story = {
  args: {
    type: 'number',
    placeholder: '0.00',
    suffix: 'USD'
  }
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    prefix: '🔍'
  }
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter your age',
    min: 0,
    max: 120
  }
};

export const FileInput: Story = {
  args: {
    type: 'file',
    accept: '.pdf,.doc,.docx'
  }
};

export const DateInput: Story = {
  args: {
    type: 'date'
  }
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter secure password'
  }
};

// Size variants
export const SmallSize: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small size input'
  }
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large size input'
  }
};

// Variant styles
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    placeholder: 'Outlined variant'
  }
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled variant'
  }
};

export const Underlined: Story = {
  args: {
    variant: 'underlined',
    placeholder: 'Underlined variant'
  }
};

