import { changeTackAppStatusAC } from "../app-reducer";
import { takeEvery, put, call } from 'redux-saga/effects';
import { AddTodoTypeAC, ChangeEntityStatusTodoTitleAC, ChangeTodoTitleAC, RemoveTodolistAC, ResultCode, reorderTodolistsAC, setTodolistsAC } from "../reduser_todolist";
import { handleServerAppErrorSaga, handleServerNetworkErrorSaga } from "../../utils/utils";
import { AxiosResponse } from "axios";
import { ResponseTypeApI, TodolistType, todolistAPI } from "../../api/todolistApi";

export function* fetchTodolistAddSaga() {
  try {
    yield put(changeTackAppStatusAC("loading"));
    const res: AxiosResponse<Array<TodolistType>> = yield call(todolistAPI.getTodolists);
    yield put(setTodolistsAC(res.data));
    yield put(changeTackAppStatusAC("succeeded"));
  } catch (error) {
    yield call(handleServerNetworkErrorSaga, (error as Error).message);
  }
}

export const fetchTodolistAddSagaCall = () => ({ type: 'YOUR_ACTION_TYPE_FOR_FETCH_TODO_LIST' })


function* addNewTodolistSaga(action: ReturnType<typeof addNewTodolistSagaCall>) {
  try {
    yield put(changeTackAppStatusAC('loading'));
    const res: AxiosResponse<ResponseTypeApI<{ item: TodolistType }>> = yield call(todolistAPI.createTodolist, action.todo);
    if (res.data.resultCode === ResultCode.OK) {
      yield put(AddTodoTypeAC(res.data.data.item));
      yield put(changeTackAppStatusAC("succeeded"));
    } else {
      yield call(handleServerAppErrorSaga, res.data);
    }
  } catch (error) {
    yield call(handleServerNetworkErrorSaga, (error as Error).message);
  }
}

export const addNewTodolistSagaCall = (todo:string) => ({
  type: 'YOUR_ACTION_TYPE_FOR_ADD_NEW_TODO_LIST',
  todo
})

function* deleteTodolistSaga(action: ReturnType<typeof deleteTodolistSagaCall>) {
  try {
    yield put(changeTackAppStatusAC("loading"));
    yield put(ChangeEntityStatusTodoTitleAC(action.id, true));
    const res: AxiosResponse<ResponseTypeApI> = yield call(todolistAPI.deleteTodolistSaga, action.id);
    if (res.data.resultCode === ResultCode.OK) {
      yield put(RemoveTodolistAC(action.id));
      yield put(ChangeEntityStatusTodoTitleAC(action.id, false));
      yield put(changeTackAppStatusAC("succeeded"));
    } else {
      yield call(handleServerAppErrorSaga, res.data);
    }
  } catch (error) {
    yield call(handleServerNetworkErrorSaga, (error as Error).message);
  }
}


export const deleteTodolistSagaCall = (id: string) => ({
  type: 'YOUR_ACTION_TYPE_FOR_DELETE_TODO_LIST',
  id
})

function* changeTitleTodolistSagaSaga(action: ReturnType<typeof changeTitleTodolistSagaCall>) {
  try {
    yield put(changeTackAppStatusAC("loading"));
    const res: AxiosResponse<
      ResponseTypeApI,
      AxiosResponse<ResponseTypeApI>> = yield call(todolistAPI.updateTodolist, action.id, action.title);
    if (res.data.resultCode === ResultCode.OK) {
      yield put(ChangeTodoTitleAC(action.id, action.title));
      yield put(changeTackAppStatusAC("succeeded"));
    } else {
      yield call(handleServerAppErrorSaga, res.data);
    }
  } catch (error) {
    yield call(handleServerNetworkErrorSaga, (error as Error).message);
  }
}

export const changeTitleTodolistSagaCall = (id: string, title:string) => ({
  type: 'YOUR_ACTION_TYPE_FOR_CHANGE_TITLE_TODO_LIST',
    id,
    title
})

function* reorderTodolistSaga(action: ReturnType<typeof reorderTodolistSagaCall>) {
  try {
    yield put(changeTackAppStatusAC("loading"));
    const res: AxiosResponse<ResponseTypeApI> = yield call(todolistAPI.reorder, action.todolistId, action.putAfterItemId);
    if (res.data.resultCode === ResultCode.OK) {
      yield put(reorderTodolistsAC(action.todolistId, action.putAfterItemId));
      yield put(changeTackAppStatusAC("succeeded"));
    } else {
      yield call(handleServerAppErrorSaga, res.data);
    }
  } catch (error) {
    yield call(handleServerNetworkErrorSaga, (error as Error).message);
  }
}

export const reorderTodolistSagaCall = (todolistId:string, putAfterItemId:string) => ({
  type: 'YOUR_ACTION_TYPE_FOR_REORDER_TODO_LIST',
    todolistId,
    putAfterItemId
})


export function* todoListSaga() {
  yield takeEvery('YOUR_ACTION_TYPE_FOR_FETCH_TODO_LIST', fetchTodolistAddSaga);
  yield takeEvery('YOUR_ACTION_TYPE_FOR_ADD_NEW_TODO_LIST', addNewTodolistSaga);
  yield takeEvery('YOUR_ACTION_TYPE_FOR_DELETE_TODO_LIST', deleteTodolistSaga);
  yield takeEvery('YOUR_ACTION_TYPE_FOR_CHANGE_TITLE_TODO_LIST', changeTitleTodolistSagaSaga);
  yield takeEvery('YOUR_ACTION_TYPE_FOR_REORDER_TODO_LIST', reorderTodolistSaga);
}