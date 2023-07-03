import { Dispatch } from "react";
import { changeTackAppStatusAC } from "./app-reducer";
import { LoginType, captchaAPI, todolistAPI } from "../api/todolistApi";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";
import { ClearDataAlltAC } from "./reduser_todolist";

export const initialState = {
  isLoggedIn: false,
  isInit: false,
  urlCaptch: null as null | string,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsAuthType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    case "login/SET-IS-INIT-IN":
      return { ...state, isInit: action.value };
    case "GET_CAPTCH":
      return {
        ...state,
        urlCaptch: action.box.captch,
      };
    case "NULL_CAPTCH":
      return {
        ...state,
        urlCaptch: null,
      };
    default:
      return state;
  }
};

//-----------------------------
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

export const setIsInitInAC = (value: boolean) =>
  ({ type: "login/SET-IS-INIT-IN", value } as const);

export const getCaptchCreator = (captch: null | string) => {
  return {
    type: "GET_CAPTCH",
    box: {
      captch,
    },
  } as const;
};

export const nullCaptchCreator = () => {
  return {
    type: "NULL_CAPTCH",
  } as const;
};

// types
export type ActionsAuthType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsInitInAC>
  | ReturnType<typeof getCaptchCreator>
  | ReturnType<typeof nullCaptchCreator>;

//----------------------------
// thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch<any>) => {
  dispatch(changeTackAppStatusAC("loading"));
  todolistAPI
    .login(data)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(nullCaptchCreator());
      } else if (response.data.resultCode === 10) {
        dispatch(getCaptchThunk());
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => dispatch(changeTackAppStatusAC("succeeded")));
};

export const initializeAppTC = () => (dispatch: Dispatch<any>) => {
  dispatch(setIsInitInAC(false));
  todolistAPI
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => dispatch(setIsInitInAC(true)));
};

export const logoutTC = () => (dispatch: Dispatch<any>) => {
  dispatch(changeTackAppStatusAC("loading"));
  todolistAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(changeTackAppStatusAC("succeeded"));
        dispatch(ClearDataAlltAC());
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const getCaptchThunk = () => {
  return async (dispatch: Dispatch<ActionsAuthType>) => {
    const resultCaptch = await captchaAPI.getCaptchUser();
    dispatch(getCaptchCreator(resultCaptch.data.url));
  };
};
