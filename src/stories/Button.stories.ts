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
      options: ['primary', 'secondary']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    permission: {
      control: { type: 'boolean' }
    },
    label: {
      control: { type: 'text' }
    }
  },
} satisfies Meta<Button>;

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