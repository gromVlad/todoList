import { ActionsAppReducer, AppState, appReducerStatus} from "./app-reducer";


describe("appReducerStatus", () => {
  let initialState: AppState;

  beforeEach(() => {
    initialState = {
      status: "idle",
      error: null,
    };
  });

  test("should change the status", () => {
    const action = ActionsAppReducer.changeTackAppStatusAC({status: "loading"});

    const newState = appReducerStatus(initialState, action);

    expect(newState.status).toBe("loading");
  });

  test("should change the error", () => {
    const error = "An error occurred";
    const action = ActionsAppReducer.changeTackAppErrorAC({error:error});

    const newState = appReducerStatus(initialState, action);

    expect(newState.error).toBe(error);
  });
});
