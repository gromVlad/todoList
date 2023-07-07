import { combineReducers } from "redux";
import { userReducerTask } from "./reduser_tasks";
import { userReducerTodolist } from "./reduser_todolist";
import { appReducerStatus } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: userReducerTask,
  todolist: userReducerTodolist,
  appStatus: appReducerStatus,
  login: authReducer,
});

export const store = configureStore({
  reducer: rootReducer
})
//export const store = createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
