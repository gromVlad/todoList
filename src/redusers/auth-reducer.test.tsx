import {
  initialState,
  authReducer,
  setIsLoggedInAC,
  setIsInitInAC,
  getCaptchCreator,
  nullCaptchCreator,
} from "./auth-reducer";

describe("authReducer", () => {
  it("should set isLoggedIn to true", () => {
    const action = setIsLoggedInAC(true);
    const newState = authReducer(initialState, action);
    expect(newState.isLoggedIn).toBe(true);
  });

  it("should set isInit to true", () => {
    const action = setIsInitInAC(true);
    const newState = authReducer(initialState, action);
    expect(newState.isInit).toBe(true);
  });

  it("should set urlCaptch to the provided value", () => {
    const action = getCaptchCreator("https://example.com/captcha.jpg");
    const newState = authReducer(initialState, action);
    expect(newState.urlCaptch).toBe("https://example.com/captcha.jpg");
  });

  it("should set urlCaptch to null", () => {
    const action = nullCaptchCreator();
    const newState = authReducer(initialState, action);
    expect(newState.urlCaptch).toBe(null);
  });

});
