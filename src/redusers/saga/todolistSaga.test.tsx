import { call, put } from "redux-saga/effects";
import { fetchTodolistAddSaga, fetchTodolistAddSagaCall } from "./todolistSaga";
import { changeTackAppStatusAC } from "../app-reducer";
import { TodolistType, todolistAPI } from "../../api/todolistApi";
import { handleServerNetworkErrorSaga } from "../../utils/utils";
import { setTodolistsAC } from "../reduser_todolist";
import { AxiosResponse } from "axios";

describe('fetchTodolistAddSaga', () => {
  it('should fetch todolists and update status', () => {
    const generator = fetchTodolistAddSaga();
    const mockTodolists = [
      {
        id: "1",
        addedDate: "2022-01-01",
        order: 0,
        title: "Todo 1",
        filter: "all",
        entityStatus: false,
      },
      {
        id: "2",
        addedDate: "2022-01-01",
        order: 1,
        title: "Todo 2",
        filter: "all",
        entityStatus: false,
      },
    ];
    const mockResponse:AxiosResponse<TodolistType[] > = { data: mockTodolists } as unknown as AxiosResponse<TodolistType[]>;

    expect(generator.next().value).toEqual(put(changeTackAppStatusAC('loading')));
    expect(generator.next().value).toEqual(call(todolistAPI.getTodolists));
    expect(generator.next(mockResponse).value).toEqual(put(setTodolistsAC(mockTodolists)));
    expect(generator.next().value).toEqual(put(changeTackAppStatusAC('succeeded')));
    expect(generator.next().done).toBe(true);
  });

  it('should handle server network error', () => {
    const generator = fetchTodolistAddSaga();
    const error = new Error('Network error');

    expect(generator.next().value).toEqual(put(changeTackAppStatusAC('loading')));
    expect(generator.next().value).toEqual(call(todolistAPI.getTodolists));
    expect(generator.throw(error).value).toEqual(call(handleServerNetworkErrorSaga, error.message));
    expect(generator.next().done).toBe(true);
  });
});

describe('fetchTodolistAddSagaCall', () => {
  it('should create the expected action', () => {
    const expectedAction = { type: 'YOUR_ACTION_TYPE_FOR_FETCH_TODO_LIST' };
    expect(fetchTodolistAddSagaCall()).toEqual(expectedAction);
  });
});