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
const CHANGE_TASK_ISDONE = "CHANGE_TASK_ISDONE";
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";

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
      // const stateCopy1 = { ...state };
      // const tasks = stateCopy1[action.box.task.todoListId];
      // const newTasks = [action.box.task, ...tasks];
      // stateCopy1[action.box.task.todoListId] = newTasks;
      // return stateCopy1;
      return { ...state, [action.box.task.todoListId]: [action.box.task, ...state[action.box.task.todoListId]] }
    case CHANGE_TASK_ISDONE:
      return {
        ...state,
        [action.box.idTodo]: state[action.box.idTodo].map((el) =>
          el.id === action.box.id ? { ...el, status: action.box.status } : el
        ),
      };
    case CHANGE_TASK_TITLE:
      return {
        ...state,
        [action.box.idTodo]: state[action.box.idTodo].map((el) =>
          el.id === action.box.id ? { ...el, title: action.box.value } : el
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

export const changeTacIsDonekAC = (
  id: string,
  status: TaskStatusType,
  idTodo: string
) => {
  return {
    type: CHANGE_TASK_ISDONE,
    box: {
      id,
      status,
      idTodo,
    },
  } as const;
};

export const changeTacTitlekAC = (
  id: string,
  value: string,
  idTodo: string
) => {
  return {
    type: CHANGE_TASK_TITLE,
    box: {
      id,
      value,
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
type ChangetaskType = ReturnType<typeof changeTacIsDonekAC>;
type ChangetaskTitleType = ReturnType<typeof changeTacTitlekAC>;
type SetTasksActionType = ReturnType<typeof setTackAC>;

type ActionTypeTasK =
  | RemovetaskType
  | AddtaskType
  | ChangetaskType
  | ChangetaskTitleType
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

export const updateTaskStatusTC = (
  taskId: string,
  todolistId: string,
  status: TaskStatusType
):any => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
    // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

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
          status: status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
        })
        .then(() => {
          const action = changeTacIsDonekAC(taskId, status, todolistId);
          dispatch(action);
        });
    }
  };
};