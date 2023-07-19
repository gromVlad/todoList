import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { ActionsAppReducer } from "redusers/app-reducer"
import { handleServerNetworkError } from "./utils"
import { AppRootStateType } from "redusers/state"
import { ActionThunkDispatchType } from "redusers/ActionThunkDispatchType"
import { ResponseTypeApI } from "api/todolistApi"

//recommend not use in dan abramov
export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<AppRootStateType, any, ActionThunkDispatchType, null | ResponseTypeApI>,
  logic: Function) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: 'loading' }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    // в handleServerNetworkError можно удалить убирание крутилки
    dispatch(ActionsAppReducer.changeTackAppStatusAC({ status: 'idle' }))
  }
}

