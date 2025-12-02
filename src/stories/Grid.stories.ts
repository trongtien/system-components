import type { Meta, StoryObj } from '@storybook/svelte';
import GridContainer from '../components/GridContainer.svelte';
import GridItem from '../components/GridItem.svelte';

const meta: Meta<GridContainer> = {
  title: 'Layout/Grid System',
  component: GridContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible CSS Grid system with container and item components.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicGrid: Story = {
  name: 'Basic Grid',
  render: () => ({
    Component: GridContainer,
    props: {
      columns: 3,
      gap: 16
    },
    slot: `
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
      <GridItem>Item 5</GridItem>
      <GridItem>Item 6</GridItem>
    `
  })
};

export const ResponsiveGrid: Story = {
  name: 'Responsive Grid',
  render: () => ({
    Component: GridContainer,
    props: {
      columns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 20
    },
    slot: `
      <GridItem>Responsive Item 1</GridItem>
      <GridItem>Responsive Item 2</GridItem>
      <GridItem>Responsive Item 3</GridItem>
      <GridItem>Responsive Item 4</GridItem>
    `
  })
};