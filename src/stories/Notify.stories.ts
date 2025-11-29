import type { Meta, StoryObj } from '@storybook/svelte';
import Notify from '../components/Notify.svelte';

const meta = {
  title: 'Components/Notify',
  component: Notify,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'topCenter', 'bottomCenter']
    },
    maxCount: {
      control: { type: 'number' }
    }
  },
} satisfies Meta<Notify>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placement: 'topRight',
    maxCount: 5
  },
};

export const TopLeft: Story = {
  args: {
    placement: 'topLeft',
    maxCount: 3
  },
};

export const BottomCenter: Story = {
  args: {
    placement: 'bottomCenter',
    maxCount: 5
  },
};