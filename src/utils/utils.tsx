import { Dispatch } from "react";
import { ResponseTypeApI } from "../api/todolistApi";
import { ActionsAppReducerStatusType, changeTackAppErrorAC, changeTackAppStatusAC } from "../redusers/app-reducer";
import { put } from "redux-saga/effects";

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

export function* handleServerAppErrorSaga<T>(data: ResponseTypeApI<T>) {
  if (data.messages.length) {
    yield put(changeTackAppErrorAC(data.messages[0]));
  } else {
    yield put(changeTackAppErrorAC("Some error occurred"));
  }
  yield put(changeTackAppStatusAC("failed"));
}

// Saga for handling server network errors
export function* handleServerNetworkErrorSaga(error: string ) {
  yield put(changeTackAppErrorAC(error));
  yield put(changeTackAppStatusAC("failed"));
}