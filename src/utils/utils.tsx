import { Dispatch } from "react";
import { ResponseTypeApI } from "../api/todolistApi";
import { ActionsAppReducer, RequestStatusType } from "../redusers/app-reducer";
import axios, { AxiosError } from "axios";

// generic function
export const handleServerAppError = <T,>(data: ResponseTypeApI<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(ActionsAppReducer.changeTackAppErrorAC({error:data.messages[0]}));
  } else {
    dispatch(ActionsAppReducer.changeTackAppErrorAC({error:"Some error occurred"}));
  }
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"failed"}));
};

export const _handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(ActionsAppReducer.changeTackAppErrorAC({error:error.message}));
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"failed"}));
};

type ErrorUtilsDispatchType = Dispatch<any >;

export const handleServerNetworkError = (e: unknown, dispatch: ErrorUtilsDispatchType) => {
  const err = e as Error | AxiosError<{ error: string }>
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : 'Some error occurred'
    dispatch(ActionsAppReducer.changeTackAppErrorAC({ error }))
  } else {
    dispatch(ActionsAppReducer.changeTackAppErrorAC({ error: `Native error ${err.message}` }))
  }
  dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: 'failed' }))
}