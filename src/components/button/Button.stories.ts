import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './Button.svelte';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    onclick: { action: 'clicked' },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Button',
  },
};
