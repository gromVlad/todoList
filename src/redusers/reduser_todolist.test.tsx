import { TodolistType } from "api/todolistApi";
import { TodoListTypeState, todoListSlice, todolistThunks } from "./reduser_todolist";


describe("todoListSlice reducer", () => {
  let initialState: TodoListTypeState[];

  beforeEach(() => {
    initialState = [];
  });

  test("should handle addTodoList", () => {
    const todoList: TodolistType = {
      id: "1",
      addedDate: "2022-01-01",
      order: 0,
      title: "Test TodoList",
    };

    const newState = todoListSlice.reducer(initialState, todolistThunks.addNewTodolistThunk.fulfilled({ todo: todoList }, 'requestId','1'));

    expect(newState).toEqual([{ ...todoList, filter: "all", entityStatus: false }]);
  });

  test("should handle removeTodoList", () => {
    const todoList: TodoListTypeState = {
      id: "1",
      addedDate: "2022-01-01",
      order: 0,
      title: "Test TodoList",
      filter: "all",
      entityStatus: false,
    };

    const state: TodoListTypeState[] = [todoList];

    const newState = todoListSlice.reducer(state, todolistThunks.deleteTodolistThunk.fulfilled({ idTodo: "1" }, 'requestId', "Test TodoList"));

    expect(newState).toEqual([]);
  });

  test("should handle changeTodoListTitle", () => {
    const todoList: TodoListTypeState = {
      id: "1",
      addedDate: "2022-01-01",
      order: 0,
      title: "Test TodoList",
      filter: "all",
      entityStatus: false,
    };

    const state: TodoListTypeState[] = [todoList];

    const newState = todoListSlice.reducer(
      state,
      todolistThunks.changeTitleTodolistThunk.fulfilled({ id: "1", title: "Updated Test TodoList" }, 'requestId', { todolistId: "1", title: "Test TodoList" })
    );

    expect(newState).toEqual([{ ...todoList, title: "Updated Test TodoList" }]);
  });

  test("should handle changeTodoListFilter", () => {
    const todoList: TodoListTypeState = {
      id: "1",
      addedDate: "2022-01-01",
      order: 0,
      title: "Test TodoList",
      filter: "all",
      entityStatus: false,
    };

    const state: TodoListTypeState[] = [todoList];

    const newState = todoListSlice.reducer(
      state,
      todoListSlice.actions.changeTodoListFilter({ id: "1", filter: "completed" })
    );

    expect(newState).toEqual([{ ...todoList, filter:"completed" }]);
  });

  test("should handle changeEntityStatusTodoTitle", () => {
    const todoList: TodoListTypeState = {
      id: "1",
      addedDate: "2022-01-01",
      order: 0,
      title: "Test TodoList",
      filter: "all",
      entityStatus: false,
    };

    const state: TodoListTypeState[] = [todoList];

    const newState = todoListSlice.reducer(
      state,
      todoListSlice.actions.changeEntityStatusTodoTitle({ id: "1", entityStatus: true })
    );

    expect(newState).toEqual([{ ...todoList, entityStatus: true }]);
  });

  test("should handle setTodoLists", () => {
    const todoLists: TodolistType[] = [
      {
        id: "1",
        addedDate: "2022-01-01",
        order: 0,
        title: "Test TodoList 1",
      },
      {
        id: "2",
        addedDate: "2022-02-01",
        order: 1,
        title: "Test TodoList 2",
      },
    ];

    const newState = todoListSlice.reducer(initialState, todolistThunks.fetchTodolistAddThunk.fulfilled({ todo: todoLists }, 'requestId'));

    expect(newState).toEqual([
      { ...todoLists[0], filter: "all", entityStatus: false },
      { ...todoLists[1], filter: "all", entityStatus: false },
    ]);
  });

  test("should handle reorderTodoLists when putAfterItemId is null", () => {
    const todoLists: TodoListTypeState[] = [
      {
        id: "1",
        addedDate: "2022-01-01",
        order: 0,
        title: "Test TodoList 1",
        filter: "all",
        entityStatus: false,
      },
      {
        id: "2",
        addedDate: "2022-02-01",
        order: 1,
        title: "Test TodoList 2",
        filter: "all",
        entityStatus: false,
      },
    ];

    const state: TodoListTypeState[] = [...todoLists];

    const newState = todoListSlice.reducer(
      state,
      todolistThunks.reorderTodolistTC.fulfilled({ todolistId: "2", putAfterItemId: null }, 'requestId', { todolistId: "2", putAfterItemId: null })
    );

    expect(newState).toEqual([
      { ...todoLists[1], filter: "all", entityStatus: false },
      { ...todoLists[0], filter: "all", entityStatus: false },
    ]);
  });

  test("should handle reorderTodoLists when putAfterItemId is not null", () => {
    const todoLists: TodoListTypeState[] = [
      {
        id: "1",
        addedDate: "2022-01-01",
        order: 0,
        title: "Test TodoList 1",
        filter: "all",
        entityStatus: false,
      },
      {
        id: "2",
        addedDate: "2022-02-01",
        order: 1,
        title: "Test TodoList 2",
        filter: "all",
        entityStatus: false,
      },
      {
        id: "3",
        addedDate: "2022-03-01",
        order: 2,
        title: "Test TodoList 3",
        filter: "all",
        entityStatus: false,
      },
    ];

    const state: TodoListTypeState[] = [...todoLists];

    const newState = todoListSlice.reducer(
      state,
      todolistThunks.reorderTodolistTC.fulfilled({ todolistId: "3", putAfterItemId: "1" }, 'requestId', { todolistId: "3", putAfterItemId: "1" })
    );

    expect(newState).toEqual([
      { ...todoLists[0], filter: "all", entityStatus: false },
      { ...todoLists[2], filter: "all", entityStatus: false },
      { ...todoLists[1], filter: "all", entityStatus: false },
    ]);
  });
});
