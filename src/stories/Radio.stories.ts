import type { Meta, StoryObj } from '@storybook/svelte';
import Radio from '../components/Radio.svelte';
import type { RadioProps } from '../types/radio.type';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Radio group name'
    },
    value: {
      control: 'text',
      description: 'Currently selected value'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable entire radio group'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant'
    },

    options: {
      control: 'object',
      description: 'Array of radio options with label, value, description, required, disabled'
    }
  },
} satisfies Meta<RadioProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Radio story
export const Primary: Story = {
  args: {
    name: 'example',
    value: 'option1',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ]
  },
};

// Checked Radio
export const Checked: Story = {
  args: {
    name: 'checked-example',
    value: 'selected',
    options: [
      { label: 'Not Selected', value: 'not-selected' },
      { label: 'Selected Option', value: 'selected' },
      { label: 'Another Option', value: 'another' }
    ]
  },
};

// With Description
export const WithDescription: Story = {
  args: {
    name: 'description-example',
    value: undefined,
    options: [
      { 
        label: 'Free Plan', 
        value: 'free',
        description: 'Basic features included' 
      },
      { 
        label: 'Pro Plan', 
        value: 'pro',
        description: 'Advanced features and priority support' 
      },
      { 
        label: 'Enterprise Plan', 
        value: 'enterprise',
        description: 'Full feature set with dedicated support' 
      }
    ]
  },
};

// Required Field
export const Required: Story = {
  args: {
    name: 'required-example',
    value: undefined,
    options: [
      { label: 'Optional Choice', value: 'optional' },
      { label: 'Required Choice', value: 'required', required: true },
      { label: 'Another Choice', value: 'another' }
    ]
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    name: 'disabled-example',
    value: undefined,
    options: [
      { label: 'Available Option', value: 'available' },
      { label: 'Disabled Option', value: 'disabled', disabled: true },
      { label: 'Another Available', value: 'another' }
    ]
  },
};

// Disabled Group
export const DisabledGroup: Story = {
  args: {
    name: 'disabled-group',
    value: 'selected',
    disabled: true,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Selected Option', value: 'selected' },
      { label: 'Option 3', value: 'option3' }
    ]
  },
};

// Size Variants
export const SmallSize: Story = {
  args: {
    name: 'size-sm',
    value: 'small',
    size: 'sm',
    options: [
      { label: 'Small Option 1', value: 'small' },
      { label: 'Small Option 2', value: 'small2' }
    ]
  },
};

export const MediumSize: Story = {
  args: {
    name: 'size-md',
    value: 'medium',
    size: 'md',
    options: [
      { label: 'Medium Option 1', value: 'medium' },
      { label: 'Medium Option 2', value: 'medium2' }
    ]
  },
};

export const LargeSize: Story = {
  args: {
    name: 'size-lg',
    value: 'large',
    size: 'lg',
    options: [
      { label: 'Large Option 1', value: 'large' },
      { label: 'Large Option 2', value: 'large2' }
    ]
  },
};



// Mixed Options Example
export const MixedOptions: Story = {
  args: {
    name: 'mixed',
    value: 'premium',
    options: [
      { 
        label: 'Basic Plan', 
        value: 'basic',
        description: 'Essential features only' 
      },
      { 
        label: 'Premium Plan', 
        value: 'premium',
        description: 'All features included',
        required: true 
      },
      { 
        label: 'Enterprise Plan', 
        value: 'enterprise',
        description: 'Coming soon...',
        disabled: true 
      }
    ]
  },
};

// Complex Example
export const Complex: Story = {
  args: {
    name: 'complex-example',
    value: 'pro',
    size: 'lg',
    options: [
      { 
        label: 'Free Tier', 
        value: 'free',
        description: 'Limited features, perfect for testing' 
      },
      { 
        label: 'Professional', 
        value: 'pro',
        description: 'Full feature access with priority support',
        required: true 
      },
      { 
        label: 'Enterprise', 
        value: 'enterprise',
        description: 'Custom solutions and dedicated account manager' 
      }
    ]
  },
};