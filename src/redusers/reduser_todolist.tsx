import { TodolistType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";

export type FitervalueType = "all" | "completed" | "active";

export type TodolistsTypes = TodolistType & { filter: FitervalueType };

const initState: TodolistsTypes[] = [];

//____redusersTodoList________//
export const userReducerTodolist = (
  state: TodolistsTypes[] = initState,
  action: ActionType
): TodolistsTypes[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((el) => el.id !== action.id);
    case "ADD-TODOLIST":
      return [{ ...action.todoNew, filter: "all" }, ...state];
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

//__________action______________//
export const RemoveTodolistAC = (todolistId: string): RemoveType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const AddTodoTypeAC = (todoNew: TodolistType): AddTodoType => {
  return { type: "ADD-TODOLIST", todoNew };
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

export type RemoveType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodoType = {
  type: "ADD-TODOLIST";
  todoNew: TodolistType;
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

//__________thunk____________//
export const fetchTodolistAddThunk =  (dispatch: Dispatch) => {
    todolistAPI
      .getTodolists()
      .then((res) => dispatch(setTodolistsAC(res.data)));
}; 

export const addNewTodolistThunk  = (title:string) =>  (dispatch: Dispatch) => {
    todolistAPI
      .createTodolist(title)
      .then((res) => dispatch(AddTodoTypeAC(res.data.data.item)));
}; 

export const deleteTodolistThunk  = (todolistId: string) =>  (dispatch: Dispatch) => {
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => dispatch(RemoveTodolistAC(todolistId)));
}; 

export const changeTitleTodolistThunk  =
  (todolistId:string,title: string) => (dispatch: Dispatch) => {
    todolistAPI
      .updateTodolist(todolistId,title)
      .then((res) => dispatch(ChangeTodoTitleAC(todolistId, title)));
  }; 