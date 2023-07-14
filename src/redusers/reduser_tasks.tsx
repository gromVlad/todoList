import { Task, TaskStatusType, todolistAPI } from "../api/todolistApi";
import { ActionsAppReducer } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allActionsTodolist, fetchTodos, ResultCode, todolistThunks } from "./reduser_todolist";
import { actionsTodoandTaskClear } from "./actionsTodoandTask";
import { createAppAsyncThunk } from "./withAsyncThunk";

export type TaskType = {
  [key: string]: Task[];
};

const initialState: TaskType = {};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reorderTaskInList: (
      state,
      action: PayloadAction<{ idTodoList: string; sourceTaskId: string; targetTaskId: string }>,
    ) => {
      const { idTodoList, sourceTaskId, targetTaskId } = action.payload;
      const todoList = state[idTodoList];

      const sourceIndex = todoList.findIndex((t) => t.id === sourceTaskId);
      const targetIndex = todoList.findIndex((t) => t.id === targetTaskId);

      const task = todoList[sourceIndex];

      todoList[sourceIndex] = todoList[targetIndex];
      todoList[targetIndex] = task;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        const { tasks, todolistId } = action.payload;
        state[todolistId] = tasks;
      })
      .addCase(removeTasksThunk.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.idTodo]: state[action.payload.idTodo].filter((el) => el.id !== action.payload.id),
        };
      })
      .addCase(addNewTasksThunk.fulfilled, (state, action) => {
        const { task } = action.payload;
        if (!state[task.todoListId]) {
          state[task.todoListId] = [];
        }
        state[task.todoListId].unshift(task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, mod, idTodo } = action.payload;
        const tasks = state[idTodo];
        const task = tasks.find((t) => t.id === id);
        if (task) {
          Object.assign(task, mod);
        }
      })
      .addCase(todolistThunks.addNewTodolistThunk.fulfilled, (state, action) => {
        state[action.payload.todo.id] = [];
      })
      .addCase(todolistThunks.deleteTodolistThunk.fulfilled, (state, action) => {
        delete state[action.payload.idTodo];
      })
      .addCase(todolistThunks.fetchTodolistAddThunk.fulfilled, (state, action) => {
        action.payload.todo.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(actionsTodoandTaskClear, (state, action) => {
        return action.payload.task;
      });
  },
});

//____Thunk____//

//fetchTasksThunk
export const fetchTasksThunk = createAppAsyncThunk<{ tasks: Task[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
      const res = await todolistAPI.getTask(todolistId);
      const tasks = res.data.items;
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
      return { tasks, todolistId };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

//removeTasksThunk
export const removeTasksThunk = createAppAsyncThunk<{ id: string; idTodo: string }, { id: string; idTodo: string }>(
  "tasks/removeTasksThunK",
  async ({ id, idTodo }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
      const res = await todolistAPI.deleteTask(idTodo, id);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
        return { id, idTodo };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

//addNewTasksThunk
export const addNewTasksThunk = createAppAsyncThunk<{ task: Task }, { title: string; todolistId: string }>(
  "tasks/addNewTasksThunk",
  async ({ title, todolistId }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
      const res = await todolistAPI.createTask(todolistId, title);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
        return { task: res.data.data.item };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

//updateTask
type PutTypeTask = {
  title?: string;
  description?: string;
  status?: TaskStatusType;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

//updateTask
export const updateTask = createAppAsyncThunk<
  { id: string; mod: PutTypeTask; idTodo: string },
  { taskId: string; todolistId: string; mod: PutTypeTask }
>("tasks/updateTask", async ({ taskId, todolistId, mod }, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;

  dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
  const allTasksFromState = getState().tasks;
  const tasksForCurrentTodolist = allTasksFromState[todolistId];
  const task = tasksForCurrentTodolist.find((t) => {
    return t.id === taskId;
  });

  if (task) {
    try {
      const res = await todolistAPI.updateTask(todolistId, taskId, {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...mod,
      });

      if (res.data.resultCode === 0) {
        dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
        return { id: taskId, mod, idTodo: todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  } else {
    dispatch(ActionsAppReducer.changeTackAppErrorAC({ error: "Task not found" }));
    return rejectWithValue(null);
  }
});

//reorderTaskInListTC
export const reorderTaskInListTC =
  (idTodoList: string, sourceTaskId: string, targetTaskId: string) => (dispatch: any) => {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
    todolistAPI
      .reorderTasks(idTodoList, sourceTaskId, targetTaskId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.success) {
          setTimeout(() => {
            dispatch(fetchTodos());
          }, 2000);
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const alluserReducertask = taskSlice.actions;
export const userReducerTask = taskSlice.reducer;
export const tasksThunks = { fetchTasksThunk, removeTasksThunk, addNewTasksThunk, updateTask };
