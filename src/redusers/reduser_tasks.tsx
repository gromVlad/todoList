import { Task, TaskStatusType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";
import { AppRootStateType } from "./state";
import { ActionsAppReducer } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { allActionsTodolist, fetchTodos, ResultCode } from "./reduser_todolist";
import { actionsTodoandTaskClear } from "./actionsTodoandTask";

export type TaskType = {
  [key: string]: Task[];
};

const initialState: TaskType = {};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<{ id: string; idTodo: string }>) => {
      return {
        ...state,
        [action.payload.idTodo]: state[action.payload.idTodo].filter((el) => el.id !== action.payload.id),
      };
    },
    addTask: (state, action: PayloadAction<{ task: Task }>) => {
      const { task } = action.payload;
      if (!state[task.todoListId]) {
        state[task.todoListId] = [];
      }
      state[task.todoListId].unshift(task);
    },
    changeTask: (state, action: PayloadAction<{ id: string; mod: PutTypeTask; idTodo: string }>) => {
      const { id, mod, idTodo } = action.payload;
      const tasks = state[idTodo];
      const task = tasks.find((t) => t.id === id);
      if (task) {
        Object.assign(task, mod);
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: Task[]; todolistId: string }>) => {
      const { tasks, todolistId } = action.payload;
      state[todolistId] = tasks;
    },
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

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allActionsTodolist.addTodoList, (state, action) => {
        state[action.payload.id] = [];
      })
      .addCase(allActionsTodolist.removeTodoList, (state, action) => {
        delete state[action.payload];
      })
      .addCase(allActionsTodolist.setTodoLists, (state, action) => {
        action.payload.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(actionsTodoandTaskClear, (state,action) => {
        return action.payload.task
      });
  },
});

export const alluserReducertask = taskSlice.actions;

export const userReducerTask = taskSlice.reducer;

export const fetchTasksThunk = (todolistId: string) => (dispatch: Dispatch<any>) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
  todolistAPI
    .getTask(todolistId)
    .then((res) => {
      const tasks = res.data.items;
      dispatch(alluserReducertask.setTasks({ tasks, todolistId }));
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTasksThunk = (id: string, idTodo: string) => (dispatch: Dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
  todolistAPI
    .deleteTask(idTodo, id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(alluserReducertask.removeTask({ id, idTodo }));
        dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addNewTasksThunk = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
  todolistAPI
    .createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(alluserReducertask.addTask({ task: res.data.data.item }));
        dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

type PutTypeTask = {
  title?: string;
  description?: string;
  status?: TaskStatusType;
  priority?: number;
  startDate?: string;
  deadline?: string;
};

export const updateTask = (taskId: string, todolistId: string, mod: PutTypeTask) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const task = tasksForCurrentTodolist.find((t) => {
      return t.id === taskId;
    });

    if (task) {
      todolistAPI
        .updateTask(todolistId, taskId, {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          ...mod,
        })
        .then(() => {
          const action = alluserReducertask.changeTask({ id: taskId, mod, idTodo: todolistId });
          dispatch(action);
          dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };
};

export const reorderTaskInListTC =
  (idTodoList: string, sourceTaskId: string, targetTaskId: string) => (dispatch: any) => {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
    todolistAPI
      .reorderTasks(idTodoList, sourceTaskId, targetTaskId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          //dispatch(fetchTodos())
          dispatch(alluserReducertask.reorderTaskInList({ idTodoList, sourceTaskId, targetTaskId }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
