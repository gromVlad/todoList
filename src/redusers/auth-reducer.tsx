import { ActionsAppReducer } from "./app-reducer";
import { LoginType, captchaAPI, todolistAPI } from "../api/todolistApi";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";
import { allActionsTodolist } from "./reduser_todolist";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "./ActionThunkDispatchType";
import { actionsTodoandTaskClear } from "./actionsTodoandTask";


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
});

//export const { setIsLoggedInAC, setIsInitInAC, getCaptchCreator, nullCaptchCreator } = authSlice.actions;
export const allActionsauthReducer = authSlice.actions
export const authReducer = authSlice.reducer;

// thunks
export const loginTC = (data: LoginType): AppThunk => (dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "loading"}));
  todolistAPI
    .login(data)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(allActionsauthReducer.setIsLoggedInAC({isLoggedIn: true}));
        dispatch(allActionsauthReducer.nullCaptchCreator());
      } else if (response.data.resultCode === 10) {
        dispatch(getCaptchThunk());
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "succeeded"})));
};

export const initializeAppTC = (): AppThunk => (dispatch) => {
  dispatch(allActionsauthReducer.setIsInitInAC({isInit: false}));
  todolistAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(allActionsauthReducer.setIsLoggedInAC({ isLoggedIn: true }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => dispatch(allActionsauthReducer.setIsInitInAC({isInit: true})));
};

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "loading"}));
  todolistAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(allActionsauthReducer.setIsLoggedInAC({ isLoggedIn: false }));
        dispatch(ActionsAppReducer.changeTackAppStatusAC({status: "succeeded"}));
        dispatch(actionsTodoandTaskClear({task:{}, todoList:[]}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const getCaptchThunk = ():AppThunk => {
  return async (dispatch) => {
    const resultCaptch = await captchaAPI.getCaptchUser();
    dispatch(allActionsauthReducer.getCaptchCreator({urlCaptch: resultCaptch.data.url}));
  };
};



