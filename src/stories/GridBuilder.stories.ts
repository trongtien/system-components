import type { Meta, StoryObj } from '@storybook/svelte';
import GridBuilder from '../components/GridBuilder.svelte';

const meta: Meta<GridBuilder> = {
  title: 'Layout/GridBuilder',
  component: GridBuilder,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    Component: GridBuilder,
    props: {
      initialColumns: 12,
      initialRows: 6,
      showGrid: true,
      showGuidelines: true
    }
  })
};

export const SimpleLayout: Story = {
  render: () => ({
    Component: GridBuilder,
    props: {
      initialColumns: 6,
      initialRows: 4,
      showGrid: true,
      showGuidelines: false
    }
  })
};

export const ComplexLayout: Story = {
  render: () => ({
    Component: GridBuilder,
    props: {
      initialColumns: 16,
      initialRows: 8,
      showGrid: true,
      showGuidelines: true
    }
  })
};

export const WithoutGrid: Story = {
  render: () => ({
    Component: GridBuilder,
    props: {
      initialColumns: 8,
      initialRows: 6,
      showGrid: false,
      showGuidelines: false
    }
  })
};