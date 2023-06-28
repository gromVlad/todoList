import {
  AddTodoType,
  RemoveType,
  ResultCode,
  SetTodolistsActionType,
} from "./reduser_todolist";
import {
  Task,
  TaskStatusType,
  todolistAPI,
} from "../api/todolistApi";
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
    case "REORDER_TASKS": {
      const { sourceTaskId, destinationTaskId, sourceTodoListId } =
        action.payload;
      const tasks = state[sourceTodoListId];
      const reorderedTasks = [...tasks];
      const sourceIndex = tasks.findIndex((task) => task.id === sourceTaskId);
      const destinationIndex = tasks.findIndex(
        (task) => task.id === destinationTaskId
      );

      if (sourceIndex === -1 || destinationIndex === -1) {
        return state;
      }

      reorderedTasks.splice(
        destinationIndex,
        0,
        reorderedTasks.splice(sourceIndex, 1)[0]
      );

      return {
        ...state,
        [sourceTodoListId]: reorderedTasks.map((task, index) => ({
          ...task,
          order: index,
        })),
      };
    }
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

export const reorderTasksAC = (
  sourceTaskId: string,
  destinationTaskId: string ,
  sourceTodoListId: string 
) =>
  ({
    type: "REORDER_TASKS",
    payload: { sourceTaskId, destinationTaskId, sourceTodoListId },
  } as const);

type RemovetaskType = ReturnType<typeof removeTackAC>;
type AddtaskType = ReturnType<typeof addTackAC>;
type ChangetaskType = ReturnType<typeof changeTackAC>;
type SetTasksActionType = ReturnType<typeof setTackAC>;
type ReorderTasksType = ReturnType<typeof reorderTasksAC>;

export type ActionTypeTasK =
  | RemovetaskType
  | AddtaskType
  | ChangetaskType
  | AddTodoType
  | RemoveType
  | SetTodolistsActionType
  | SetTasksActionType
  | ReorderTasksType;

export const fetchTasksThunk=
  (todolistId: string) => (dispatch: Dispatch) => {
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
    }


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

export const reorderTasks =
  (
    sourceTodoListId: string,
    destinationTaskId: string,
    sourceTaskId: string | null
  ) =>
  (dispatch: Dispatch<any>) => {
    dispatch(changeTackAppStatusAC("loading"));
    return todolistAPI
      .reorderTasks(sourceTodoListId, destinationTaskId, sourceTaskId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          const action = reorderTasksAC(
            sourceTaskId!,
            destinationTaskId,
            sourceTodoListId
          );
          dispatch(action);
        } else {
          handleServerAppError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      })
      .finally(() => {
        dispatch(changeTackAppStatusAC("succeeded"));
      });
  };