import { AddTodoTypeAC, ChangeEntityStatusTodoTitleAC, ChangeTodoFilterAC, ChangeTodoTitleAC, RemoveTodolistAC, TodolistsTypes, setTodolistsAC, userReducerTodolist } from "./reduser_todolist";

describe("userReducerTodolist reducer", () => {
  let state: TodolistsTypes[] = [];

  beforeEach(() => {
    state = [
      {
        id: "1",
        addedDate: "2022-01-01",
        order: 0,
        title: "Todo 1",
        filter: "all",
        entityStatus: false,
      },
      {
        id: "2",
        addedDate: "2022-01-01",
        order: 1,
        title: "Todo 2",
        filter: "all",
        entityStatus: false,
      },
    ];
  });

  it("should handle REMOVE-TODOLIST", () => {
    const action = RemoveTodolistAC("1");
    const newState = userReducerTodolist(state, action);
    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe("2");
  });

  it("should handle ADD-TODOLIST", () => {
    const newTodo = {
      id: "3",
      addedDate: "2022-01-01",
      order: 2,
      title: "Todo 3",
    };
    const action = AddTodoTypeAC(newTodo);
    const newState = userReducerTodolist(state, action);
    expect(newState.length).toBe(3);
    expect(newState[0].id).toBe("3");
    expect(newState[0].title).toBe("Todo 3");
  });

  it("should handle CHANGE-TODOLIST-TITLE", () => {
    const action = ChangeTodoTitleAC("1", "New Title");
    const newState = userReducerTodolist(state, action);
    expect(newState[0].title).toBe("New Title");
  });

  it("should handle CHANGE-TODOLIST-FILTER", () => {
    const action = ChangeTodoFilterAC("1", "completed");
    const newState = userReducerTodolist(state, action);
    expect(newState[0].filter).toBe("completed");
  });

  it("should handle SET-TODOLISTS", () => {
    const newTodolists = [
      { id: "3", addedDate: "2022-01-01", order: 2, title: "Todo 3" },
      { id: "4", addedDate: "2022-01-01", order: 3, title: "Todo 4" },
    ];
    const action = setTodolistsAC(newTodolists);
    const newState = userReducerTodolist(state, action);
    expect(newState.length).toBe(2);
    expect(newState[0].id).toBe("3");
    expect(newState[0].title).toBe("Todo 3");
    expect(newState[1].id).toBe("4");
    expect(newState[1].title).toBe("Todo 4");
  });

  test("should change entityStatus of a todolist", () => {
    const action = ChangeEntityStatusTodoTitleAC("2", true);

    const newState = userReducerTodolist(state, action);

    expect(newState[1].entityStatus).toBeTruthy();
  });

  test("should not change entityStatus of other todolists", () => {
    const action = ChangeEntityStatusTodoTitleAC("2", true);

    const newState = userReducerTodolist(state, action);

    expect(newState[0].entityStatus).toBeFalsy();
  });


});

