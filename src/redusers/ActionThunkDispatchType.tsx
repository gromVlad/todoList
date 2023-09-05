import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AllActionsType, AppRootStateType } from "./state";

export type ActionThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;
export const useDispatchWithType = () => useDispatch<ActionThunkDispatchType>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AllActionsType
>;

export const useSelectorWithType:TypedUseSelectorHook<AppRootStateType> = useSelector