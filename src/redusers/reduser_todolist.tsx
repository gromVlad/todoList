import { v1 } from "uuid";
import { FitervalueType, TodolistsType } from "../App";


type RemoveType = {
  type: "REMOVE-TODOLIST";
  id:string
};

type AddTodoType = {
  type: "ADD-TODOLIST";
  title: string;
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

export const userReducerTodolist = (state: TodolistsType[], action: ActionType): TodolistsType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((el) => el.id !== action.id);
    case "ADD-TODOLIST":
      return [...state, { id: v1(), title: action.title, filter: "all" }];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((el) =>
        el.id === action.id ? { ...el, title: action.title } : el
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((el) =>
        el.id === action.id ? { ...el, filter: action.filter } : el
      );
    default:
      throw new Error("I don't understand this type");
  }
}

export const RemoveTodolistAC = (todolistId: string): RemoveType => {
  return { type: "REMOVE-TODOLIST", id: todolistId } ;
}

export const AddTodoTypeAC = (title: string): AddTodoType => {
  return { type: "ADD-TODOLIST", title: title };
};

export const ChangeTodoTitleAC = (todolistId: string,title: string): ChangeTodoTitleType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: todolistId,
    title: title,
  };
};

export const ChangeTodoFilterAC = (todolistId: string,filter: FitervalueType): ChangeTodoFilterType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: todolistId,
    filter: filter,
  };
};