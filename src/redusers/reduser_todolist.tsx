import { TodolistType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";
import { AppThunk } from "./state";
import { changeTackAppErrorAC, changeTackAppStatusAC } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";

export type FitervalueType = "all" | "completed" | "active";

export type TodolistsTypes = TodolistType & {
  filter: FitervalueType;
  entityStatus: boolean
};

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
      return [
        { ...action.todoNew, filter: "all", entityStatus: false },
        ...state,
      ];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((el) =>
        el.id === action.id ? { ...el, title: action.title } : el
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((el) =>
        el.id === action.id ? { ...el, filter: action.filter } : el
      );
    case "CHANGE-ENTITY":
      return state.map((el) =>
        el.id === action.id ? { ...el, entityStatus: action.entityStatus } : el
      );
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: false,
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

export const ChangeEntityStatusTodoTitleAC = (
  id: string,
  entityStatus: boolean
): ChangeEntityType => {
  return {
    type: "CHANGE-ENTITY",
    id,
    entityStatus
  };
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

export type ChangeEntityType = {
  type: "CHANGE-ENTITY";
  id: string;
  entityStatus: boolean;
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

export type ActionType =
  | RemoveType
  | AddTodoType
  | ChangeTodoTitleType
  | ChangeTodoFilterType
  | SetTodolistsActionType
  | ChangeEntityType

//__________thunk____________//
export enum ResultCode {
  OK = 0,
  ERROr = 1,
  ERROR_CAPTCHA = 10
}

export const fetchTodolistAddThunk =  (dispatch: Dispatch) => {
    dispatch(changeTackAppStatusAC("loading"));
    todolistAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data));
        dispatch(changeTackAppStatusAC("succeeded"));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
}; 

export const addNewTodolistThunk  = (title:string) =>  (dispatch: Dispatch) => {
    dispatch(changeTackAppStatusAC('loading'));
    todolistAPI
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          dispatch(AddTodoTypeAC(res.data.data.item));
          dispatch(changeTackAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);;
      })
}; 

export const deleteTodolistThunk  = (todolistId: string) =>  (dispatch: Dispatch) => {
   dispatch(changeTackAppStatusAC("loading"));
    dispatch(ChangeEntityStatusTodoTitleAC(todolistId,true));
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          dispatch(RemoveTodolistAC(todolistId));
          dispatch(ChangeEntityStatusTodoTitleAC(todolistId, false));
          dispatch(changeTackAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      //получть сообщение об ошибке сгенерированно сервером 
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });

}; 

export const changeTitleTodolistThunk =
  (todolistId: string, title: string) =>
  (dispatch: Dispatch) => {
    dispatch(changeTackAppStatusAC("loading"));
    todolistAPI
      .updateTodolist(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.OK) {
          dispatch(ChangeTodoTitleAC(todolistId, title));
          dispatch(changeTackAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  }; 

// export const _changeTitleTodolistThunk =
//   (todolistId: string, title: string): AppThunk =>
//   async dispatch => {
//     try {
//       let res = await todolistAPI.updateTodolist(todolistId, title);
//       dispatch(ChangeTodoTitleAC(todolistId, title));
//     } catch (e) {
//       throw new Error('error');
//     }
//   };

//например первая <T>  то что закидывем сразу типизируеться, далее дакже это указываем в сомо аргументе и последнее та типизация что мы принимаем то и вернем по факту
function res <T>(arg:T):T  {
  return arg
}