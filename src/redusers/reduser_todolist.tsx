import { v1 } from "uuid";
import { FitervalueType, TodolistsType } from "../App";


export type RemoveType = {
  type: "REMOVE-TODOLIST";
  id:string
};

export type AddTodoType = {
  type: "ADD-TODOLIST";
  title: string;
  idTodo:string
};

type ChangeTodoTitleType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

type ChangeTodoFilterType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FitervalueType
};

type ActionType =
  | RemoveType
  | AddTodoType
  | ChangeTodoTitleType
  | ChangeTodoFilterType;

export let todolistID1 = v1();
export let todolistID2 = v1();

const initState: TodolistsType[] = [
  { id: todolistID1, title: "What to learn", filter: "all" },
  { id: todolistID2, title: "What to buy", filter: "all" },
];

export const userReducerTodolist = (
  state: TodolistsType[] = initState,
  action: ActionType
): TodolistsType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((el) => el.id !== action.id);
    case "ADD-TODOLIST":
      return [
        ...state,
        { id: action.idTodo, title: action.title, filter: "all" },
      ];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((el) =>
        el.id === action.id ? { ...el, title: action.title } : el
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((el) =>
        el.id === action.id ? { ...el, filter: action.filter } : el
      );
    default:
      return state;
  }
};

export const RemoveTodolistAC = (todolistId: string): RemoveType => {
  return { type: "REMOVE-TODOLIST", id: todolistId } ;
}

export const AddTodoTypeAC = (title: string): AddTodoType => {
  return { type: "ADD-TODOLIST", title, idTodo:v1() };
};

export const ChangeTodoTitleAC = (
  id: string,
  title: string
): ChangeTodoTitleType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title,
  };
};

export const ChangeTodoFilterAC = (todolistId: string,filter: FitervalueType): ChangeTodoFilterType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: todolistId,
    filter: filter,
  };
};