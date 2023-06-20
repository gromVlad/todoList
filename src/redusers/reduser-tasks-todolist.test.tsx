import { TaskType, userReducerTask } from "./reduser_tasks";
import {
  AddTodoTypeAC,
  TodolistsTypes,
  userReducerTodolist,
} from "./reduser_todolist";

// Check if ids are equal
test("ids should be equals", () => {
  const startTasksState: TaskType = {};
  const startTodolistsState: TodolistsTypes[] = [];

  const action = AddTodoTypeAC({
    id: "new todolist",
    title: "new todolist",
    addedDate: "",
    order: 0,
  }); // Pass a TodolistType object

  const endTasksState = userReducerTask(startTasksState, action);
  const endTodolistsState = userReducerTodolist(startTodolistsState, action);

  // Get the keys and compare them with the idTodo from action
  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todoNew.id);
  expect(idFromTodolists).toBe(action.todoNew.id);
});
