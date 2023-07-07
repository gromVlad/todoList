import { createAction } from "@reduxjs/toolkit";
import { TodoListTypeState } from "./reduser_todolist";
import { TaskType } from "./reduser_tasks";

export type ActionsTodoandTaskClearType = {
  todoList: TodoListTypeState[]
  task: TaskType
}

export const actionsTodoandTaskClear = createAction<ActionsTodoandTaskClearType>('clear-all-state')