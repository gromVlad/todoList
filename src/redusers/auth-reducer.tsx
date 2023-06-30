import { Dispatch } from "react";
import { changeTackAppStatusAC } from "./app-reducer";
import { LoginType, todolistAPI } from "../api/todolistApi";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";

const initialState = {
  isLoggedIn: false,
  isInit:false
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    case "login/SET-IS-INIT-IN":
      return { ...state, isInit: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

export const setIsInitInAC = (value: boolean) =>
  ({ type: "login/SET-IS-INIT-IN", value } as const);

// thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch<any>) => {
  dispatch(changeTackAppStatusAC("loading"));
  todolistAPI
    .login(data)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(changeTackAppStatusAC("succeeded"));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

// types
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsInitInAC>;
  
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
    .finally(() => dispatch(setIsInitInAC(true)))
}

export const logoutTC = () => (dispatch: Dispatch<any>) => {
  dispatch(changeTackAppStatusAC("loading"));
  todolistAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(changeTackAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};