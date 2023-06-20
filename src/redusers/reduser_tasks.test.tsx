import { addTackAC, changeTackAC, removeTackAC, setTackAC, userReducerTask } from "./reduser_tasks";

describe("userReducerTask reducer", () => {
  let state = {};

  beforeEach(() => {
    state = {
      "1": [
        {
          id: "1",
          todoListId: "1",
          title: "Task 1",
          description: "Description for task 1",
          status: 0,
          priority: 0,
          startDate: "2022-01-01",
          deadline: "2022-01-10",
          order: 0,
          addedDate: "2022-01-01",
        },
        {
          id: "2",
          todoListId: "1",
          title: "Task 2",
          description: "Description for task 2",
          status: 1,
          priority: 1,
          startDate: "2022-01-01",
          deadline: "2022-01-10",
          order: 1,
          addedDate: "2022-01-01",
        },
      ],
      "2": [
        {
          id: "3",
          todoListId: "2",
          title: "Task 3",
          description: "Description for task 3",
          status: 0,
          priority: 1,
          startDate: "2022-01-01",
          deadline: "2022-01-10",
          order: 0,
          addedDate: "2022-01-01",
        },
      ],
    };
  });

  it("should handle REMOVE_TASK", () => {
    const action = removeTackAC("1", "1");
    const newState = userReducerTask(state, action);
    expect(newState["1"].length).toBe(1);
    expect(newState["1"][0].id).toBe("2");
  });

  it("should handle ADD_TASK", () => {
    const newTask = {
      id: "4",
      todoListId: "1",
      title: "Task 4",
      description: "Description for task 4",
      status: 0,
      priority: 2,
      startDate: "2022-01-01",
      deadline: "2022-01-10",
      order: 2,
      addedDate: "2022-01-01",
    };
    const action = addTackAC(newTask);
    const newState = userReducerTask(state, action);
    expect(newState["1"].length).toBe(3);
    expect(newState["1"][0].id).toBe("4");
    expect(newState["1"][0].priority).toBe(2);
  });

  it("should handle CHANGE_TASK", () => {
    const mod = { status: 2, priority: 3 };
    const action = changeTackAC("1", mod, "1");
    const newState = userReducerTask(state, action);
    expect(newState["1"][0].status).toBe(2);
    expect(newState["1"][0].priority).toBe(3);
  });

  it("should handle SET-TASKS", () => {
    const newTasks = [
      {
        id: "4",
        todoListId: "2",
        title: "Task 4",
        description: "Description for task 4",
        status: 0,
        priority: 2,
        startDate: "2022-01-01",
        deadline: "2022-01-10",
        order: 1,
        addedDate: "2022-01-01",
      },
      {
        id: "5",
        todoListId: "2",
        title: "Task 5",
        description: "Description for task 5",
        status: 1,
        priority: 0,
        startDate: "2022-01-01",
        deadline: "2022-01-10",
        order: 2,
        addedDate: "2022-01-01",
      },
    ];
    const action = setTackAC(newTasks, "2");
    const newState = userReducerTask(state, action);
    expect(newState["2"].length).toBe(2);
    expect(newState["2"][0].id).toBe("4");
    expect(newState["2"][1].id).toBe("5");
  });
});
function removeTackAс(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}

