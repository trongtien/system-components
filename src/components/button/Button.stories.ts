import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './Button.svelte';

const meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    style: { control: 'object' },
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

export const CustomStyle: Story = {
  args: {
    variant: 'primary',
    label: 'Custom Style Button',
    style: {
      backgroundColor: '#ff4d4f',
      borderRadius: '20px',
      padding: '12px 24px',
      fontSize: '16px',
    },
  },
};

export const CustomStyleString: Story = {
  args: {
    variant: 'secondary',
    label: 'Style as String',
    style: 'background-color: #52c41a; color: white; border-radius: 8px;',
  },
};
