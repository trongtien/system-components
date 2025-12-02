import type { Meta, StoryObj } from '@storybook/svelte';
import GridContainer from '../components/GridContainer.svelte';
import GridItem from '../components/GridItem.svelte';

const meta: Meta<GridItem> = {
  title: 'Layout/GridItem',
  component: GridItem,
  parameters: {
    layout: 'padded'
  },
  decorators: [
    (story) => ({
      Component: GridContainer,
      props: {
        columns: 4,
        rows: 3,
        gap: 16,
        style: 'height: 300px; border: 2px dashed #ccc;'
      },
      slot: story
    })
  ],
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    Component: GridItem,
    props: {},
    slot: 'Default Item'
  })
};

export const Spanning: Story = {
  render: () => ({
    Component: GridItem,
    props: {
      columnSpan: 2,
      rowSpan: 2
    },
    slot: 'Spans 2x2'
  })
};

export const Positioned: Story = {
  render: () => ({
    Component: GridItem,
    props: {
      columnStart: 2,
      columnEnd: 4,
      rowStart: 2,
      rowEnd: 3
    },
    slot: 'Positioned Item'
  })
};

export const Aligned: Story = {
  render: () => ({
    Component: GridItem,
    props: {
      justifySelf: 'center',
      alignSelf: 'center'
    },
    slot: 'Centered'
  })
};