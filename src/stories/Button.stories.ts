import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '../components/Button.svelte';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    permission: {
      control: { type: 'boolean' }
    },
    label: {
      control: { type: 'text' }
    },
    icon: {
      control: { type: 'text' }
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right']
    }
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button'
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button'
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Destructive Button'
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline Button'
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button'
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    label: 'Disabled Button'
  },
};

export const NoPermission: Story = {
  args: {
    variant: 'primary',
    permission: false,
    label: 'No Permission'
  },
};

export const WithIconLeft: Story = {
  args: {
    variant: 'primary',
    label: 'Save',
    icon: '💾',
    iconPosition: 'left'
  },
};

export const WithIconRight: Story = {
  args: {
    variant: 'primary',
    label: 'Next',
    icon: '→',
    iconPosition: 'right'
  },
};

export const IconSecondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Download',
    icon: '⬇️',
    iconPosition: 'left'
  },
};

export const IconDestructive: Story = {
  args: {
    variant: 'destructive',
    label: 'Delete',
    icon: '🗑️',
    iconPosition: 'left'
  },
};

export const IconOutline: Story = {
  args: {
    variant: 'outline',
    label: 'Edit',
    icon: '✏️',
    iconPosition: 'left'
  },
};

export const IconGhost: Story = {
  args: {
    variant: 'ghost',
    label: 'Settings',
    icon: '⚙️',
    iconPosition: 'left'
  },
};