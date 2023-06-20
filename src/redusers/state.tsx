import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { userReducerTask } from "./reduser_tasks";
import { userReducerTodolist } from "./reduser_todolist";
import thunk, { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: userReducerTask,
  todolist: userReducerTodolist
});

// непосредственно создаём store
export const store = createStore(rootReducer,applyMiddleware(thunk));

//типизация для dispacth
export type ActionThunkDispatchType = ThunkDispatch<AppRootStateType,any,AnyAction>
//делаем заготовку чтобы передовать уже типизированный useDispatch()
export const useDispatchWithType = () => useDispatch<ActionThunkDispatchType>()

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
