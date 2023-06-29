import { Dispatch } from "react";
import { changeTackAppStatusAC } from "./app-reducer";
import { LoginType, todolistAPI } from "../api/todolistApi";
import { handleServerAppError, handleServerNetworkError } from "../utils/utils";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

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
  
