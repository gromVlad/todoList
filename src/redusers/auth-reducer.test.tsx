import { allActionsauthReducer, authReducer, initialState } from "./auth-reducer";


describe('auth slice tests', () => {
  it('should handle setIsLoggedInAC', () => {
    const action = allActionsauthReducer.setIsLoggedInAC({ isLoggedIn: true });
    const newState = authReducer(initialState, action);
    expect(newState.isLoggedIn).toBe(true);
  });

  it('should handle setIsInitInAC', () => {
    const action = allActionsauthReducer.setIsInitInAC({ isInit: true });
    const newState = authReducer(initialState, action);
    expect(newState.isInit).toBe(true);
  });

  it('should handle getCaptchCreator', () => {
    const action = allActionsauthReducer.getCaptchCreator({ urlCaptch: 'sample url' });
    const newState = authReducer(initialState, action);
    expect(newState.urlCaptch).toBe('sample url');
  });

  it('should handle nullCaptchCreator', () => {
    const action = allActionsauthReducer.nullCaptchCreator();
    const newState = authReducer(initialState, action);
    expect(newState.urlCaptch).toBe(null);
  });
});
