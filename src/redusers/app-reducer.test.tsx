import { InitialStateType, appReducerStatus, changeTackAppErrorAC, changeTackAppStatusAC } from "./app-reducer";

describe("appReducerStatus", () => {
  let initialState: InitialStateType;

  beforeEach(() => {
    initialState = {
      status: "idle",
      error: null,
    };
  });

  test("should change the status", () => {
    const action = changeTackAppStatusAC("loading");

    const newState = appReducerStatus(initialState, action);

    expect(newState.status).toBe("loading");
  });

  test("should change the error", () => {
    const error = "An error occurred";
    const action = changeTackAppErrorAC(error);

    const newState = appReducerStatus(initialState, action);

    expect(newState.error).toBe(error);
  });
});
