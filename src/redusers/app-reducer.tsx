export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
};

export type InitialStateType = typeof initialState;

export const appReducerStatus = (
  state: InitialStateType = initialState,
  action: ActionsAppReducerStatusType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const changeTackAppStatusAC = (status: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    status,
  } as const;
};

export const changeTackAppErrorAC = (error: null | string) => {
  return {
    type: "APP/SET-ERROR",
    error,
  } as const;
};

type ChangeTackAppStatusType = ReturnType<typeof changeTackAppStatusAC>;
type ChangeTackAppErrorType = ReturnType<typeof changeTackAppErrorAC>;


export type ActionsAppReducerStatusType =
  | ChangeTackAppStatusType
  | ChangeTackAppErrorType;
