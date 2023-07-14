import { TodolistType, todolistAPI } from "../api/todolistApi";
import { Dispatch } from "redux";
import { ActionsAppReducer } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";
import { AppRootStateType } from "./state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actionsTodoandTaskClear } from "./actionsTodoandTask";
import { tasksThunks } from "./reduser_tasks";
import { createAppAsyncThunk } from "./withAsyncThunk";

export const ResultCode = {
  success: 0,
  error: 1,
  captcha: 10,
} as const;

export type FitervalueType = "all" | "completed" | "active";

export type TodoListTypeState = TodolistType & {
  filter: FitervalueType;
  entityStatus: boolean;
};

const initialState: TodoListTypeState[] = [];

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    changeTodoListFilter: (state, action: PayloadAction<{ id: string; filter: FitervalueType }>) => {
      const { id, filter } = action.payload;
      const todoList = state.find((tl) => tl.id === id);
      if (todoList) {
        todoList.filter = filter;
      }
    },
    changeEntityStatusTodoTitle: (state, action: PayloadAction<{ id: string; entityStatus: boolean }>) => {
      const { id, entityStatus } = action.payload;
      const todoList = state.find((tl) => tl.id === id);
      if (todoList) {
        todoList.entityStatus = entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistAddThunk.fulfilled, (state, action) => {
        return action.payload.todo.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: false,
        }));
      })
      .addCase(actionsTodoandTaskClear, (state, action) => {
        return action.payload.todoList;
      })
      .addCase(changeTitleTodolistThunk.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        const todoList = state.find((tl) => tl.id === id);
        if (todoList) {
          todoList.title = title;
        }
      })
      .addCase(deleteTodolistThunk.fulfilled, (state, action) => {
        return state.filter((todoList) => todoList.id !== action.payload.idTodo);
      })
      .addCase(addNewTodolistThunk.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todo, filter: "all", entityStatus: false });
      })
      .addCase(reorderTodolistTC.fulfilled, (state, action) => {
        const { todolistId, putAfterItemId } = action.payload;
        const todoList = state.find((tl) => tl.id === todolistId);
        if (!todoList) {
          return;
        }
        const newState = state.filter((tl) => tl.id !== todolistId);
        const index = newState.findIndex((tl) => tl.id === putAfterItemId);
        if (index === -1) {
          newState.unshift(todoList);
        } else {
          newState.splice(index + 1, 0, todoList);
        }
        return newState;
      });
  },
});

export const allActionsTodolist = todoListSlice.actions;
export const userReducerTodolist = todoListSlice.reducer;

//__________thunk____________//
//reorderTodolistTC
export const reorderTodolistTC = createAppAsyncThunk<
  { todolistId: string; putAfterItemId: string | null },
  { todolistId: string; putAfterItemId: string | null }
  >("tasks/reorderTodolistTC", async ({ todolistId, putAfterItemId }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.reorder(todolistId, putAfterItemId);
    if (res.data.resultCode === ResultCode.success) {
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
      return { todolistId, putAfterItemId };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

//fetchTodolistAddThunk
export const fetchTodolistAddThunk = createAppAsyncThunk<
  { todo: TodolistType[] },void
  >("tasks/fetchTodolistAddThunk", async (_,thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.getTodolists()
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
    return { todo: res.data };
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

//addNewTodolistThunk
export const addNewTodolistThunk = createAppAsyncThunk<
  { todo: TodolistType },string
  >("tasks/addNewTodolistThunk", async (title, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.createTodolist(title)
    if (res.data.resultCode === ResultCode.success) {
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }));
      return { todo: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

//deleteTodolistThunk
export const deleteTodolistThunk = createAppAsyncThunk<
  { idTodo: string }, string
  >("tasks/deleteTodolistThunk", async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.deleteTodolist(todolistId)
    if (res.data.resultCode === ResultCode.success) {
      dispatch(allActionsTodolist.changeEntityStatusTodoTitle({ id: todolistId, entityStatus: false }))
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }))
      return { idTodo: todolistId } 
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
});

//changeTitleTodolistThunk
export const changeTitleTodolistThunk = createAppAsyncThunk<
  { id: string; title: string }, { todolistId: string, title: string }
  >("tasks/changeTitleTodolistThunk", async ({ todolistId, title}, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.updateTodolist(todolistId, title)
    if (res.data.resultCode === ResultCode.success) {
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "succeeded" }))
      return { id: todolistId, title: title }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
});

//fetchTodos
export const fetchTodos = () => (dispatch: Dispatch<any>, getState: () => AppRootStateType) => {
  dispatch(fetchTodolistAddThunk());
  const todos = getState().todolist;
  todos.forEach((todo) => dispatch(tasksThunks.fetchTasksThunk(todo.id)));
};

export const todolistThunks = { reorderTodolistTC, fetchTodolistAddThunk, addNewTodolistThunk, deleteTodolistThunk, changeTitleTodolistThunk };