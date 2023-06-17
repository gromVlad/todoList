import { v1 } from "uuid";
import { FitervalueType, TodolistsType } from "../App";
import { TodolistType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";

export type RemoveType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodoType = {
  type: "ADD-TODOLIST";
  title: string;
  idTodo: string;
};

type ChangeTodoTitleType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

type ChangeTodoFilterType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FitervalueType;
};

type ActionType =
  | RemoveType
  | AddTodoType
  | ChangeTodoTitleType
  | ChangeTodoFilterType
  | SetTodolistsActionType;

export let todolistID1 = v1();
export let todolistID2 = v1();

export type TodolistsTypes = TodolistType & { filter: FitervalueType };

const initState: TodolistsTypes[] = [];

export const userReducerTodolist = (
  state: TodolistsTypes[] = initState,
  action: ActionType
): TodolistsTypes[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((el) => el.id !== action.id);
    case "ADD-TODOLIST":
      return [
        ...state,
        {
          id: action.idTodo,
          title: action.title,
          filter: "all",
          addedDate: "",
          order: 0,
        },
      ];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((el) =>
        el.id === action.id ? { ...el, title: action.title } : el
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((el) =>
        el.id === action.id ? { ...el, filter: action.filter } : el
      );
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
      }));
    }
    default:
      return state;
  }
};

export const RemoveTodolistAC = (todolistId: string): RemoveType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const AddTodoTypeAC = (title: string): AddTodoType => {
  return { type: "ADD-TODOLIST", title, idTodo: v1() };
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

export const ChangeTodoFilterAC = (
  todolistId: string,
  filter: FitervalueType
): ChangeTodoFilterType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: todolistId,
    filter: filter,
  };
};

export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: Array<TodolistType>;
};

export const setTodolistsAC = (
  todolists: Array<TodolistType>
): SetTodolistsActionType => {
  return { type: "SET-TODOLISTS", todolists };
};

export const fetchTodolistAddThunk: any=  (dispatch: Dispatch) => {
    todolistAPI
      .getTodolists()
      .then((res) => dispatch(setTodolistsAC(res.data)));
}; 