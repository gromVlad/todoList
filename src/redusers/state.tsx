import { applyMiddleware, combineReducers, createStore } from "redux";
import { ActionTypeTasK, userReducerTask } from "./reduser_tasks";
import { ActionType, userReducerTodolist } from "./reduser_todolist";
import thunk, { ThunkAction } from "redux-thunk";
import {appReducerStatus } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import createSagaMiddleware from 'redux-saga'
import { all } from "redux-saga/effects";
import { todoListSaga } from "./saga/todolistSaga";


const rootReducer = combineReducers({
  tasks: userReducerTask,
  todolist: userReducerTodolist,
  appStatus: appReducerStatus,
  login:authReducer
});

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(mySaga)

function* mySaga() {
  yield all([
    todoListSaga()
  ]);
}

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AllActionsType = ActionType | ActionTypeTasK 
 
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AllActionsType
>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

