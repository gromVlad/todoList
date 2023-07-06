import { Task, TaskStatusType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";
import { AppRootStateType } from "./state";
import { ActionsAppReducer } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";

// const REMOVE_TASK = "REMOVE_TASK";
// const ADD_TASK = "ADD_TASK";
// const CHANGE_TASK = "CHANGE_TASK_ISDONE";

// export type TaskType = {
//   [key: string]: Task[];
// };

// const initState: TaskType = {};

// //______reduserTask_________//
// export const userReducerTask = (state: TaskType = initState, action: ActionTypeTasK): TaskType => {
//   switch (action.type) {
//     case REMOVE_TASK:
//       return {
//         ...state,
//         [action.box.idTodo]: state[action.box.idTodo].filter((el) => el.id !== action.box.id),
//       };
//     case ADD_TASK:
//       return {
//         ...state,
//         [action.box.task.todoListId]: [action.box.task, ...state[action.box.task.todoListId]],
//       };
//     case CHANGE_TASK:
//       return {
//         ...state,
//         [action.box.idTodo]: state[action.box.idTodo].map((el) =>
//           el.id === action.box.id ? { ...el, ...action.box.mod } : el,
//         ),
//       };
//     case "ADD-TODOLIST":
//       return {
//         ...state,
//         [action.todoNew.id]: [],
//       };
//     case "REMOVE-TODOLIST":
//       const copyState = { ...state };
//       delete copyState[action.id];
//       return { ...copyState };
//     case "SET-TODOLISTS":
//       const stateCopy = { ...state };
//       action.todolists.forEach((tl) => {
//         stateCopy[tl.id] = [];
//       });
//       return stateCopy;
//     case "SET-TASKS": {
//       const stateCopy = { ...state };
//       stateCopy[action.box.todolistId] = action.box.tasks;
//       return stateCopy;
//     }
//     case "REORDER_TASK_IN_LIST": {
//       const { idTodoList, sourceTaskId, targetTaskId } = action.payload;

//       // Определяем новый массив для todo list
//       const todoList = [...state[idTodoList]];

//       // Находим индексы задач
//       const sourceIndex = todoList.findIndex((t) => t.id === sourceTaskId);
//       const targetIndex = todoList.findIndex((t) => t.id === targetTaskId);

//       // Сохраняем задачу для swap
//       const task = todoList[sourceIndex];

//       // Меняем местами задачи
//       todoList[sourceIndex] = todoList[targetIndex];
//       todoList[targetIndex] = task;

//       // Заменяем в состоянии обновленный массив задач для этого todo list
//       return {
//         ...state,
//         [idTodoList]: todoList,
//       };
//     }
//     case "CLEAR-DATA-ALL":
//       return {};
//     default:
//       return state;
//   }
// };

// export const removeTackAC = (id: string, idTodo: string) => {
//   return {
//     type: REMOVE_TASK,
//     box: {
//       id,
//       idTodo,
//     },
//   } as const;
// };

// export const addTackAC = (task: Task) => {
//   return {
//     type: ADD_TASK,
//     box: {
//       task,
//     },
//   } as const;
// };

// export const changeTackAC = (id: string, mod: PutTypeTask, idTodo: string) => {
//   return {
//     type: CHANGE_TASK,
//     box: {
//       id,
//       mod,
//       idTodo,
//     },
//   } as const;
// };

// export const setTackAC = (tasks: Task[], todolistId: string) => {
//   return {
//     type: "SET-TASKS",
//     box: {
//       tasks,
//       todolistId,
//     },
//   } as const;
// };

// export const reorderTaskInListAC = (idTodoList: string, sourceTaskId: string, targetTaskId: string) =>
//   ({
//     type: "REORDER_TASK_IN_LIST",
//     payload: { idTodoList, sourceTaskId, targetTaskId },
//   }) as const;

// type RemovetaskType = ReturnType<typeof removeTackAC>;
// type AddtaskType = ReturnType<typeof addTackAC>;
// type ChangetaskType = ReturnType<typeof changeTackAC>;
// type SetTasksActionType = ReturnType<typeof setTackAC>;
// type ReorderTasksType = ReturnType<typeof reorderTaskInListAC>;

// export type ActionTypeTasK =
//   | RemovetaskType
//   | AddtaskType
//   | ChangetaskType
//   | AddTodoType
//   | RemoveType
//   | SetTodolistsActionType
//   | SetTasksActionType
//   | ReorderTasksType
//   | RemoveALLType;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allActionsTodolist, ResultCode } from "./reduser_todolist";

export type TaskType = {
  [key: string]: Task[];
};

const initialState: TaskType = {};


export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTask: (state, action: PayloadAction<{ id: string, idTodo: string }>) => {
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
    changeTask: (state, action: PayloadAction<{ id: string, mod: PutTypeTask, idTodo: string }>) => {
      const { id, mod, idTodo } = action.payload;
      const tasks = state[idTodo];
      const task = tasks.find((t) => t.id === id);
      if (task) {
        Object.assign(task, mod);
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: Task[], todolistId: string }>) => {
      const { tasks, todolistId } = action.payload;
      state[todolistId] = tasks;
    },
    reorderTaskInList: (state, action: PayloadAction<{ idTodoList: string, sourceTaskId: string, targetTaskId: string }>) => {
      const { idTodoList, sourceTaskId, targetTaskId } = action.payload;
      const todoList = state[idTodoList];

      const sourceIndex = todoList.findIndex((t) => t.id === sourceTaskId);
      const targetIndex = todoList.findIndex((t) => t.id === targetTaskId);

      const task = todoList[sourceIndex];

      todoList[sourceIndex] = todoList[targetIndex];
      todoList[targetIndex] = task;

      return state;
    },
    clearAllData: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allActionsTodolist.addTodoList, (state, action) => {
      state[action.payload.id] = [];
    });
    builder.addCase(allActionsTodolist.removeTodoList, (state, action) => {
      delete state[action.payload];
    });
    builder.addCase(allActionsTodolist.setTodoLists, (state, action) => {
      action.payload.forEach((tl) => {
        state[tl.id] = [];
      });
    });
  },
});

export const alluserReducertask = taskSlice.actions;

export const userReducerTask = taskSlice.reducer;

export const fetchTasksThunk = (todolistId: string) => (dispatch: Dispatch<any>) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "loading"}));
  todolistAPI
    .getTask(todolistId)
    .then((res) => {
      const tasks = res.data.items;
      dispatch(alluserReducertask.setTasks({tasks, todolistId}));
      dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "succeeded"}));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTasksThunk = (id: string, idTodo: string) => (dispatch: Dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "loading"}));
  todolistAPI
    .deleteTask(idTodo, id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(alluserReducertask.removeTask({id, idTodo}));
        dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "succeeded"}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addNewTasksThunk = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "loading"}));
  todolistAPI
    .createTask(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(alluserReducertask.addTask({ task: res.data.data.item}));
        dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "succeeded"}));
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
    dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "loading"}));
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
          const action = alluserReducertask.changeTask({ id: taskId, mod, idTodo: todolistId});
          dispatch(action);
          dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "succeeded"}));
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };
};

export const reorderTaskInListTC =
  (idTodoList: string, sourceTaskId: string, targetTaskId: string) => (dispatch: Dispatch) => {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "loading"}));
    todolistAPI
      .reorderTasks(idTodoList, sourceTaskId, targetTaskId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          dispatch(alluserReducertask.reorderTaskInList({idTodoList, sourceTaskId, targetTaskId}));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

