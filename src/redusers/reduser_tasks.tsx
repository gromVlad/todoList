import { v1 } from "uuid";
import {
  AddTodoType,
  RemoveType,
  SetTodolistsActionType,
} from "./reduser_todolist";
import { Task, TaskPriorities, TaskStatusType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";
import { AppRootStateType } from "./state";

const REMOVE_TASK = "REMOVE_TASK";
const ADD_TASK = "ADD_TASK";
const CHANGE_TASK = "CHANGE_TASK_ISDONE";

export type TaskType = {
  [key: string]: Task[];
};

const initState: TaskType = {
  
};
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
      return { ...state, [action.box.task.todoListId]: [action.box.task, ...state[action.box.task.todoListId]] }
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
        [action.idTodo]: [],
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
    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.box.todolistId] = action.box.tasks
      return stateCopy
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


type RemovetaskType = ReturnType<typeof removeTackAC>;
type AddtaskType = ReturnType<typeof addTackAC>;
type ChangetaskType = ReturnType<typeof changeTackAC>;
type SetTasksActionType = ReturnType<typeof setTackAC>;

type ActionTypeTasK =
  | RemovetaskType
  | AddtaskType
  | ChangetaskType
  | AddTodoType
  | RemoveType
  | SetTodolistsActionType
  | SetTasksActionType

export const fetchTasksThunk:any = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.getTask(todolistId).then((res) => {
    const tasks = res.data.items;
    dispatch(setTackAC(tasks, todolistId));
  });
};

export const removeTasksThunk: any =
  (id: string, idTodo: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(idTodo, id).then((res) => {
      dispatch(removeTackAC(id, idTodo));
    });
  };

export const addNewTasksThunk: any =
  (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId,title).then((res) => {
      dispatch(addTackAC(res.data.data.item));
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
): any => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
          ...mod
        })
        .then(() => {
          const action = changeTackAC(taskId, mod, todolistId);
          dispatch(action);
        });
    }
  };
};