import type { Meta, StoryObj } from "@storybook/svelte";
import NotifyDemo from "./NotifyDemo.svelte";

const meta = {
  title: "Notify",
  component: NotifyDemo,
  argTypes: {
    placement: {
      control: { type: "select" },
      options: [
        "topRight",
        "topLeft",
        "bottomRight",
        "bottomLeft",
        "topCenter",
        "bottomCenter",
      ],
    },
    maxCount: { control: "number" },
  },
} satisfies Meta<typeof NotifyDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placement: "topRight",
    maxCount: 5,
  },
};

export const TopLeft: Story = {
  args: {
    placement: "topLeft",
    maxCount: 5,
  },
};

export const BottomRight: Story = {
  args: {
    placement: "bottomRight",
    maxCount: 5,
  },
};

export const TopCenter: Story = {
  args: {
    placement: "topCenter",
    maxCount: 5,
  },
};
