import type { Meta, StoryObj } from '@storybook/svelte';
import Typography from '../components/Typography.svelte';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label', 'small', 'strong', 'em', 'code', 'blockquote']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']
    },
    weight: {
      control: { type: 'select' },
      options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify']
    },
    color: {
      control: { type: 'color' }
    },
    truncate: {
      control: { type: 'boolean' }
    },
    noWrap: {
      control: { type: 'boolean' }
    }
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create stories with children
const createStory = (childrenText: string, defaultArgs: any = {}): Story => ({
  render: (args) => {
    // Remove children from args to prevent override
    const { children, ...restArgs } = args;
    return {
      Component: Typography,
      props: {
        ...defaultArgs,
        ...restArgs,
        children: childrenText
      } as any
    };
  },
  args: defaultArgs
});

export const Heading1: Story = createStory('Heading 1', { variant: 'h1' });
export const Heading2: Story = createStory('Heading 2', { variant: 'h2' });
export const Heading3: Story = createStory('Heading 3', { variant: 'h3' });
export const Paragraph: Story = createStory('This is a paragraph of text. It demonstrates the default paragraph styling with proper spacing and readability.', { variant: 'p' });
export const Span: Story = createStory('Inline span text', { variant: 'span' });
export const Label: Story = createStory('Form Label', { variant: 'label' });
export const Small: Story = createStory('Small text', { variant: 'small' });
export const Strong: Story = createStory('Bold/Strong text', { variant: 'strong' });
export const Emphasized: Story = createStory('Italic/Emphasized text', { variant: 'em' });
export const Code: Story = createStory('const code = "example";', { variant: 'code' });
export const Blockquote: Story = createStory('This is a blockquote. It represents a quotation from another source.', { variant: 'blockquote' });
export const CustomSize: Story = createStory('Large paragraph text (2xl)', { variant: 'p', size: '2xl' });
export const CustomWeight: Story = createStory('Bold paragraph text', { variant: 'p', weight: 'bold' });
export const Centered: Story = createStory('Centered text alignment', { variant: 'p', align: 'center' });
export const CustomColor: Story = createStory('Text with custom color', { variant: 'p', color: '#3b82f6' });

export const Truncated: Story = {
  render: (args) => {
    const { children, ...restArgs } = args;
    return {
      Component: Typography,
      props: {
        ...restArgs,
        children: 'This is a very long text that will be truncated with ellipsis when it exceeds the container width.',
        style: { maxWidth: '200px' }
      } as any
    };
  },
  args: {
    variant: 'p',
    truncate: true
  },
  parameters: {
    layout: 'padded',
  }
};

export const CustomElement: Story = createStory('H1 variant rendered as div element', { variant: 'h1', as: 'div' });
