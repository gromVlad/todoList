import { TaskType } from "../App";
import { addTackAC, changeTacIsDonekAC, changeTacTitlekAC, removeTackAC, userReducerTask } from "./reduser_tasks";
import { AddTodoTypeAC, RemoveTodolistAC } from "./reduser_todolist";

//delete task
test("correct task should be deleted from correct array", () => {
  const startState: TaskType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = removeTackAC("2", "todolistId2");

  const endState = userReducerTask(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  });
});

//add task
test("correct task should be added to correct array", () => {
  const startState: TaskType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = addTackAC("juce", "todolistId2");

  const endState = userReducerTask(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

//change task isDone
test("status of specified task should be changed", () => {
  const startState: TaskType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = changeTacIsDonekAC("2", false, "todolistId2");

  const endState = userReducerTask(startState, action);

  expect(endState["todolistId2"][1].isDone).toBe(false);
  expect(endState["todolistId2"].length).toBe(3);
});

//change task title
test("status of specified task should be changed", () => {
  const startState: TaskType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = changeTacTitlekAC("2", "hello", "todolistId2");

  const endState = userReducerTask(startState, action);

  expect(endState["todolistId2"][1].title).toBe("hello");
  expect(endState["todolistId2"].length).toBe(3);
});

//add task then create new Todo
test("new array should be added when new todolist is added", () => {
  const startState: TaskType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = AddTodoTypeAC("new todolist");

  const endState = userReducerTask(startState, action);

  //получили ключи все далее фильтуем чтобы найти нужный / или возврощаем ошибку
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

//add task then create new Todo
test("property with todolistId should be deleted", () => {
  const startState: TaskType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = RemoveTodolistAC("todolistId2");

  const endState = userReducerTask(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});