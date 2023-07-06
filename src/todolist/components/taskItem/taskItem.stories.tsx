import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TaskItem } from "./taskItem";

const meta: Meta<typeof TaskItem> = {
  title: "TODOLISTS/Task",
  component: TaskItem,
  tags: ["autodocs"],
  args: {
    changeChekBox: action("Status changed inside Task"),
    changeTaskTitle: action("Title changed inside Task"),
    removetask: action("Remove Button clicked changed inside Task"),
    element: { id: "12wsdewfijdei", title: "JS", isDone: false },
    id: "fgdosrg8rgjuh",
  },
};

export default meta;
type Story = StoryObj<typeof TaskItem>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
  args: {
    element: { id: "12wsdewfijdei2343", title: "CSS", isDone: true },
  },
};
