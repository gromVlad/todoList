import { TodolistType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";
import { ActionsAppReducer } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";
import { AppThunk } from "./ActionThunkDispatchType";
import { AppRootStateType } from "./state";
import { fetchTasksThunk } from "./reduser_tasks";

// export type FitervalueType = "all" | "completed" | "active";

// export type TodolistsTypes = TodolistType & {
//   filter: FitervalueType;
//   entityStatus: boolean;
// };

// const initState: TodolistsTypes[] = [];

// //____redusersTodoList________//
// export const userReducerTodolist = (state: TodolistsTypes[] = initState, action: ActionType): TodolistsTypes[] => {
//   switch (action.type) {
//     case "REMOVE-TODOLIST":
//       return state.filter((el) => el.id !== action.id);
//     case "ADD-TODOLIST":
//       return [{ ...action.todoNew, filter: "all", entityStatus: false }, ...state];
//     case "CHANGE-TODOLIST-TITLE":
//       return state.map((el) => (el.id === action.id ? { ...el, title: action.title } : el));
//     case "CHANGE-TODOLIST-FILTER":
//       return state.map((el) => (el.id === action.id ? { ...el, filter: action.filter } : el));
//     case "CHANGE-ENTITY":
//       return state.map((el) => (el.id === action.id ? { ...el, entityStatus: action.entityStatus } : el));
//     case "SET-TODOLISTS": {
//       return action.todolists.map((tl) => ({
//         ...tl,
//         filter: "all",
//         entityStatus: false,
//       }));
//     }
//     case "REORDER-TODOLISTS": {
//       const { todolistId, putAfterItemId } = action.payload;
//       const todolist = state.find((tl) => tl.id === todolistId);
//       if (!todolist) {
//         return state;
//       }
//       const newState = state.filter((tl) => tl.id !== todolistId);
//       const index = newState.findIndex((tl) => tl.id === putAfterItemId);
//       if (index === -1) {
//         newState.unshift(todolist);
//       } else {
//         newState.splice(index + 1, 0, todolist);
//       }
//       return newState;
//     }
//     case "CLEAR-DATA-ALL":
//       return [];
//     default:
//       return state;
//   }
// };

// //__________action______________//
// export const reorderTodolistsAC = (todolistId: string, putAfterItemId: string | null) =>
//   ({
//     type: "REORDER-TODOLISTS",
//     payload: { todolistId, putAfterItemId },
//   }) as const;

// type ReorderTodolistsACType = ReturnType<typeof reorderTodolistsAC>;

// export const RemoveTodolistAC = (todolistId: string): RemoveType => {
//   return { type: "REMOVE-TODOLIST", id: todolistId };
// };

// export const ClearDataAlltAC = (): RemoveALLType => {
//   return { type: "CLEAR-DATA-ALL" };
// };

// export const AddTodoTypeAC = (todoNew: TodolistType): AddTodoType => {
//   return { type: "ADD-TODOLIST", todoNew };
// };

// export const ChangeEntityStatusTodoTitleAC = (id: string, entityStatus: boolean): ChangeEntityType => {
//   return {
//     type: "CHANGE-ENTITY",
//     id,
//     entityStatus,
//   };
// };

// export const ChangeTodoTitleAC = (id: string, title: string): ChangeTodoTitleType => {
//   return {
//     type: "CHANGE-TODOLIST-TITLE",
//     id,
//     title,
//   };
// };

// export const ChangeTodoFilterAC = (todolistId: string, filter: FitervalueType): ChangeTodoFilterType => {
//   return {
//     type: "CHANGE-TODOLIST-FILTER",
//     id: todolistId,
//     filter: filter,
//   };
// };

// export type SetTodolistsActionType = {
//   type: "SET-TODOLISTS";
//   todolists: Array<TodolistType>;
// };

// export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
//   return { type: "SET-TODOLISTS", todolists };
// };

// export type ChangeEntityType = {
//   type: "CHANGE-ENTITY";
//   id: string;
//   entityStatus: boolean;
// };

// export type RemoveType = {
//   type: "REMOVE-TODOLIST";
//   id: string;
// };

// export type AddTodoType = {
//   type: "ADD-TODOLIST";
//   todoNew: TodolistType;
// };

// type ChangeTodoTitleType = {
//   type: "CHANGE-TODOLIST-TITLE";
//   id: string;
//   title: string;
// };

// type ChangeTodoFilterType = {
//   type: "CHANGE-TODOLIST-FILTER";
//   id: string;
//   filter: FitervalueType;
// };

// type ReorderTodolistType = {
//   type: "REORDER_TODOLIST";
//   todolistId: string;
//   putAfterItemId: string | null;
// };

// export type RemoveALLType = {
//   type: "CLEAR-DATA-ALL";
// };

// export type ActionType =
//   | RemoveType
//   | AddTodoType
//   | ChangeTodoTitleType
//   | ChangeTodoFilterType
//   | SetTodolistsActionType
//   | ChangeEntityType
//   | ReorderTodolistsACType
//   | RemoveALLType;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FitervalueType = "all" | "completed" | "active";

export type TodoListTypeState = TodolistType & {
  filter: FitervalueType;
  entityStatus: boolean;
};

const initialState: TodoListTypeState[] = [];

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    removeTodoList: (state, action: PayloadAction<string>) => {
      return state.filter((todoList) => todoList.id !== action.payload);
    },
    addTodoList: (state, action: PayloadAction<TodolistType>) => {
      state.unshift({ ...action.payload, filter: "all", entityStatus: false });
    },
    changeTodoListTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
      const { id, title } = action.payload;
      const todoList = state.find((tl) => tl.id === id);
      if (todoList) {
        todoList.title = title;
      }
    },
    changeTodoListFilter: (state, action: PayloadAction<{ id: string, filter: FitervalueType }>) => {
      const { id, filter } = action.payload;
      const todoList = state.find((tl) => tl.id === id);
      if (todoList) {
        todoList.filter = filter;
      }
    },
    changeEntityStatusTodoTitle: (state, action: PayloadAction<{ id: string, entityStatus: boolean }>) => {
      const { id, entityStatus } = action.payload;
      const todoList = state.find((tl) => tl.id === id);
      if (todoList) {
        todoList.entityStatus = entityStatus;
      }
    },
    setTodoLists: (state, action: PayloadAction<TodolistType[]>) => {
      return action.payload.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: false,
      }));
    },
    reorderTodoLists: (state, action: PayloadAction<{ todoListId: string, putAfterItemId: string | null }>) => {
      const { todoListId, putAfterItemId } = action.payload;
      const todoList = state.find((tl) => tl.id === todoListId);
      if (!todoList) {
        return;
      }
      const newState = state.filter((tl) => tl.id !== todoListId);
      const index = newState.findIndex((tl) => tl.id === putAfterItemId);
      if (index === -1) {
        newState.unshift(todoList);
      } else {
        newState.splice(index + 1, 0, todoList);
      }
      return newState;
    },
    clearAllData: () => {
      return initialState;
    },
  },
});

export const allActionsTodolist = todoListSlice.actions;
export const userReducerTodolist = todoListSlice.reducer;

//__________thunk____________//
export const reorderTodolistTC =
  (todolistId: string, putAfterItemId: string | null): any =>
  (dispatch: any) => {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"loading"}));
    todolistAPI
      .reorder(todolistId, putAfterItemId)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(allActionsTodolist.reorderTodoLists({todoListId:todolistId, putAfterItemId: putAfterItemId}));
          dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"succeeded"}));
          //dispatch(fetchTodolistAddThunk);
        } else {
          handleServerAppError(response.data, dispatch);
          //dispatch(fetchTodolistAddThunk);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export enum ResultCode {
  OK = 0,
  ERROr = 1,
  ERROR_CAPTCHA = 10,
}

export const fetchTodolistAddThunk = (): AppThunk => (dispatch: Dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"loading"}));
  todolistAPI
    .getTodolists()
    .then((res) => {
      dispatch(allActionsTodolist.setTodoLists(res.data));
      dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"succeeded"}));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addNewTodolistThunk = (title: string) => (dispatch: Dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"loading"}));
  todolistAPI
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(allActionsTodolist.addTodoList(res.data.data.item));
        dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"succeeded"}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const deleteTodolistThunk = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"loading"}));
  dispatch(allActionsTodolist.changeEntityStatusTodoTitle({id:todolistId, entityStatus:true}));
  todolistAPI
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(allActionsTodolist.removeTodoList(todolistId));
        dispatch(allActionsTodolist.changeEntityStatusTodoTitle({ id: todolistId, entityStatus: false }));
        dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"succeeded"}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    //получть сообщение об ошибке сгенерированно сервером
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const changeTitleTodolistThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"loading"}));
  todolistAPI
    .updateTodolist(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.OK) {
        dispatch(allActionsTodolist.changeTodoListTitle({id: todolistId, title: title}));
        dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"succeeded"}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const fetchTodos = () => (dispatch: Dispatch<any>, getState: () => AppRootStateType) => {
  dispatch(fetchTodolistAddThunk());
  const todos = getState().todolist;
  todos.forEach((todo) => dispatch(fetchTasksThunk(todo.id)));
};
