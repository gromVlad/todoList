import { Task, TaskPriorities, TaskStatusType } from "api/todolistApi";
import { TaskType, taskSlice, tasksThunks } from "./reduser_tasks";


describe("taskSlice reducer", () => {
  let initialState: TaskType;

  beforeEach(() => {
    initialState = {};
  });

  test("should handle addTask", () => {
    const task: Task = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      status: TaskStatusType.New,
      priority: TaskPriorities.Low,
      startDate: "2022-01-01",
      deadline: "2022-01-31",
      todoListId: "1",
      order: 0,
      addedDate: "2022-01-01",
    };

    const newState = taskSlice.reducer(initialState, tasksThunks.addNewTasksThunk.fulfilled({ task }, 'requestId', { task }));

    expect(newState).toEqual({ "1": [task] });
  });

  test("should handle removeTask", () => {
    const task: Task = {
      id: "1",
      title: "Test Task",
      description: "This is a test task",
      status: TaskStatusType.New,
      priority: TaskPriorities.Low,
      startDate: "2022-01-01",
      deadline: "2022-01-31",
      todoListId: "1",
      order: 0,
      addedDate: "2022-01-01",
    };

    const state: TaskType = { "1": [task] };

    const newState = taskSlice.reducer(state, tasksThunks.removeTasksThunk.fulfilled({ id: "1", idTodo: "1" }, 'requestId', { id: "1", idTodo: "1" }));

    expect(newState).toEqual({ "1": [] });
  });

  test("should handle changeTask", () => {
    const oldTask: Task = {
      id: "1",
      title: "Test Task",
      description: "This is an old test task",
      status: TaskStatusType.New,
      priority: TaskPriorities.Low,
      startDate: "2022-01-01",
      deadline: "2022-01-31",
      todoListId: "1",
      order: 0,
      addedDate: "2022-01-01",
    };

    const state: TaskType = { "1": [oldTask] };

    const newTask: Task = {
      id: "1",
      title: "Updated Test Task",
      description: "This is an updated test task",
      status: TaskStatusType.Completed,
      priority: TaskPriorities.Hi,
      startDate: "2022-02-01",
      deadline: "2022-02-28",
      todoListId: "1",
      order: 0,
      addedDate: "2022-01-01",
    };

    const newState = taskSlice.reducer(state, taskSlice.actions.changeTask({ id: "1", mod: newTask, idTodo: "1" }));

    expect(newState).toEqual({ "1": [newTask] });
  });

  test("should handle setTasks", () => {
    const tasks: Task[] = [
      {
        id: "1",
        title: "Test Task 1",
        description: "This is a test task",
        status: TaskStatusType.New,
        priority: TaskPriorities.Low,
        startDate: "2022-01-01",
        deadline: "2022-01-31",
        todoListId: "1",
        order: 0,
        addedDate: "2022-01-01",
      },
      {
        id: "2",
        title: "Test Task 2",
        description: "This is another test task",
        status: TaskStatusType.Completed,
        priority: TaskPriorities.Hi,
        startDate: "2022-02-01",
        deadline: "2022-02-28",
        todoListId: "1",
        order: 1,
        addedDate: "2022-01-01",
      },
    ];

    const newState = taskSlice.reducer(initialState, tasksThunks.fetchTasksThunk.fulfilled({ tasks, todolistId: "1" }, 'requestId', 'todolistId1'));

    expect(newState).toEqual({ "1": tasks });
  });

  it("should handle reorderTaskInList", () => {
    const tasks: TaskType["1"] = [
      {
        id: "1",
        title: "Test Task 1",
        description: "This is a test task",
        status: TaskStatusType.New,
        priority: TaskPriorities.Low,
        startDate: "2022-01-01",
        deadline: "2022-01-31",
        todoListId: "1",
        order: 1,
        addedDate: "2022-01-01",
      },
      {
        id: "2",
        title: "Test Task 2",
        description: "This is another test task",
        status: TaskStatusType.New,
        priority: TaskPriorities.Hi,
        startDate: "2022-02-01",
        deadline: "2022-02-28",
        todoListId: "1",
        order: 0,
        addedDate: "2022-01-01",
      },
    ];
    const state: TaskType = { "1": tasks };

    const newState = taskSlice.reducer(
      state,
      taskSlice.actions.reorderTaskInList({ idTodoList: "1", sourceTaskId: "2", targetTaskId: "1" })
    );

    expect(newState).toEqual({
      "1": [
        {
          id: "2",
          title: "Test Task 2",
          description: "This is another test task",
          status: TaskStatusType.New,
          priority: TaskPriorities.Hi,
          startDate: "2022-02-01",
          deadline: "2022-02-28",
          todoListId: "1",
          order: 0,
          addedDate: "2022-01-01",
        },
        {
          id: "1",
          title: "Test Task 1",
          description: "This is a test task",
          status: TaskStatusType.New,
          priority: TaskPriorities.Low,
          startDate: "2022-01-01",
          deadline: "2022-01-31",
          todoListId: "1",
          order: 1,
          addedDate: "2022-01-01",
        },
      ],
    });
  })
})