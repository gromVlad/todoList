import { TaskType } from "../App";
import { TaskPriorities } from "../api/todolistApi";
import { TaskStatusType } from "../api/todolistApi";
import {
  addTackAC,
  changeTacIsDonekAC,
  changeTacTitlekAC,
  removeTackAC,
  userReducerTask,
} from "./reduser_tasks";
import {
  AddTodoTypeAC,
  RemoveTodolistAC,
  todolistID1,
  todolistID2,
} from "./reduser_todolist";

let startState: TaskType;

beforeEach(() => {
  startState = {
    [todolistID1]: [
      {
        description: "",
        id: "1",
        title: "CSS",
        status: TaskStatusType.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: todolistID1,
        order: 0,
        addedDate: "",
      },
    ],
    [todolistID2]: [
      {
        description: "",
        id: "2",
        title: "JS",
        status: TaskStatusType.Completed,
        priority: TaskPriorities.Urgently,
        startDate: "",
        deadline: "",
        todoListId: todolistID2,
        order: 0,
        addedDate: "",
      },
    ],
  };
});

test("task should be removed", () => {
  const action = removeTackAC("2", todolistID2);

  const endState = userReducerTask(startState, action);

  expect(endState[todolistID1].length).toBe(1);
  expect(endState[todolistID2].length).toBe(0);
});

test("task should be added", () => {
  const action = addTackAC("React", todolistID1);

  const endState = userReducerTask(startState, action);

  expect(endState[todolistID1][1].title).toBe("CSS");
  expect(endState[todolistID1].length).toBe(2);
});

test("status should be changed", () => {
  const action = changeTacIsDonekAC("2", TaskStatusType.New, todolistID2);

  const endState = userReducerTask(startState, action);

  expect(endState[todolistID2][0].status).toBe(TaskStatusType.New);
});

test("title should be changed", () => {
  const action = changeTacTitlekAC("2", "New title", todolistID2);

  const endState = userReducerTask(startState, action);

  expect(endState[todolistID2][0].title).toBe("New title");
});

test("new todolist should be added", () => {
  const action = AddTodoTypeAC("new todolist");

  const endState = userReducerTask(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todolistID1 && k !== todolistID2);

  if (newKey) {
    expect(Array.isArray(endState[newKey])).toBeTruthy();
  } else {
    fail("newKey should be defined");
  }
});

test("todolist should be removed", () => {
  const action = RemoveTodolistAC(todolistID1);

  const endState = userReducerTask(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistID1]).toBeUndefined();
});
