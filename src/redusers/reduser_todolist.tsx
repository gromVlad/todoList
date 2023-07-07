import { TodolistType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";
import { ActionsAppReducer } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";
import { AppThunk } from "./ActionThunkDispatchType";
import { AppRootStateType } from "./state";
import { fetchTasksThunk } from "./reduser_tasks";

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
        } else {
          handleServerAppError(response.data, dispatch);
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
