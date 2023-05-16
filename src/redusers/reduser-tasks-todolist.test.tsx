import { TaskType, TodolistsType } from "../App";
import { userReducerTask } from "./reduser_tasks";
import { AddTodoTypeAC, userReducerTodolist } from "./reduser_todolist";

//проверка на одинаковый idTodo 
test("ids should be equals", () => {
  const startTasksState: TaskType = {};
  const startTodolistsState: TodolistsType[] = [];

  const action = AddTodoTypeAC("new todolist");

  const endTasksState = userReducerTask(startTasksState, action);
  const endTodolistsState = userReducerTodolist(startTodolistsState, action);

  //получили ключи и далее сравниваем чтобы ровнялись тому что было в action
  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.idTodo);
  expect(idFromTodolists).toBe(action.idTodo);
});
