import { Dispatch } from "react";
import { ResponseTypeApI } from "../api/todolistApi";
import { ActionsAppReducer, RequestStatusType } from "../redusers/app-reducer";

// generic function
export const handleServerAppError = <T,>(data: ResponseTypeApI<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(ActionsAppReducer.changeTackAppErrorAC({error:data.messages[0]}));
  } else {
    dispatch(ActionsAppReducer.changeTackAppErrorAC({error:"Some error occurred"}));
  }
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"failed"}));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(ActionsAppReducer.changeTackAppErrorAC({error:error.message}));
  dispatch(ActionsAppReducer.changeTackAppStatusAC({status:"failed"}));
};

type ErrorUtilsDispatchType = Dispatch<any >;
