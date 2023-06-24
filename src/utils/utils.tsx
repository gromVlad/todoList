import { Dispatch } from "react";
import { ResponseTypeApI } from "../api/todolistApi";
import { ActionsAppReducerStatusType, changeTackAppErrorAC, changeTackAppStatusAC } from "../redusers/app-reducer";

// generic function
export const handleServerAppError = <T,>(
  data: ResponseTypeApI<T>,
  dispatch: ErrorUtilsDispatchType
) => {
  if (data.messages.length) {
    dispatch(changeTackAppErrorAC(data.messages[0]));
  } else {
    dispatch(changeTackAppErrorAC("Some error occurred"));
  }
  dispatch(changeTackAppStatusAC("failed"));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType
) => {
  dispatch(changeTackAppErrorAC(error.message));
  dispatch(changeTackAppStatusAC("failed"));
};

type ErrorUtilsDispatchType = Dispatch<ActionsAppReducerStatusType>;