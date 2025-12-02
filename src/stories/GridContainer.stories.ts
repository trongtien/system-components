import type { Meta, StoryObj } from '@storybook/svelte';
import GridContainer from '../components/GridContainer.svelte';
import GridItem from '../components/GridItem.svelte';

const meta: Meta<GridContainer> = {
  title: 'Layout/GridContainer',
  component: GridContainer,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    Component: GridContainer,
    props: {
      columns: 12,
      gap: 16
    },
    slot: `
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
    `
  })
};

export const CustomColumns: Story = {
  render: () => ({
    Component: GridContainer,
    props: {
      columns: '200px 1fr 100px',
      gap: 20
    },
    slot: `
      <GridItem>Sidebar</GridItem>
      <GridItem>Main Content</GridItem>
      <GridItem>Aside</GridItem>
    `
  })
};

export const AutoFit: Story = {
  render: () => ({
    Component: GridContainer,
    props: {
      columns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: 16
    },
    slot: `
      <GridItem>Auto 1</GridItem>
      <GridItem>Auto 2</GridItem>
      <GridItem>Auto 3</GridItem>
      <GridItem>Auto 4</GridItem>
      <GridItem>Auto 5</GridItem>
    `
  })
};