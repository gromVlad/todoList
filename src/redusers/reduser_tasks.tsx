import { v1 } from "uuid";
import { AddTodoType, RemoveType, todolistID1, todolistID2 } from "./reduser_todolist";
import { Task, TaskPriorities, TaskStatusType } from "../api/todolistApi";

const REMOVE_TASK = "REMOVE_TASK";
const ADD_TASK = "ADD_TASK";
const CHANGE_TASK_ISDONE = "CHANGE_TASK_ISDONE";
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";


export type TaskType = {
  [key: string]: Task[];
};


const initState: TaskType = {
  [todolistID1]: [
    {
      description: "",
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatusType.New,
      priority: TaskPriorities.Urgently,
      startDate: "",
      deadline: "",
      todoListId: todolistID1,
      order: 0,
      addedDate: "",
    },
  ],
  [todolistID2]: [
    {
      description: "",
      id: v1(),
      title: "Js",
      status: TaskStatusType.New,
      priority: TaskPriorities.Urgently,
      startDate: "",
      deadline: "",
      todoListId: todolistID2,
      order: 0,
      addedDate: "",
    },
  ],
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
      const newTask = {
      description: "",
      id: v1(),
      title:  action.box.value,
      status: TaskStatusType.New,
      priority: TaskPriorities.Urgently,
      startDate: "",
      deadline: "",
      todoListId: todolistID1,
      order: 0,
      addedDate: "",
    }

      return { ...state, [action.box.id]: [newTask, ...state[action.box.id]] };
    case CHANGE_TASK_ISDONE:
      return {
        ...state,
        [action.box.idTodo]: state[action.box.idTodo].map((el) =>
          el.id === action.box.id
            ? { ...el, status:action.box.status }
            : el
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
    default:
      return state;
  }
};

export const removeTackAC = (id: string, idTodo: string) => {
  return {
    type: REMOVE_TASK,
    box: {
      id,
      idTodo
    } ,
  } as const
};

export const addTackAC = (value: string, id: string) => {
  return {
    type: ADD_TASK,
    box: {
      value,
      id,
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

export const changeTacTitlekAC = (id: string, value: string, idTodo: string) => {
  return {
    type: CHANGE_TASK_TITLE,
    box: {
      id,
      value,
      idTodo,
    },
  } as const;
};

type RemovetaskType = ReturnType<typeof removeTackAC>
type AddtaskType = ReturnType<typeof addTackAC>;
type ChangetaskType = ReturnType<typeof changeTacIsDonekAC>;
type ChangetaskTitleType = ReturnType<typeof changeTacTitlekAC>;

type ActionTypeTasK =
  | RemovetaskType
  | AddtaskType
  | ChangetaskType
  | ChangetaskTitleType
  | AddTodoType
  | RemoveType