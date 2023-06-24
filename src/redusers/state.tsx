import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { ActionTypeTasK, userReducerTask } from "./reduser_tasks";
import { ActionType, userReducerTodolist } from "./reduser_todolist";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { appReducerStatus } from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: userReducerTask,
  todolist: userReducerTodolist,
  appStatus: appReducerStatus
});

// непосредственно создаём store
export const store = createStore(rootReducer,applyMiddleware(thunk));

//типизация для dispacth
export type ActionThunkDispatchType = ThunkDispatch<AppRootStateType,any,AnyAction>
//делаем заготовку чтобы передовать уже типизированный useDispatch()
export const useDispatchWithType = () => useDispatch<ActionThunkDispatchType>()

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

//вся типизация actions
type AllActionsType = ActionType | ActionTypeTasK

//универсальная типизация thunk for thunk 
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AllActionsType
>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
