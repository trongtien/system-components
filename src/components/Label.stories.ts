import type { Meta, StoryObj } from '@storybook/svelte';
import Label from './Label.svelte';
import type { LabelProps } from '../types/label.type';

const meta = {
    title: 'Components/Label',
    component: Label,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        required: {
            control: 'boolean',
            description: 'Show red asterisk (*) to indicate required field'
        },
        children: {
            control: false,
            description: 'Content to display inside the label'
        }
    },
} satisfies Meta<LabelProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Label story
export const Primary: Story = {
    args: {
        children: 'Label Text'
    },
    render: (args) => ({
        Component: Label,
        props: args
    }),
};

// Form Label
export const FormLabel: Story = {
    args: {
        children: 'Email Address'
    },
    render: (args) => ({
        Component: Label,
        props: args
    }),
};

// Required Email Field
export const RequiredEmail: Story = {
    args: {
        required: true,
        children: 'Email Address'
    },
    render: (args) => ({
        Component: Label,
        props: args
    }),
};

// Required Field Label
export const RequiredField: Story = {
    args: {
        required: true,
        children: 'Password'
    },
    render: (args) => ({
        Component: Label,
        props: args
    }),
};

// Long Label Text
export const LongText: Story = {
    args: {
        children: 'This is a longer label text that might wrap to multiple lines depending on the container width and responsive design'
    },
    render: (args) => ({
        Component: Label,
        props: args
    }),
};

// Short Label
export const Short: Story = {
    args: {
        children: 'Name'
    },
    render: (args) => ({
        Component: Label,
        props: args
    }),
};

// Custom Styling Example
export const WithCustomStyling: Story = {
    args: {
        required: false,
        children: 'Styled Label'
    },
    render: (args) => ({
        Component: Label,
        props: {
            ...args,
            style: 'color: #2563eb; font-weight: 600; font-size: 14px;'
        }
    }),
};