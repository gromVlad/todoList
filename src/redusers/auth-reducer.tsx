import { ActionsAppReducer } from "./app-reducer";
import { LoginType, captchaAPI, todolistAPI } from "../api/todolistApi";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./ActionThunkDispatchType";
import { actionsTodoandTaskClear } from "./actionsTodoandTask";
import { createAppAsyncThunk } from "./withAsyncThunk";
import { thunkTryCatch } from "utils/thunkTryCatch";
import { ResultCode } from "./reduser_todolist";


export const initialState = {
  isLoggedIn: false,
  isInit: false,
  urlCaptch: null as null | string,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedInAC: (state, action: PayloadAction<{ isLoggedIn:boolean}>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setIsInitInAC: (state, action: PayloadAction<{ isInit: boolean }>) => {
      state.isInit = action.payload.isInit;
    },
    getCaptchCreator: (state, action: PayloadAction<{urlCaptch:string | null}>) => {
      state.urlCaptch = action.payload.urlCaptch;
    },
    nullCaptchCreator: (state) => {
      state.urlCaptch = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeAppTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logoutTC.fulfilled, (state, action) => {
        state.isLoggedIn = false
      })
  }
});

export const allActionsauthReducer = authSlice.actions
export const authReducer = authSlice.reducer;

//__ thunks__//

//login
export const loginTC = createAppAsyncThunk< { isLoggedIn: boolean }, {data: LoginType}>(
  "auth/login",
  async ({data}, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async  () =>  {
      const { dispatch, rejectWithValue } = thunkAPI;
      const res = await todolistAPI.login(data)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(allActionsauthReducer.nullCaptchCreator());
        return { isLoggedIn: true };
      } else if (res.data.resultCode === ResultCode.captcha) {
        dispatch(getCaptchThunk());
        return rejectWithValue(null);
      } else {
        const isShowAppError = !res.data.fieldsErrors.length
        handleServerAppError(res.data, dispatch,isShowAppError);
        return rejectWithValue(res.data);
      }
    })
  },
);

//initializeApp
export const initializeAppTC = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  "tasks/initializeApp",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(allActionsauthReducer.setIsInitInAC({ isInit: false }));
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
      const res = await todolistAPI.me()
      if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch,false);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    } finally {
    dispatch(allActionsauthReducer.setIsInitInAC({ isInit: true }))
  }
  },
);

//logoutTC
export const logoutTC = createAppAsyncThunk< void>(
  "tasks/logout",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading" }));
      const res = await todolistAPI.logout()
      if (res.data.resultCode === ResultCode.success) {
        dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "succeeded"}));
        dispatch(actionsTodoandTaskClear({task:{}, todoList:[]}));
        return 
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  },
);

//getCaptchThunk
export const getCaptchThunk = ():AppThunk => {
  return async (dispatch) => {
    const resultCaptch = await captchaAPI.getCaptchUser();
    dispatch(allActionsauthReducer.getCaptchCreator({urlCaptch: resultCaptch.data.url}));
  };
};



