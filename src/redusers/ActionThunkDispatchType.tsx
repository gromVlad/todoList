import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state";

//типизация для dispacth

export type ActionThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;
//делаем заготовку чтобы передовать уже типизированный useDispatch()
export const useDispatchWithType = () => useDispatch<ActionThunkDispatchType>();

//универсальная типизация thunk for thunk
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown,any>;

//чтобы постоянно не типизировать state. далее используем только типизацию чего достем из state
export const useSelectorWithType: TypedUseSelectorHook<AppRootStateType> = useSelector;
