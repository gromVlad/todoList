import {
  AddTodoType,
  RemoveALLType,
  RemoveType,
  ResultCode,
  SetTodolistsActionType,
  fetchTodolistAddSagaAddThunk,
  fetchTodos,
} from "./reduser_todolist";
import { Task, TaskStatusType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";
import { AppRootStateType } from "./state";
import { changeTackAppStatusAC } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";

const REMOVE_TASK = "REMOVE_TASK";
const ADD_TASK = "ADD_TASK";
const CHANGE_TASK = "CHANGE_TASK_ISDONE";

export type TaskType = {
  [key: string]: Task[];
};

const initState: TaskType = {};

//______reduserTask_________//
export const userReducerTask = (
  state: TaskType = initState,
  action: ActionTypeTasK
): TaskType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.box.idTodo]: state[action.box.idTodo].filter(
          (el) => el.id !== action.box.id
        ),
      };
    case ADD_TASK:
      return {
        ...state,
        [action.box.task.todoListId]: [
          action.box.task,
          ...state[action.box.task.todoListId],
        ],
      };
    case CHANGE_TASK:
      return {
        ...state,
        [action.box.idTodo]: state[action.box.idTodo].map((el) =>
          el.id === action.box.id ? { ...el, ...action.box.mod } : el
        ),
      };
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todoNew.id]: [],
      };
    case "REMOVE-TODOLIST":
      const copyState = { ...state };
      delete copyState[action.id];
      return { ...copyState };
    case "SET-TODOLISTS":
      const stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    case "SET-TASKS": {
      const stateCopy = { ...state };
      stateCopy[action.box.todolistId] = action.box.tasks;
      return stateCopy;
    }
    case "REORDER_TASK_IN_LIST": {
      const { idTodoList, sourceTaskId, targetTaskId } = action.payload;

      // Определяем новый массив для todo list
      const todoList = [...state[idTodoList]];

      // Находим индексы задач
      const sourceIndex = todoList.findIndex((t) => t.id === sourceTaskId);
      const targetIndex = todoList.findIndex((t) => t.id === targetTaskId);

      // Сохраняем задачу для swap
      const task = todoList[sourceIndex];

      // Меняем местами задачи
      todoList[sourceIndex] = todoList[targetIndex];
      todoList[targetIndex] = task;

      // Заменяем в состоянии обновленный массив задач для этого todo list
      return {
        ...state,
        [idTodoList]: todoList,
      };
    }
    case "CLEAR-DATA-ALL":
      return {};
    default:
      return state;
  }
};

export const removeTackAC = (id: string, idTodo: string) => {
  return {
    type: REMOVE_TASK,
    box: {
      id,
      idTodo,
    },
  } as const;
};

export const addTackAC = (task: Task) => {
  return {
    type: ADD_TASK,
    box: {
      task,
    },
  } as const;
};

export const changeTackAC = (id: string, mod: PutTypeTask, idTodo: string) => {
  return {
    type: CHANGE_TASK,
    box: {
      id,
      mod,
      idTodo,
    },
  } as const;
};

export const setTackAC = (tasks: Task[], todolistId: string) => {
  return {
    type: "SET-TASKS",
    box: {
      tasks,
      todolistId,
    },
  } as const;
};

export const reorderTaskInListAC = (
  idTodoList: string,
  sourceTaskId: string,
  targetTaskId: string
) =>
  ({
    type: "REORDER_TASK_IN_LIST",
    payload: { idTodoList, sourceTaskId, targetTaskId },
  } as const);

type RemovetaskType = ReturnType<typeof removeTackAC>;
type AddtaskType = ReturnType<typeof addTackAC>;
type ChangetaskType = ReturnType<typeof changeTackAC>;
type SetTasksActionType = ReturnType<typeof setTackAC>;
type ReorderTasksType = ReturnType<typeof reorderTaskInListAC>;

export type ActionTypeTasK =
  | RemovetaskType
  | AddtaskType
  | ChangetaskType
  | AddTodoType
  | RemoveType
  | SetTodolistsActionType
  | SetTasksActionType
  | ReorderTasksType
  | RemoveALLType

export const fetchTasksThunk =
  (todolistId: string) => (dispatch: Dispatch<any>) => {
    dispatch(changeTackAppStatusAC("loading"));
    todolistAPI
      .getTask(todolistId)
      .then((res) => {
        const tasks = res.data.items;
        dispatch(setTackAC(tasks, todolistId));
        dispatch(changeTackAppStatusAC("succeeded"));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const removeTasksThunk =
  (id: string, idTodo: string) => (dispatch: Dispatch) => {
    dispatch(changeTackAppStatusAC("loading"));
    todolistAPI
      .deleteTask(idTodo, id)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          dispatch(removeTackAC(id, idTodo));
          dispatch(changeTackAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const addNewTasksThunk =
  (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeTackAppStatusAC("loading"));
    todolistAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          dispatch(addTackAC(res.data.data.item));
          dispatch(changeTackAppStatusAC("succeeded"));
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

export const updateTask = (
  taskId: string,
  todolistId: string,
  mod: PutTypeTask
) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(changeTackAppStatusAC("loading"));
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
          const action = changeTackAC(taskId, mod, todolistId);
          dispatch(action);
          dispatch(changeTackAppStatusAC("succeeded"));
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };
};

export const reorderTaskInListTC =
  (idTodoList: string, sourceTaskId: string, targetTaskId: string) =>
  (dispatch: Dispatch) => {
    dispatch(changeTackAppStatusAC("loading"));
    todolistAPI
      .reorderTasks(idTodoList, sourceTaskId, targetTaskId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          dispatch(reorderTaskInListAC(idTodoList, sourceTaskId, targetTaskId));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
