import { Dispatch } from "react";
import { ResponseTypeApI } from "../api/todolistApi";
import { ActionsAppReducer, RequestStatusType } from "../redusers/app-reducer";
import axios, { AxiosError } from "axios";

type ErrorUtilsDispatchType = Dispatch<any>;
/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером.
 * @param data  - ответ от сервера в формате ResponseType<D>
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */
export const handleServerAppError = <T,>(
  data: ResponseTypeApI<T>,
  dispatch: ErrorUtilsDispatchType,
  showError: boolean = true,
) => {
  if (showError) {
    dispatch(
      ActionsAppReducer.changeTackAppErrorAC({
        error: data.messages.length ? data.messages[0] : "Some error occurred",
      }),
    );
  }
  dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "failed" }));
};

export const handleServerNetworkError = (e: unknown, dispatch: ErrorUtilsDispatchType) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(ActionsAppReducer.changeTackAppErrorAC({ error }));
  } else {
    dispatch(ActionsAppReducer.changeTackAppErrorAC({ error: `Native error ${err.message}` }));
  }
  dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: "failed" }));
};
