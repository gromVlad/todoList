import { TaskType } from "../App";
import { TaskPriorities } from "../api/todolistApi";
import { TaskStatusType } from "../api/todolistApi";
import { addTackAC, changeTacIsDonekAC, changeTacTitlekAC, removeTackAC, userReducerTask } from "./reduser_tasks";
import { AddTodoTypeAC, RemoveTodolistAC, todolistID1, todolistID2 } from "./reduser_todolist";


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
      {
        description: "",
        id: "2",
        title: "JS",
        status: TaskStatusType.Completed,
        priority: TaskPriorities.Urgently,
        startDate: "",
        deadline: "",
        todoListId: todolistID1,
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        id: "3",
        title: "React",
        status: TaskStatusType.New,
        priority: TaskPriorities.Middle,
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
        id: "1",
        title: "bread",
        status: TaskStatusType.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: todolistID2,
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        id: "2",
        title: "milk",
        status: TaskStatusType.Completed,
        priority: TaskPriorities.Urgently,
        startDate: "",
        deadline: "",
        todoListId: todolistID2,
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        id: "3",
        title: "tea",
        status: TaskStatusType.New,
        priority: TaskPriorities.Middle,
        startDate: "",
        deadline: "",
        todoListId: todolistID2,
        order: 0,
        addedDate: "",
      },
    ],
  };
})

//delete task
test("correct task should be deleted from correct array", () => {
  const action = removeTackAC("2", "todolistId2");

  const endState = userReducerTask(startState, action);

  expect(endState).toEqual({
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
      {
        description: "",
        id: "2",
        title: "JS",
        status: TaskStatusType.Completed,
        priority: TaskPriorities.Urgently,
        startDate: "",
        deadline: "",
        todoListId: todolistID1,
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        id: "3",
        title: "React",
        status: TaskStatusType.New,
        priority: TaskPriorities.Middle,
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
        id: "1",
        title: "bread",
        status: TaskStatusType.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: todolistID2,
        order: 0,
        addedDate: "",
      },
      {
        description: "",
        id: "3",
        title: "tea",
        status: TaskStatusType.New,
        priority: TaskPriorities.Middle,
        startDate: "",
        deadline: "",
        todoListId: todolistID2,
        order: 0,
        addedDate: "",
      },
    ],
  })
});

//add task
test("correct task should be added to correct array", () => {
    const action = addTackAC("juce", "todolistId2");

  const endState = userReducerTask(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(TaskStatusType.New);
});

//change task isDone
test("status of specified task should be changed", () => {
  
  const action = changeTacIsDonekAC("2", TaskStatusType.New, "todolistId2");

  const endState = userReducerTask(startState, action);

  expect(endState["todolistId2"][1].status).toBe(TaskStatusType.New);
  expect(endState["todolistId2"].length).toBe(3);
});

//change task title
test("status of specified task should be changed", () => {
   const action = changeTacTitlekAC("2", "hello", "todolistId2");

  const endState = userReducerTask(startState, action);

  expect(endState["todolistId2"][1].title).toBe("hello");
  expect(endState["todolistId2"].length).toBe(3);
});

//add task then create new Todo
test("new array should be added when new todolist is added", () => {
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
   const action = RemoveTodolistAC("todolistId2");

  const endState = userReducerTask(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});