import { v1 } from "uuid";
import { TaskType} from "../App";
import { AddTodoType, RemoveType } from "./reduser_todolist";

const REMOVE_TASK = "REMOVE_TASK";
const ADD_TASK = "ADD_TASK";
const CHANGE_TASK_ISDONE = "CHANGE_TASK_ISDONE";
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";

export const userReducerTask = (state: TaskType, action: ActionTypeTasK): TaskType => {
  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.box.idTodo]: state[action.box.idTodo].filter(
          (el) => el.id !== action.box.id
        ),
      };
    case ADD_TASK:
      const newTask = { id: v1(), title: action.box.value, isDone: false };
      return { ...state, [action.box.id]: [newTask, ...state[action.box.id]] };
    case CHANGE_TASK_ISDONE:
      return {
        ...state,
        [action.box.idTodo]: state[action.box.idTodo].map((el) =>
          el.id === action.box.id
            ? { ...el, isDone: action.box.valueBoolean }
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
      delete state[action.id];
      return {...state}
    default:
      throw new Error("I don't understand this type");
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

export const changeTacIsDonekAC = (id: string, valueBoolean: boolean, idTodo: string) => {
  return {
    type: CHANGE_TASK_ISDONE,
    box: {
      valueBoolean,
      id,
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